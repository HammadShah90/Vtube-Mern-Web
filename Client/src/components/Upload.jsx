import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  z-index: 10;
  transition: 0.5s ease;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

const Label = styled.label`
  font-size: 14px;
`;

function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [videoPerc, setVideoPerc] = useState(0);
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const tagsHandler = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/v1/videos", { ...inputs, tags });
      console.log(res);
      setOpen(false);
      res.status === 200 && navigate(`/video/${res.data.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>
          <CloseRoundedIcon />
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading " + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
        />
        <Desc
          name="desc"
          placeholder="Description"
          rows={8}
          onChange={changeHandler}
        />
        <Input 
        type="text" 
        placeholder="Separate the tags with commas." 
        onChange={tagsHandler}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ff0000",
            textAlign: "center",
            borderRadius: "5px",
            width: "100%",
          }}
          onClick={uploadHandler}
        >
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
