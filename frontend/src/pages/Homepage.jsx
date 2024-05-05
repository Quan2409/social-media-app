import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../styles/page/homepage.module.css";
import Profile from "../pages/Profile";
import CreatePost from "../components/CreatePost";
import FriendRequest from "../components/FriendRequest";

const Homepage = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  console.log(theme);

  return (
    <>
      <header className={style["header"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-3"]}>
              <h1 className={style["header__logo"]}>Cuisine Hub</h1>
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
                <Profile />
              </div>
            </div>
            <div className={style["col-xl-4"]}>
              <div className="main__post">
                <div className="create-post">
                  <CreatePost />
                </div>
                <div className="post">
                  <h1>User Post</h1>
                </div>
              </div>
            </div>
            <div className={style["col-xl-4"]}>
              <div className={style["main__friend"]}>
                <FriendRequest />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
