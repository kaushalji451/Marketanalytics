import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  console.log(
    "ProtectedRoute rendered with isLoggedIn:",
    isLoggedIn,
    "loading:",
    loading
  );

  if (loading) return <p>Loading...</p>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
