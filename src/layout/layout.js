import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../pages/header/header";
import GradientBgColor from "../components/gradientBg/gradientBg";

const Layout = () => {

  return (
    <>
      <div className="bg-black w-full h-full">
        <div className="min-w-[375px]">
          <GradientBgColor />
        </div>
        <div>
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
