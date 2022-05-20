import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

const Sidebar = ({ toggle, isOpen }) => {
  return (
    <>
      <SideBarContainer isOpen={isOpen}>
        <Icon onClick={toggle}>
          <MdOutlineClose />
        </Icon>

        <SideWrapper>
          <SidebarMenu>
            <SidebarLink onClick={toggle} to="/search">
              Search
            </SidebarLink>

            <SidebarLink onClick={toggle} to="/create">
              Create
            </SidebarLink>

            <SidebarLink onClick={toggle} to="/user">
              User
            </SidebarLink>
          </SidebarMenu>
        </SideWrapper>
      </SideBarContainer>
    </>
  );
};

export default Sidebar;

const SideBarContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
`;

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;
  @media screen and (max-width: 964px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

const SideWrapper = styled.div`
  color: #fff;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: all 0.2s ease-in-out;
  color: white;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: #399ffd;
  }
`;
