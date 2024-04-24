import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default AdminRoute;
