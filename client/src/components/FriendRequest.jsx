import React from "react";
import style from "../style/components/friendRequest.module.css";
import cardStyle from "../style/components/user.module.css";
import { Link } from "react-router-dom";
import Avatar from "../assets/avata.png";

const FriendRequest = () => {
  return (
    <div className={style["friend-request"]}>
      <div className={style["friend-request__heading"]}>
        <h2>Friend Request</h2>
        <span>0</span>
      </div>

      <div className={cardStyle["profile-info"]}>
        <Link to="">
          <img
            src={Avatar}
            alt=""
            className={cardStyle["profile-info__avatar"]}
          />
        </Link>
        <div>
          <p className={cardStyle["profile-info__name"]}>Your Name</p>
          <p className={cardStyle["profile-info__profession"]}>Profession</p>
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
