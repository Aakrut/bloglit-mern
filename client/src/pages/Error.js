import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ErrorResponse>404</ErrorResponse>
        <Message>Oops! Something Went Wrong!</Message>
        <BackButton to="/">Go Back to Home</BackButton>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const ErrorResponse = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 200px;
  @media only screen and (max-width: 640px) {
    font-size: 100px;
  }
`;

const Message = styled.h5`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 60px;
  line-height: 90px;

  @media only screen and (max-width: 640px) {
    font-size: 20px;
  }
`;

const BackButton = styled(Link)`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000;
  border-radius: 5px;
  text-decoration: none;
  margin: 10px 0;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  color: black;
  font-weight: 600;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translate(0, -5px);
    color: white;
    background: black;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (min-width: 640px) {
    font-size: 18px;
  }
`;
