import axios from "axios";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import companyLogo from "../assets/companyLogo.jpg";
import Comment from "./Comment";

const Container = styled.div`
  margin-top: 30px;
  padding: 0px 5px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #bdb4b4;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  width: 100%;
  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Comments = ({ videoId }) => {
  console.log(videoId);
  const { currentUser } = useSelector((state) => state.Auth);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRes = await axios.get(`/v1/comments/${videoId}`);
        setComments(commentsRes.data?.data);
        // console.log(commentsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          type="text"
          placeholder="Add a comments here"
          onKeyDown={(e) => {
            console.log(e.target.value);
            if (e.key === "Enter") {
              axios.post(`/v1/comments`, {
                desc: e.target.value,
                videoId
              });
            }
          }}
          // onChange={(e) => {
          //   axios.post(`/v1/comments/${videoId}`, {
          //     Id: currentUser._id,
          //     desc: e.target.value,
          //   });
          // }}
        />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
