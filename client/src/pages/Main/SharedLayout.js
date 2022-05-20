import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/user/userSlice";

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isSidebarOpen} toggle={toggle} />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
