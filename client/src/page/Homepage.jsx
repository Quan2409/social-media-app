import React from "react";
import style from "../style/page/homepage.module.css";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import ProfileCard from "../components/ProfileCard";
import FriendCard from "../components/FriendCard";
import FriendRequest from "../components/FriendRequest";
import SuggestFriend from "../components/SuggestFriend";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Homepage = () => {
  const { user } = useSelector((state) => state.user);

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
                  <ProfileCard user={user} />
                  <FriendCard />
                </div>
              </div>
              <div className={style["col-xl-6"]}>
                <div className={style["main-center"]}>
                  <CreatePost />
                  <PostCard />
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
