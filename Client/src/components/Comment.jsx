import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dummyLogo from "../assets/dummy-logo.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #bdb4b4;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.h4`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: justify;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  //   background-color: grey;
  margin-top: 10px;
  border-radius: 80px;
  gap: 12px;
  width: 30%;
  font-size: 13px;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid #bdb4b4;
`;

const DisLike = styled.div`
  display: flex;
  align-items: center;
`;

const Comment = ({ comment }) => {
  // console.log(comment);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const channelRes = await axios.get(`/v1/users/find/${comment.userId}`);
      setChannel(channelRes.data?.data);
      // console.log(channelRes.data);
    };
    fetchComment()
  }, [comment.userId]);

  // console.log(channel);
  return (
    <Container>
      <Avatar src={dummyLogo} />
      <Details>
        <Name>
          {channel.firstName} {channel.lastName}<Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
        <Box>
          <Like>
            <ThumbUpOffAltIcon style={{ marginRight: 10, fontSize: 20 }} />
            37K
          </Like>
          <DisLike>
            <ThumbDownOffAltIcon style={{ fontSize: 20 }} />
          </DisLike>
          <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: "bold" }}>
            Reply
          </Text>
        </Box>
      </Details>
    </Container>
  );
};

export default Comment;
