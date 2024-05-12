import React from "react";
import style from "../style/components/friendSuggest.module.css";
import cardStyle from "../style/components/user.module.css";
import { Link } from "react-router-dom";
import Avatar from "../assets/avata.png";

const SuggestFriend = () => {
  return (
    <div className={style["friend-suggest"]}>
      <div className={style["friend-suggest__heading"]}>
        <h2>Friend Suggested</h2>
        <span>0</span>
      </div>

      <div className={style["friend-suggest__wrapper"]}>
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

        <div className={style["friend-suggest__actions"]}>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default SuggestFriend;
