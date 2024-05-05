import React from "react";
import avatar from "../assets/images/user-profile.svg";
import style from "../styles/page/profile.module.css";

const Profile = () => {
  return (
    <>
      <div className={style["user-profile"]}>
        <div className={style["profile"]}>
          <figure>
            <img
              src={avatar}
              alt="avatar"
              className={style["profile-avatar"]}
              width={50}
              height={50}
            />
          </figure>
          <div>
            <p className={style["username"]}>Quan Do</p>
            <p className={style["profession"]}>No Profession</p>
          </div>
          <button className={style["edit-btn"]}>Edit</button>
        </div>
      </div>
      <div className={style["user-friend"]}>
        <h1>List Friend</h1>
      </div>
    </>
  );
};

export default Profile;
