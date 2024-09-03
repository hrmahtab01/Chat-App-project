import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import Home from "./Home";

const RootElement = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RootElement;
