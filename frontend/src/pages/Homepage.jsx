import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BsMoon, BsSunFill } from "react-icons/bs";
import style from "../styles/page/homepage.module.css";
import Profile from "../pages/Profile";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import FriendRequest from "../components/FriendRequest";
import { setTheme } from "../redux/slice/themeSlice";
import { setLogout } from "../redux/slice/userSlice";
import FriendCard from "../components/FriendCard";
import { friends, suggest, requests, posts } from "../assets/data";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(friends);
  const [suggestFriend, setSuggestFriend] = useState(friends);

  // console.log(theme);
  // console.log(user);

  const handleSearch = async (data) => {};

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };

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
                  <Profile user={user} />
                  <FriendCard friends={user?.friends} />
                </div>
              </div>
              <div className={style["col-xl-4"]}>
                <div className="main__post">
                  <CreatePost user={user} />

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
                  <FriendRequest
                    friendRequest={friendRequest}
                    suggestFriend={suggestFriend}
                  />
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
