import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";
import OtherProfile from "../components/OtherProfile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const AppRouter = () => {
  return (
    <>
      <Routes element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/profile/:id?" element={<OtherProfile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AppRouter;
