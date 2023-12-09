import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
// import { darkTheme, lightTheme } from "../utils/Theme";
import AuthActions from "../redux/middleware/auth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  //   align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 2px solid ${({ theme }) => theme.soft};
  border-radius: 15px;
  width: 500px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  padding: 15px;
  width: inherit;
  font-size: 14px;
  border-radius: 5px;
  margin: 20px;
`;

const Hr = styled.hr`
  border: 1px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const Forgotpassword = ({ theme }) => {
  const [email, setEmail] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const forgorPasswordHandler = async (e) => {
    e.preventDefault();
    // console.log(email);
    try {
      const apiResponse = await AuthActions.ForgotPassword({
        email,
      });
      // console.log(apiResponse);

      if (apiResponse.status === 400) {
        // setErrorMessage(apiResponse.message);
        toast.error(apiResponse.message, {
          position: "top-right",
          theme: theme ? "light" : "dark",
          autoClose: 2000,
        });
      } else if (apiResponse.status === 404) {
        // setErrorMessage(apiResponse.message);
        toast.error(apiResponse.message, {
          position: "top-right",
          theme: theme ? "light" : "dark",
          autoClose: 2000,
        });
      } else {
        // setSuccessMessage(apiResponse.message);
        toast.success(apiResponse.message, {
          position: "top-right",
          theme: theme ? "light" : "dark",
          autoClose: 2000,
          onClose: () => {
            setTimeout(() => {
              navigate(`/sendemail`);
            }, 3000);
          },
        });
      }
      // navigate("/resetpassword");
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        theme: theme ? "light" : "dark",
        autoClose: 2000,
      });
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  return (
    <Container>
      <Wrapper>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            padding: "20px",
          }}
        >
          Find Your Account
        </Typography>
        <Hr />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            padding: "20px",
          }}
        >
          Please enter your email address to search for your account.
        </Typography>
        <InputBox>
          {/* <PersonOutlineOutlinedIcon /> */}
          <Input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        {/* {errorMessage ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              padding: "20px",
            }}
          >
            {errorMessage}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              padding: "20px",
            }}
          >
            {successMessage}
          </Typography>
        )} */}
        <Hr />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-end"
          padding="20px"
        >
          <Button
            variant="outlined"
            style={{
              color: "#ff0000",
              backgroundColor: "transparent",
              border: "1px solid #ff0000",
            }}
            onClick={cancelHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ color: "#ffffff", backgroundColor: "#ff0000" }}
            onClick={forgorPasswordHandler}
          >
            Submit
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default Forgotpassword;
