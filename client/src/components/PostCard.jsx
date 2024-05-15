import React from "react";
import Avatar from "../assets/avatar.png";
import Post from "../assets/post.jpg";
import style from "../style/components/postCard.module.css";
import { BiSolidLike, BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostCard = () => {
  return (
    <div className={style["post-card"]}>
      <div className={style["profile-info"]}>
        <Link to="profile/:id">
          <img src={Avatar} alt="" className={style["profile-info__avatar"]} />
        </Link>
        <div>
          <p className={style["profile-info__name"]}>Your Name</p>
          <p className={style["profile-info__createdAt"]}>createdAt</p>
        </div>
      </div>

      <div className={style["post-content"]}>
        <div className={style["post-content__para"]}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
          commodi nisi corporis modi non ex, veniam ipsum ad itaque quas minima
          dolorem maiores cum consectetur ea eum laborum impedit eaque.
        </div>

        <div className={style["post-content__image"]}>
          <img src={Post} alt="" />
        </div>

        <div className={style["post-content__actions"]}>
          <div className={style["post-content__actions--like"]}>
            <BiSolidLike />
            <p>Likes</p>
          </div>

          <div className={style["post-content__actions--comment"]}>
            <BiComment />
            <p>Comments</p>
          </div>

          <div className={style["post-content__actions--share"]}>
            <BiComment />
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
