import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import companyLogo from "../assets/companyLogo.jpg";
import Comments from "../components/Comments";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { dislike, like, videoSuccess } from "../redux/Slices/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/Slices/authSlice";
import Recommandation from "../components/Recommandation";

const Container = styled.div`
  display: flex;
  gap: 18px;
`;

const Content = styled.div`
  flex: 4;
  // width: 66%;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 5px;
`;

const VideoWrapper = styled.div``;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
  gap: 5px;
  padding: 0px 5px;
`;

const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #bdb4b4;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 20px;
  padding: 0px 5px;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
  margin-left: 5px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.soft};
  border-radius: 80px;
  padding: 8px 20px;
  font-size: 14px;
  gap: 8px;
`;

const Subscription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.soft};
  padding: 0px 15px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  align-self: flex-end;
  height: 38px;
  font-size: 14px;
  margin-left: 10px;
  width: 120px;
  background-color: ${({ isSubscribed }) =>
    isSubscribed ? "#ff0000" : "#8c8c8c"};
  color: ${({ theme }) => theme.text};
  // Add other styles as needed

  &:hover {
    // Define hover styles
    background-color: ${({ theme, isSubscribed }) =>
      isSubscribed ? theme.bgLighter : "#f72020"};
    color: ${({ theme }) => theme.text};
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  border-right: 1px solid ${({ theme }) => theme.soft};
  cursor: pointer;

  // &:hover {
  //   background-color: ${({ theme }) => theme.soft};
  // }
`;

const DisLike = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  // &:hover {
  //   background-color: ${({ theme }) => theme.soft};
  // }
`;

const Subscribers = styled.p`
  font-weight: normal;
  margin-top: 4px;
  font-size: 14px;
`;

const Hr = styled.hr`
  margin: 15px 5px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const CommentCounts = styled.h3`
  margin-top: 20px;
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const ViewsDesc = styled.div`
  background-color: ${({ theme }) => theme.soft};
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const Views = styled.h4`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const SeenTime = styled.p`
  font-weight: 500;
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.Auth);
  const { currentVideo } = useSelector((state) => state.Video);
  console.log(currentUser);
  // console.log(currentVideo);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  // console.log(path);

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const videoRes = await axios.get(`/v1/videos/find/${path}`);
        // console.log(videoRes);
        const { userId } = videoRes.data.data;
        const channelRes = await axios.get(
          `/v1/users/find/${userId}`
        );
        // console.log(channelRes);
        setChannel(channelRes.data.data);
        dispatch(videoSuccess(videoRes.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
  }, [path, dispatch]);

  // console.log(channel);

  const isSubscribed = currentUser.subscribedUsers?.includes(channel._id);

  const likehandler = async () => {
    await axios.put(`/v1/users/like/${currentVideo._id}`);
    dispatch(like(channel._id));
  };

  const disLikehandler = async () => {
    await axios.put(`/v1/users/dislike/${currentVideo._id}`);
    dispatch(dislike(channel._id));
  };

  const subhandler = async () => {
    currentUser.subscribedUsers?.includes(channel._id)
      ? await axios.put(`/v1/users/unsub/${channel._id}`)
      : await axios.put(`/v1/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Wrapper>
            <ChannelImage src={companyLogo} />
            <ChannelName>
              {channel.firstName} {channel.lastName}
              <Subscribers>{channel.subscribers} subscribers</Subscribers>
            </ChannelName>
            <Subscription onClick={subhandler} isSubscribed={isSubscribed}>
              {isSubscribed
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscription>
          </Wrapper>
          <Wrapper>
            <Box>
              <Like onClick={likehandler}>
                {currentVideo?.likes?.includes(channel._id) ? (
                  <ThumbUpIcon style={{ marginRight: 5, fontSize: 20 }} />
                ) : (
                  <ThumbUpOutlinedIcon
                    style={{ marginRight: 5, fontSize: 20 }}
                  />
                )}
                {currentVideo?.likes?.length}
              </Like>
              <DisLike onClick={disLikehandler}>
                {currentVideo?.disLikes?.includes(channel._id) ? (
                  <ThumbDownIcon style={{ marginTop: 2, fontSize: 20 }} />
                ) : (
                  <ThumbDownOffAltOutlinedIcon
                    style={{ marginTop: 2, fontSize: 20 }}
                  />
                )}
              </DisLike>
            </Box>
            <Box>
              <ReplyOutlinedIcon style={{ fontSize: 20 }} />
              Share
            </Box>
            <Box style={{ padding: "0px 12px" }}>
              <MoreHorizOutlinedIcon style={{ fontSize: 20 }} />
            </Box>
          </Wrapper>
        </Details>
        <ViewsDesc>
          <Views>
            {currentVideo?.views} views ·
            <SeenTime>{format(currentVideo?.createdAt)}</SeenTime>
          </Views>
          <Description>{currentVideo?.desc}</Description>
        </ViewsDesc>
        <Hr />
        <CommentCounts>
          <span>548 Comments</span>
        </CommentCounts>
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommandation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
