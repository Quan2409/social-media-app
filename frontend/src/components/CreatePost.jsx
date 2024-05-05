import React from "react";
import avatar from "../assets/images/user-profile.svg";
import style from "../styles/page/create.module.css";

const CreatePost = () => {
  return (
    <div className={style["create-post"]}>
      <div className={style["form"]}>
        <figure>
          <img
            src={avatar}
            alt="avatar"
            className={style["avatar"]}
            width={50}
            height={50}
          />
        </figure>
        <form>
          <input type="text" placeholder="What's the content today ?" />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
