import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { darkTheme, lightTheme } from "../utils/Theme";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AuthActions from "../redux/middleware/auth";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  margin-bottom: 25px;
  margin-right: 20px;
  margin-left: 20px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 15px;
  width: inherit;
  font-size: 14px;
`;

const Hr = styled.hr`
  border: 1px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const CustomTextField = styled(TextField)`
  label {
    color: ${({ theme }) => theme.textSoft};
  }
  & label.Mui-focused {
    color: ${({ theme }) => theme.text};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.text};
    }
    & fieldset {
      border-color: ${({ theme }) => theme.textSoft};
    }
    & input {
      color: ${({ theme }) => theme.text};
    }
  }
`;
const CustomFormControl = styled(FormControl)`
  label {
    color: ${({ theme }) => theme.textSoft};
  }
  & label.Mui-focused {
    color: ${({ theme }) => theme.text};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.text};
    }
    & fieldset {
      border-color: ${({ theme }) => theme.textSoft};
    }
    & input {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const ResetPassword = ({ theme }) => {
  const { userId, token } = useParams();
  console.log(userId);
  console.log(token);
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const passwordVisibilityHandler = () => {
    setShowPassword((show) => !show);
  };
  // const confirmPasswordVisibilityHandler = () => {
  //   setShowConfirmPassword((show) => !show);
  // };
  // // const [matchPassword, setMatchPassword] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const apiResponse = await axios.get(
          `/v1/auth/resetpassword/${userId}/${token}`
        );
        console.log(apiResponse);
      } catch (error) {
        setError("Invalid or Expire Token");
      }
    };
    verifyToken();
  }, [userId, token]);

  // const changePasswordHandler = async (e) => {
  //   e.preventDefault();
  //   if (password.length < 8) {
  //     toast.error("Password must be at least 8 characters", {
  //       position: "top-right",
  //       theme: theme ? "light" : "dark",
  //       autoClose: 2000,
  //     });
  //     return;
  //   } else if (password !== confirmPassword) {
  //     toast.error("Passwords do not match", {
  //       position: "top-right",
  //       theme: theme ? "light" : "dark",
  //       autoClose: 2000,
  //     });
  //     return;
  //   }
  //   dispatch(loginPending());
  //   try {
  //     const apiResponse = await AuthActions.ResetPassword({
  //       password,
  //       userId,
  //       token,
  //     });
  //     console.log(apiResponse);
  //     if (apiResponse.status === 200) {
  //       toast.success(apiResponse.message, {
  //         position: "top-right",
  //         theme: theme ? "light" : "dark",
  //         autoClose: 2000,
  //       });
  //       navigate("/signin");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message, {
  //       position: "top-right",
  //       theme: theme ? "light" : "dark",
  //       autoClose: 2000,
  //     });
  //   }
  // };
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
          Change Password
        </Typography>
        <Hr />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          Please enter your new password to reset your password
        </Typography>
        <CustomTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          autoComplete="off"
          sx={{ m: 1, width: "100%", paddingRight: "17px" }}
        />
        <CustomFormControl
          sx={{ m: 1, width: "100%", paddingRight: "17px" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={passwordVisibilityHandler}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff style={{ color: "red" }} />
                  ) : (
                    <Visibility style={{ color: "red" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </CustomFormControl>
        {/* <CustomFormControl
          sx={{ m: 1, width: "100%", paddingRight: "17px" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={confirmPasswordVisibilityHandler}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff style={{ color: "red" }} />
                  ) : (
                    <Visibility style={{ color: "red" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </CustomFormControl> */}
        <Hr />
        <Stack direction="row" justifyContent="flex-end" padding="20px">
          <Button
            variant="contained"
            style={{ color: "#ffffff", backgroundColor: "#ff0000" }}
            // onClick={changePasswordHandler}
          >
            Reset Password
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
