import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import style from "../styles/layout/header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={style["header"]}>
      <div className={style["container"]}>
        <div className={style["row"]}>
          <div className={style["col-xl-3"]}>
            <span className={style["header__logo"]}>Cuisine Hub</span>
          </div>
          <div className={style["col-xl-5"]}>
            <form className={style["header__form"]}>
              <label>
                <input
                  className={style["search-ip"]}
                  type="text"
                  placeholder="Search"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={style["search-ic"]}
                />
              </label>
            </form>
          </div>
          <div className={style["col-xl-4"]}>
            <div className={style["header__button"]}>
              <button
                className={style["login-btn"]}
                onClick={() => navigate("/login")}
              >
                Log in
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
  );
};

export default Header;
