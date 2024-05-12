import React from "react";
import style from "../style/components/header.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsMoon, BsSunFill } from "react-icons/bs";

const Header = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <header className={style["header"]}>
        <div className={style["container"]}>
          <div className={style["row"]}>
            <div className={style["col-xl-3"]}>
              <Link to="/">
                <h1 className={style["header__logo"]}>Social Media</h1>
              </Link>
            </div>

            <div className={style["col-xl-6"]}>
              <form className={style["header__form"]}>
                <input placeholder="Search..." className={style["search-ip"]} />
                <button className={style["search-btn"]}>Search</button>
              </form>
            </div>

            <div className={style["col-xl-3"]}>
              <div className={style["btn-actions"]}>
                <button className={style["theme-btn"]}>
                  {theme ? <BsMoon /> : <BsSunFill />}
                </button>
                <button className={style["logout-btn"]}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
