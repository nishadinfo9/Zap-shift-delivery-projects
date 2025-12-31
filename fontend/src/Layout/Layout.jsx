import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";

const Layout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
