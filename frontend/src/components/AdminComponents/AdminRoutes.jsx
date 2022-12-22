import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { isAuthenticated, sessionUser } = useSelector((state) => state.sessionSlice);

  return isAuthenticated === false ? <Navigate to="/loginSignup" replace={true} /> : sessionUser.role !== "admin" ? <Navigate to="/" replace={true} /> : <Outlet />;
}

export default AdminRoutes;
