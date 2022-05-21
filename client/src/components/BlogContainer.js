import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/landing1.png";

const BlogContainer = (blog) => {
  return (
    <Wrapper key={blog.blog._id}>
      <ImageWrapper>
        <ImageContent>
          <img src={blog.blog.image} className="main" alt="blog" />
          <img src={blog.blog.image} alt="blog-blur" className="blog-blur" />
        </ImageContent>
      </ImageWrapper>
      <DetailWrapper>
        <h2 className="title">{blog.blog.title}</h2>
        <p className="description">
          {blog.blog.desc.substring(0, 120)}
          ...
        </p>
        <Button to="/create">Continue Reading</Button>
      </DetailWrapper>
    </Wrapper>
  );
};

export default BlogContainer;

const Wrapper = styled.div`
  padding: 20px 0;
  width: 300px;
  height: auto;
  background: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 262px;
  height: 235px;
`;

const ImageContent = styled.div`
  position: relative;
  width: 260px;

  img {
    position: absolute;
    height: 235px;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 5px;
    z-index: 1;
  }

  .blog-blur {
    width: 218px;
    height: 185px;
    left: 19px;
    right: 10.72%;
    top: 60px;
    bottom: 42.28%;
    filter: blur(120px);
    z-index: 0;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  margin: 15px 15px;

  .title {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
  }

  .description {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    margin: 10px 0;
  }
`;

const Button = styled(Link)`
  width: 180px;
  height: 40px;
  background: #399ffd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 10px;
  color: black;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  transition: all 0.3s ease-in-out;

  text-decoration: none;

  &:hover {
    box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
    color: white;
    transform: translate(0, -5px);
  }
`;
