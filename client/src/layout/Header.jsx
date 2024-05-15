import React, { useEffect, useState } from "react";
import style from "../style/components/header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";
import { setLogout } from "../redux/slice/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    dispatch(setLogout());
    setIsLogin(false);
  };

  return (
    <>
      <header className={style["header"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-2"]}>
              <Link to="/">
                <h1 className={style["header__logo"]}>Social Media</h1>
              </Link>
            </div>

            <div className={style["col-xl-6"]}>
              <form className={style["header__form"]}>
                <input placeholder="Search..." />
                <button>Search</button>
              </form>
            </div>

            <div className={style["col-xl-4"]}>
              <div className={style["btn-actions"]}>
                {isLogin ? (
                  <>
                    <button className={style["theme-btn"]}>
                      {theme ? <BsMoon /> : <BsSunFill />}
                    </button>

                    <button className={style["bell-btn"]}>
                      <BsBellFill />
                    </button>

                    <button
                      className={style["logout-btn"]}
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    className={style["logout-btn"]}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
