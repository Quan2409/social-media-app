import React from "react";
import style from "../styles/layout/sidebar.module.css";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside>
      <nav className={style["aside__left"]}>
        <ul>
          <NavLink to={"/"}>
            <li>
              <i class="fa-solid fa-house"></i>Home
            </li>
          </NavLink>
          <NavLink to={"/profile"}>
            <li>
              <i class="fa-solid fa-user"></i>Profile
            </li>
          </NavLink>
          <NavLink to={"#"}>
            <li>
              <i class="fa-solid fa-comment"></i>Chat
            </li>
          </NavLink>
          <NavLink to={"/setting"}>
            <li>
              <i class="fa-solid fa-gear"></i>Setting
            </li>
          </NavLink>
          <NavLink to={"/terms"}>
            <li>
              <i class="fa-solid fa-book"></i>Terms
            </li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
