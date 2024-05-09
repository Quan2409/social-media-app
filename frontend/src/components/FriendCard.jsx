import React from "react";
import NoProfile from "../assets/images/user-profile.svg";
import { Link } from "react-router-dom";
import style from "../styles/page/friendCard.module.css";
import { useSelector, useDispatch } from "react-redux";

const FriendCard = ({ friends }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className={style["user-friend"]}>
        <div className={style["content"]}>
          <h1>List Friend</h1>
          <span>{user?.friends?.length ?? 0}</span>
        </div>

        <div className={style["friend-list"]}>
          {friends?.map((friend) => (
            <div key={friend?._id} className={style["list-item"]}>
              <figure>
                <Link to={"/profile/" + friend?._id} key={friend?._id}>
                  <img
                    src={friend?.avatar ?? NoProfile}
                    alt={friend?.firsName}
                    className={style["profile-avatar"]}
                    width={50}
                    height={50}
                  />
                </Link>
              </figure>
              <div>
                <p className={style["username"]}>
                  {friend?.firstName ?? "No Name"} {friend?.lastName}
                </p>
                <p className={style["profession"]}>
                  {friend?.profession ?? "No Profession"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
