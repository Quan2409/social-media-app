import React from "react";
import style from "../style/components/friendCard.module.css";
import Avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";

const FriendCard = () => {
  return (
    <>
      <div className={style["friend-card"]}>
        <div className={style["friend-list"]}>
          <h2>Friends</h2>
          <span>0</span>
        </div>
        <div className={style["profile-info"]}>
          <Link to="profile/:id">
            <img
              src={Avatar}
              alt=""
              className={style["profile-info__avatar"]}
            />
          </Link>
          <div>
            <p className={style["profile-info__name"]}>Your Name</p>
            <p className={style["profile-info__profession"]}>Profession</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
