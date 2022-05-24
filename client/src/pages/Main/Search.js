import React from "react";
import styled from "styled-components";

const Search = () => {
  return (
    <Wrapper>
      <ContentWrapper>Search</ContentWrapper>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: center;
`;
