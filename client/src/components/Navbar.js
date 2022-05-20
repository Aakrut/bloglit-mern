import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ toggle }) => {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Logo>
            <Link to="/">BlogLit</Link>
          </Logo>

          <Menu onClick={toggle}>
            <HiMenu />
          </Menu>

          <NavItems>
            <NavItem>
              <Link to="/search">Search</Link>
            </NavItem>
            <NavItem>
              <Link to="/create">Create</Link>
            </NavItem>
            <NavItem>
              <Link to="/user">User</Link>
            </NavItem>
          </NavItems>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Navbar;

const Wrapper = styled.div`
  height: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: 640px) {
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  a {
    text-decoration: none;
    color: black;
    font-size: 24px;
    font-weight: bold;
    font-family: "Poppins";
  }
`;
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 10px;

  a {
    text-decoration: none;
    color: black;

    font-family: "Poppins";
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #399ffd;
    }
  }
`;

const Menu = styled.div`
  display: none;

  @media only screen and (max-width: 640px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
  }
`;
