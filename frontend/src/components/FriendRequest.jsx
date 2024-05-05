import React from "react";
import style from "../styles/page/request.module.css";

const FriendRequest = () => {
  return (
    <>
      <div className={style["request"]}>
        <h1>Friend Request</h1>
      </div>
      <div className={style["suggest"]}>
        <h1>Suggest Friend</h1>
      </div>
    </>
  );
};

export default FriendRequest;
