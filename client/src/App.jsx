import React from "react";
import { useSelector } from "react-redux";
import AppRouter from "./router/AppRouter";

const App = () => {
  const theme = useSelector((state) => state.theme);
  console.log(theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <AppRouter />;
    </div>
  );
};

export default App;
