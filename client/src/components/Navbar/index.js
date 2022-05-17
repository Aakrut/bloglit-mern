import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Logo>
            <Link to="/">Blog</Link>
          </Logo>

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
          <Outlet />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Navbar;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  a {
    text-decoration: none;
    color:black ;
    font-weight:bold;
    font-family:'Poppins' ;
 }
`;
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const NavItem = styled.li`
  margin: 0 10px;

  a {
    text-decoration: none;
    color: black;
    
    font-family: "Poppins";
  }
`;
