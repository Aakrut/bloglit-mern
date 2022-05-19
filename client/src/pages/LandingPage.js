import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LandingImage1 from "../assets/images/landing1.png";
import LandingImage2 from "../assets/images/landing2.png";

const LandingPage = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <MainWrapper>
          <Name>BlogLit</Name>
          <Detail>
            Share Your Stories & Ideas with Others by Joining Our BlogLit.
          </Detail>
          <Button to="/register">Log In / Sign Up</Button>
        </MainWrapper>

        <ImageWrapper>
          <img src={LandingImage1} className="img1" alt="landing-1" />
          <img src={LandingImage2} className="img2" alt="landing-2" />
        </ImageWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  grid-gap: 10px;

  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and (max-width: 940px) {
    margin: 0 10px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: 640px) {
    align-items: center;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  img {
    height: 500px;
    width: 480px;
    position: absolute;
    border-radius: 10px;
  }

  @media only screen and (max-width: 640px) {
    display: none;
  }

  .img1 {
    left: 0;
    top: -300px;
    z-index: -1;
  }

  .img2 {
    left: 80px;
    top: -180px;
    z-index: 0;
  }
`;

const Name = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  line-height: 97px;
  margin: 15px 0;
`;

const Detail = styled.p`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 48px;
  margin: 15px 0;

  @media only screen and (max-width: 640px) {
    font-size: 25px;
  }
`;

const Button = styled(Link)`
  margin-top: 15px;

  background: #399ffd;
  border-radius: 5px;
  height: 55px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;

  text-decoration: none;
  color: white;
  transition:all 0.3s ease-in-out ;
  

  &:hover {
    box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
    transform:translate(0,-5px) ;
  }
`;
