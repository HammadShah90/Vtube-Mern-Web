import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/ResetPassword";
import SendEmail from "./pages/SendEmail";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 3.5;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 20px 25px;
`;

function App() {
  const [theme, setTheme] = useState(true);

  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <Container>
          <BrowserRouter>
            <Menu theme={theme} setTheme={setTheme} />
            <Main>
              <Navbar />
              <ToastContainer />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="trends" element={<Home type="trend" />} />
                    <Route path="subscriptions" element={<Home type="sub" />} />
                    <Route path="search" element={<Search />} />
                    <Route
                      path="signin"
                      element={<SignIn theme={theme} setTheme={setTheme} />}
                    />
                    <Route path="signup" element={<SignUp />} />
                    <Route
                      path="forgotpassword"
                      element={
                        <Forgotpassword theme={theme} setTheme={setTheme} />
                      }
                    />
                    <Route
                      path="sendemail"
                      element={<SendEmail theme={theme} setTheme={setTheme} />}
                    />
                    <Route
                      path="resetpassword/:id/:token"
                      element={
                        <Resetpassword theme={theme} setTheme={setTheme} />
                      }
                    />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
