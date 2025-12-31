import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../utils/Loader";

const Protected = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname} replace />;
  }
  return children;
};

export default Protected;
