import styled from "styled-components";
import React from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 2px solid ${({ theme }) => theme.soft};
  border-radius: 15px;
  width: 500px;
  padding: 40px;
`;

const Text = styled.p`
  // margin-bottom: 10px;
  // word-spacing: 3px;
  // letter-spacing: 2px;
  text-align: justify;
  font-size: 26px;
  font-family: 'Hedvig Letters Serif', serif;
  font-weight: normal;
`;

export default function SendEmail() {
  return (
    <Container>
      <Wrapper>
        <Text>
          We have successfully sent an email to your email address. Please
          check your inbox and follow the instructions to reset your password.
          If you have not received the email, please check your spam folder.
        </Text>
      </Wrapper>
    </Container>
  );
}
