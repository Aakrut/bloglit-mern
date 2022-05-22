import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../../features/blog/blogSlice";
import styled from "styled-components";
import BlogContainer from "../../components/BlogContainer";
import { SpinnerCircularSplit } from "spinners-react";

const Home = () => {
  const { blogs ,isLoading} = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);


   if (isLoading) {
     return (
       <Loader>
         <SpinnerCircularSplit
           size={50}
           thickness={100}
           speed={100}
           color="rgba(57, 159, 253, 1)"
           secondaryColor="rgba(57, 159, 253, 0.5)"
         />
       </Loader>
     );
   }


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

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media only screen and (max-width: 640px) {
    grid-template-columns:repeat(1,1fr);
  }
`;
