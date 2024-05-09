import React from "react";
import style from "../styles/page/request.module.css";
import noProfile from "../assets/images/user-profile.svg";
import { Link } from "react-router-dom";

const FriendRequest = ({ friendRequest, suggestFriend }) => {
  return (
    <>
      <div className={style["wrapper"]}>
        <div className={style["request"]}>
          <h1>Friend Request</h1>
          <span>{friendRequest.length}</span>
        </div>

        <div className={style["request-list"]}>
          {friendRequest?.map(({ _id, requestFrom: from }) => (
            <div key={_id} className={style["request-item"]}>
              <figure>
                <Link to={"/profile/" + from?._id}>
                  <img
                    src={from?.avatar ?? noProfile}
                    alt={from?.email}
                    className={style["profile-avatar"]}
                    width={50}
                    height={50}
                  />
                </Link>
              </figure>
              <div>
                <p className={style["username"]}>
                  {from?.firstName ?? "No Name"} {from?.lastName}
                </p>
                <p className={style["profession"]}>
                  {from?.profession ?? "No Profession"}
                </p>
              </div>
              <div className={style["btn-actions"]}>
                <button className={style["accept-btn"]}>Accept</button>
                <button className={style["decline-btn"]}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={style["wrapper"]}>
        <div className={style["suggest"]}>
          <h1>Suggest Friend</h1>
        </div>

        <div className={style["suggest-list"]}>
          {suggestFriend?.map((friend) => (
            <div key={friend._id} className={style["suggest-item"]}>
              <figure>
                <Link to={"/profile/" + friend?._id}>
                  <img
                    src={friend?.avatar ?? noProfile}
                    alt={friend?.email}
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
              <div className={style["btn-actions"]}>
                <button className={style["add-btn"]} onClick={() => {}}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
