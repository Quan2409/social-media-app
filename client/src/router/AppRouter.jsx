import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "../page/Homepage";
import Profile from "../page/Profile";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import ResetPassword from "../page/auth/ResetPassword";

// const ProtectedRoute = () => {
//   const { user } = useSelector((state) => state.user);
//   const location = useLocation();

//   return user.token ? (
//     <Outlet />
//   ) : (
//     <Navigate to="login" state={{ from: location }} replace />
//   );
// };

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AppRouter;
