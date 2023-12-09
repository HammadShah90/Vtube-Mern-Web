import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
// import { InfinitySpin } from "react-loader-spinner";
// import Loader from "../components/Loader";
import { RotatingSquare } from "react-loader-spinner";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const Home = ({ type }) => {
  // console.log(type);
  const [videos, setvideos] = useState([]);
  const [isloading, setisloading] = useState(true);
  // console.log(videos[0].userId);

  useEffect(() => {
    setTimeout(() => setisloading(false), 4000);
    const fetchVideos = async () => {
      const apiResponse = await axios.get(`/v1/videos/${type}`);
      // console.log(apiResponse.data);
      setvideos(apiResponse?.data?.data);
    };
    fetchVideos();
  }, [type]);
  return (
    <>
      {isloading ? (
        <RotatingSquare
          ariaLabel="rotating-square"
          visible={true}
          color="red"
          strokeWidth="10"
          wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        />
      ) : (
        <Container>
          {videos.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Home;
