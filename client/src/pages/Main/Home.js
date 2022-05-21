import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../../features/blog/blogSlice";
import styled from "styled-components";
import BlogContainer from "../../components/BlogContainer";

const Home = () => {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <Wrapper>
      <ContentWrapper>
        {blogs.map((blog, index) => {
          return <BlogContainer blog={blog} key={index} />;
        })}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;
