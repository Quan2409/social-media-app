import React from "react";
import Avatar from "../assets/avatar.png";
import style from "../style/components/createPost.module.css";

const CreatePost = () => {
  return (
    <div className={style["post-create"]}>
      <img src={Avatar} alt="" />
      <form action="">
        <input
          type="text"
          placeholder="What is on your mind..."
          name="content"
        />
      </form>
    </div>
  );
};

export default CreatePost;
