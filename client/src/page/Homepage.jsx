import React from "react";
import style from "../style/page/homepage.module.css";
import cardStyle from "../style/components/user.module.css";
import { BiImages, BiSolidLike, BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";
import Avatar from "../assets/avata.png";
import Post from "../assets/post.jpg";
import Header from "../layout/Header";
import ProfileCard from "../components/ProfileCard";
import FriendCard from "../components/FriendCard";
import FriendRequest from "../components/FriendRequest";
import SuggestFriend from "../components/SuggestFriend";

const Homepage = () => {
  return (
    <>
      <div className={style["wrapper"]}>
        <div className={style["container"]}></div>
        <Header />

        <main className={style["main"]}>
          <div className={style["container"]}>
            <div className={style["row"]}>
              <div className={style["col-xl-3"]}>
                <div className={style["main-left"]}>
                  <ProfileCard />
                  <FriendCard />
                </div>
              </div>
              <div className={style["col-xl-6"]}>
                <div className={style["main-center"]}>
                  <div className={style["main-center__content"]}>
                    <form action="">
                      <div className={style["user-field"]}>
                        <img src={Avatar} alt="" />
                        <input
                          type="text"
                          placeholder="What is on your mind..."
                          name="content"
                        />
                      </div>
                      <div className={style["btn-actions"]}>
                        <label htmlFor="imgUpload">
                          <input
                            type="file"
                            id="imgUpload"
                            data-max-size="5120"
                            accept=".jpg, .png, .jpeg"
                          />
                          <BiImages />
                          <span>Image</span>
                        </label>
                        <button className={style["post-btn"]}>Post</button>
                      </div>
                    </form>
                  </div>

                  <div className={style["main-center__posts"]}>
                    {/*  */}
                    <div className={cardStyle["profile-info"]}>
                      <Link to="">
                        <img
                          src={Avatar}
                          alt=""
                          className={cardStyle["profile-info__avatar"]}
                        />
                      </Link>
                      <div>
                        <p className={cardStyle["profile-info__name"]}>
                          Your Name
                        </p>
                        <p className={cardStyle["profile-info__createdAt"]}>
                          createdAt
                        </p>
                      </div>
                    </div>
                    <div className={style["post-content"]}>
                      <div className={style["post-content__para"]}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Aliquid commodi nisi corporis modi non ex, veniam
                        ipsum ad itaque quas minima dolorem maiores cum
                        consectetur ea eum laborum impedit eaque.
                      </div>
                      <div className={style["post-content__image"]}>
                        <img src={Post} alt="" />
                      </div>
                      <div className={style["post-content-actions"]}>
                        <div className={style["like-btn"]}>
                          <BiSolidLike />
                          <p>Likes</p>
                        </div>
                        <div className={style["comment-btn"]}>
                          <BiComment />
                          <p>Comments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["col-xl-3"]}>
                <div className={style["main-right"]}>
                  <FriendRequest />
                  <SuggestFriend />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Homepage;
