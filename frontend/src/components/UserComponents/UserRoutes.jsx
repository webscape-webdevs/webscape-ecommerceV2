import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserRoutes() {
  const { isAuthenticated } = useSelector((state) => state.sessionSlice);

  return isAuthenticated === false ? <Navigate to="/loginSignup" replace={true} /> : <Outlet />;
}

export default UserRoutes;
