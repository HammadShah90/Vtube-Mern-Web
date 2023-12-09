import {
  SearchOutlined,
  VideoCallOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { logout } from "../redux/Slices/authSlice";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 45%;
  // position: absolute;
  // left: 0px;
  // right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Button = styled.button`
  padding: 6px 14px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 10px;
  font-weight: bold;
  // margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.Auth);
  // const { data } = currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(currentUser);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  // console.log(q);

  const searchhandler = () => {
    navigate(`/search?q=${q}`);
    setQ("");
  };

  const logoutHandler = () => {
    // console.log("logout working");
    localStorage.removeItem("dummyUserToken");
    localStorage.removeItem("persist:root");
    dispatch(logout());
    // window.location.reload();
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search any video..."
              onChange={(e) => setQ(e.target.value)}
              value={q}
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchhandler();
                }
              }}
            />
            <SearchOutlined
              style={{ cursor: "pointer" }}
              onClick={searchhandler}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <Avatar src={currentUser.img} />
              <span style={{ marginRight: 12 }}>{currentUser.firstName}</span>
              <Button onClick={logoutHandler}>
                <AccountCircleOutlined />
                Logout
              </Button>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
