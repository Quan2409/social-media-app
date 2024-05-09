import React, { useState } from "react";
import noProfile from "../assets/images/user-profile.svg";
import style from "../styles/page/02homepage.module.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { posts } from "../assets/data";
import PostCard from "../components/PostCard";
import FriendCard from "../components/FriendCard";

const OtherProfile = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { userInfo, setUserInfo } = useState(user);
  const { post } = useSelector((state) => state.post);

  return (
    <>
      <div data-theme={theme} className={style["wrapper"]}>
        <header className={style["header"]}>
          <div className={style["container"]}>
            <div className={style["row"]}>
              <div className={style["col-xl-3"]}>
                <Link to="/">
                  <h1 className={style["header__logo"]}>Cuisine Hub</h1>
                </Link>
              </div>
              <div className={style["col-xl-5"]}>
                <form className={style["header__form"]}>
                  <input
                    className={style["search-ip"]}
                    type="text"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className={style["col-xl-4"]}>
                <div className={style["header__buttons"]}>
                  {/* <button
                    className={style["theme-btn"]}
                    onClick={() => handleTheme()}
                  >
                    {theme ? <BsMoon /> : <BsSunFill />}{" "}
                  </button>

                  <button
                    className={style["logout-btn"]}
                    onClick={() => dispatch(setLogout())}
                  >
                    Log Out
                  </button> */}

                  <button
                    className={style["login-btn"]}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className={style["register-btn"]}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={style["main"]}>
          <div className={style["container"]}>
            <div className={style["row"]}>
              <div className={style["col-xl-4"]}>
                <div className="main__user">
                  <div className={style["user-profile"]}>
                    <div className={style["profile"]}>
                      <figure>
                        <Link to={"/profile/" + user?._id}>
                          <img
                            src={userInfo?.avatar ?? noProfile}
                            alt={userInfo?.email}
                            className={style["profile-avatar"]}
                            width={50}
                            height={50}
                          />
                        </Link>
                      </figure>
                      <div>
                        <p className={style["username"]}>
                          {user?.firstName ?? "No Name"} {user?.lastName}
                        </p>
                        <p className={style["profession"]}>
                          {user?.profession ?? "No Profession"}
                        </p>
                      </div>

                      {/* {user?._id === data?._id ? (
                        <>
                          <button
                            className={style["edit-btn"]}
                            onClick={() => dispatch(setUpdateProfile(true))}
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <button
                          className={style["edit-btn"]}
                          onClick={() => {}}
                        >
                          Add
                        </button>
                      )} */}
                    </div>
                    <div className={style["information"]}>
                      <span className={style["profile-location"]}>
                        {user?.location ?? "Add Location"}
                      </span>
                      <span className={style["profile-profession"]}>
                        {user?.profession ?? "Add Profession"}
                      </span>
                      <span className={style["join-time"]}>
                        <b>Joined at</b>: {moment(user?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["col-xl-4"]}>
                <div className="main__post">
                  {/* posts */}
                  {posts.length > 0 ? (
                    posts?.map((post) => (
                      <PostCard
                        key={post?._id}
                        post={post}
                        user={user}
                        deletePost={() => {}}
                        likePost={() => {}}
                      />
                    ))
                  ) : (
                    <p>No Post Available</p>
                  )}
                </div>
              </div>
              <div className={style["col-xl-4"]}>
                <div className={style["main__friend"]}>
                  <FriendCard friends={userInfo?.friends} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OtherProfile;
