import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  console.log(query);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/v1/videos/search${query}`);
        console.log(response);
        setVideos(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
