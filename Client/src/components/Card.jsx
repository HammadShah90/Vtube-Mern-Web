import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import logo from "../assets/Saylani-Welfare.jpg";
import companyLogo from "../assets/companyLogo.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import VideosAction from "../redux/middleware/videos";

const Container = styled.div`
  width: 340px;
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${({ type }) => type === "sm" && "flex"};
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 6px;
  font-size: ${({ type }) => (type === "sm" ? "14px" : "16px")};
`;

const Image = styled.img`
  width: ${({ type }) => (type === "sm" ? "170px" : "100%")};
  height: ${({ type }) => (type === "sm" ? "100px" : "201px")};
  border-radius: 15px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => (type === "sm" ? "3px" : "16px")};
  gap: 12px;
  // width: 300px
`;

const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #bdb4b4;
  display: ${({ type }) => type === "sm" && "none"};
`;

const Text = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: ${({ type }) => (type === "sm" ? "12px" : "0px")};
  width: ${({ type }) => (type === "sm" ? "100%" : "inherit")};
`;
const Title = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  width: inherit;
`;

const ChannelName = styled.h4`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`;

const Views = styled.h5`
  color: ${({ theme }) => theme.textSoft};
`;

const SeenTime = styled.h5`
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  // console.log(video._id);

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(`/v1/users/find/${video.userId}`);
      // console.log(response);
      setChannel(response.data.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image src={video.imgUrl} type={type} />
        <Details type={type}>
          <ChannelImage type={type} src={companyLogo} />
          <Text type={type}>
            <Title>{video.title}</Title>
            <ChannelName>{channel.firstName}</ChannelName>
            <Wrapper type={type}>
              <Views>{video.views} Views ·</Views>
              <SeenTime>{format(video.createdAt)}</SeenTime>
            </Wrapper>
          </Text>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
