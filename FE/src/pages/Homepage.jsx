import React, { Fragment } from "react";
import style from "../styles/page/homepage.module.css";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

const Homepage = () => {
  return (
    <Fragment>
      {/* header */}
      <Header />

      {/* main */}
      <main className={style["main"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-3"]}>
              <Sidebar />
            </div>
            <div className={style["col-xl-6"]}>
              <h1>User Post</h1>
            </div>
            <div className={style["col-xl-3"]}>
              <h1>Friend Request</h1>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Homepage;
