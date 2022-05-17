import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components";

const SharedLayout = ({ children }) => {
  return (
      <div>
          <Navbar />
      {children}
    </div>
  );
};

export default SharedLayout;
