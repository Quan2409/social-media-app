import React from "react";
import style from "../style/components/friendRequest.module.css";
import { Link } from "react-router-dom";
import Avatar from "../assets/avatar.png";

const FriendRequest = () => {
  return (
    <div className={style["friend-request"]}>
      <div className={style["friend-request__heading"]}>
        <h2>Friend Request</h2>
        <span>0</span>
      </div>

      <div className={style["profile-info"]}>
        <Link to="profile/:id">
          <img src={Avatar} alt="" className={style["profile-info__avatar"]} />
        </Link>
        <div>
          <p className={style["profile-info__name"]}>Your Name</p>
          <p className={style["profile-info__profession"]}>Profession</p>
        </div>
      </div>

      <div className={style["friend-request__actions"]}>
        <button className={style["friend-request__actions--accept"]}>
          Accept
        </button>

        <button className={style["friend-request__actions--decline"]}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
