import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../styles/layout/header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <header className={style["header"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-3"]}>
              <Link to={"/"}>
                <h1
                  className={style["header__logo"]}
                  onClick={() => navigate("/")}
                >
                  Cuisine Hub
                </h1>
              </Link>
            </div>
            <div className={style["col-xl-5"]}>
              <form className={style["header__form"]}>
                <input
                  type="text"
                  placeholder="Search"
                  className={style["search-form"]}
                />
              </form>
            </div>
            <div className={style["col-xl-4"]}>
              <div className={style["header__btn"]}>
                <button
                  onClick={() => navigate("/auth/login")}
                  className={style["btn-login"]}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
