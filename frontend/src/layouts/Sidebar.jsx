import React from "react";
import { NavLink } from "react-router-dom";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faFloppyDisk,
  faBars,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
// svg
import homeIC from "../assets/icons/home.svg";
import userIC from "../assets/icons/user.svg";
import saveIC from "../assets/icons/saved.svg";
import settingIC from "../assets/icons/setting.svg";
import bookIC from "../assets/icons/book.svg";
//css
import style from "../styles/layout/sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={style["aside"]}>
      <nav className={style["aside__navbar"]}>
        <ul>
          <li>
            <img src={homeIC} alt="home-icon" className={style["item-ic"]} />
            <NavLink to="/" className={style["active"]}>
              Home
            </NavLink>
          </li>

          <li>
            <img src={userIC} alt="home-icon" className={style["item-ic"]} />
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li>
            <img src={saveIC} alt="home-icon" className={style["item-ic"]} />
            <NavLink to="/saved-post">Saved Post</NavLink>
          </li>

          <li>
            <img src={settingIC} alt="home-icon" className={style["item-ic"]} />
            <NavLink to="/setting">Setting</NavLink>
          </li>

          <li>
            <img src={bookIC} alt="home-icon" className={style["item-ic"]} />
            <NavLink to="/terms">Terms</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
