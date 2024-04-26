import React from "react";
import style from "../styles/page/homepage.module.css";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

const Homepage = () => {
  return (
    <>
      {/* header */}
      <Header />

      {/* main */}
      <main className={style["main"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-3"]}>
              {/* sidebar */}
              <Sidebar />
            </div>
            <div className={style["col-xl-5"]}>
              <h1>User Post</h1>
            </div>
            <div className={style["col-xl-4"]}>
              <h1>User Actions</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
