import React, {  useState } from "react";
import styled from "styled-components";
import FormRow from "../../components/FormRow";
import BlogContainer from "../../components/BlogContainer";
import { useDispatch, useSelector } from "react-redux";
import { searchBlog } from "../../features/blog/blogSlice";
import { SpinnerCircularSplit } from "spinners-react";

const Search = () => {
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBlog(value));
  };

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
        <MainWrapper>
          <form onSubmit={handleSubmit}>
            <FormRow
              type="search"
              placeholder="Search here..."
              name="search"
              value={value}
              handleChange={(e) => setValue(e.target.value)}
            />
            <button className="btn-search" type="submit">
              Click
            </button>
          </form>
        </MainWrapper>

        {value === "" ? (
          <div className="result">Search For Results</div>
        ) : (
          <div className="blog-grid">
            {blogs?.map((blog, index) => {
              return <BlogContainer blog={blog} key={index} />;
            })}
            {/* Hello! */}
          </div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Search;

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
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;

  .result {
    text-align: center;
    margin: 20px 0;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 30px;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin: 20px 0;

    @media only screen and (max-width: 640px) {
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 10px;
    }
  }
`;

const MainWrapper = styled.div`
  width: 100%;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 100%;
    height: 50px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0 10px 10px;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  input:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }

  input::placeholder {
    font-family: "Poppins", sans-serif;
  }

  .btn-search {
    width: auto;
    height: 50px;
    background: #a1ddff;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    padding: 0 10px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 45px;

    margin: 20px 10px;
    transition: all 0.25s ease-in-out;

    &:hover {
      background: #399ffd;
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
      transform: translate(0, -5px);
      color: white;
    }
  }
`;
