import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Profile from "../pages/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const mainRouter = () => {
  return (
    <Routes>
      {/* home */}
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>

      {/* auth */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default mainRouter;
