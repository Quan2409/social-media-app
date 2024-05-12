import React from "react";
import style from "../style/components/friendCard.module.css";
import cardStyle from "../style/components/user.module.css";
import Avatar from "../assets/avata.png";
import { Link } from "react-router-dom";

const FriendCard = () => {
  return (
    <>
      <div className={style["friend-card"]}>
        <div className={style["friend-list"]}>
          <h2>Friends</h2>
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
      </div>
    </>
  );
};

export default FriendCard;
