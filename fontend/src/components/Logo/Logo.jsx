import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = ({ path = "/" }) => {
  return (
    <Link to={path} className="flex items-end">
      <img src={logo} alt="" />
      <p className="font-bold text-secondary-content text-3xl -ms-2">
        zapShift
      </p>
    </Link>
  );
};

export default Logo;
