import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Homepage from "../pages/Homepage";
import Profile from "../pages/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/profile/:id?" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AppRouter;
