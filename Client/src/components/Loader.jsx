import React from "react";
import styled from "styled-components";

const LoadingCircle = styled.div`
  position: fixed;
  top: 0;
  left: 120px;
  width: 100vw;
  height: 100vh;
  background-color: tranperent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const LoadingSpinner = styled.div`
  border: 7px solid ${({ theme }) => theme.text};
  border-top: 7px solid #ff0000;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return (
    <LoadingCircle>
        <LoadingSpinner></LoadingSpinner>
    </LoadingCircle>
  );
};

export default Loader;
