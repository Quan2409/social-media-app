import React from "react";
import style from "../styles/page/profile.module.css";
import Header from "../layouts/Header";

const Profile = () => {
  return (
    <>
      {/* header */}
      <Header />

      {/* main */}
      <main>
        <div className={style["container"]}>
          <h1>Profile Page</h1>
        </div>
      </main>
    </>
  );
};

export default Profile;
