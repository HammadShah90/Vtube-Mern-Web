import { styled } from "styled-components";
import React from "react";
import Vtube from "../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 0.8;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0px;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  padding-top: 0px;
  overflow-y: auto;
  max-height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  // margin-left: 5px;
  padding: 18px 0px;
  font-size: 22px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Ctry = styled.span`
  position: relative;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 5px;
  font-weight: 500;
  position: relative;
  z-index: 1;
  // background-color: red;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 10px;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #858585;
`;

const Span = styled.span`
  margin-top: 3px;
`;

const Menu = ({ theme, setTheme }) => {
  const { currentUser } = useSelector((state) => state.Auth);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={Vtube} alt="logo" />
            <Span>Vtube</Span>
            <Ctry>
              <p
                style={{
                  position: "absolute",
                  bottom: 0,
                  fontWeight: "normal",
                  fontSize: 10,
                  backgroundColor: red,
                }}
              >
                PK
              </p>
            </Ctry>
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            <Span>Home</Span>
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            <Span>Explore</Span>
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            <Span>Subscriptions</Span>
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          <Span>Library</Span>
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          <Span>History</Span>
        </Item>
        <Hr />
        {!currentUser &&
          <>
            <Login>
              <span style={{ fontWeight: "bold" }}>Sign in</span> to like
              videos, comment and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        }
        <Title>BEST OF Vtube</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          <Span>Music</Span>
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          <Span>Sports</Span>
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          <Span>Gaming</Span>
        </Item>
        <Item>
          <MovieOutlinedIcon />
          <Span>Movies</Span>
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          <Span>News</Span>
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          <Span>Live</Span>
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          <Span>Settings</Span>
        </Item>
        <Item>
          <FlagOutlinedIcon />
          <Span>Report</Span>
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          <Span>Help</Span>
        </Item>
        <Item onClick={() => setTheme(!theme)}>
          <SettingsBrightnessOutlinedIcon />
          <Span>{theme ? "Light" : "Dark"} Mode</Span>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
