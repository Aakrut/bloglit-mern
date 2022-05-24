import React from "react";
import styled from "styled-components";

const Pagination = ({
  setCurrentPage,
  numberOfPages,
  currentPage,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;

    if (currentPage === 1) {
      return (
        <Wrapper>
          <button
            className="btn-next"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            Next
          </button>
        </Wrapper>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <Wrapper2>
          <button
            className="btn"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            Previous
          </button>
          <p className="page">{currentPage}</p>
          <button
            className="btn"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            Next
          </button>
        </Wrapper2>
      );
    } else {
      return (
        <Wrapper3>
          <button
            className="btn"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            Prev
          </button>
          <p className="page">{currentPage}</p>
        </Wrapper3>
      );
    }
  };

  return <>{renderPagination()}</>;
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;

  .btn-next {
    background: #399ffd;
    outline: none;
    border-radius: 5px;
    border: none;
    width: auto;
    height: auto;
    padding: 10px 30px;
    color: white;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    transition: all 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translate(0, -5px);
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
    }
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;

  .page {
    background: #e1e1e1;
    font-size: 22px;
    font-family: "Poppins", sans-serif;
    margin: 0 20px;
    padding: 0 10px;
    border-radius: 5px;
  }

  .btn {
    background: #399ffd;
    outline: none;
    border-radius: 5px;
    border: none;
    width: auto;
    height: auto;
    padding: 10px 30px;
    color: white;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    transition: all 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translate(0, -5px);
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
    }
  }
`;

const Wrapper3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;

  .page {
    background: #e1e1e1;
    font-size: 22px;
    font-family: "Poppins", sans-serif;
    margin: 0 20px;
    padding: 0 10px;
    border-radius: 5px;
  }

  .btn {
    background: #399ffd;
    outline: none;
    border-radius: 5px;
    border: none;
    width: auto;
    height: auto;
    padding: 10px 30px;
    color: white;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    transition: all 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translate(0, -5px);
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
    }
  }
`;
