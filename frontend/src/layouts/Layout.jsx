import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  // return user?.token ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default Layout;
