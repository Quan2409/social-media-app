import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/user/ProfilePage";
import SettingPage from "./pages/SettingPage";
import TermsPage from "./pages/TermsPage";
import AdminRouter from "./routes/AdminRouter";
import AuthRouter from "./routes/AuthRouter";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    // config routes
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="profile" element={<ProfilePage />}></Route>
      <Route path="setting" element={<SettingPage />}></Route>
      <Route path="terms" element={<TermsPage />}></Route>

      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
