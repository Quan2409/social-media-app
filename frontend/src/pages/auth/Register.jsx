import React from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "../../styles/page/auth/register.module.css";

const register = () => {
  const navigate = useNavigate();

  return (
    <main className={style["main"]}>
      <div className={style["container"]}>
        <div className={style["register"]}>
          <div className={style["register__content"]}>
            <h1 className={style["title"]}>Welcome to Cuisine Hub</h1>
            <p className={style["quotes"]}>"Let the food connect us"</p>
          </div>
          <form className={style["register__form"]}>
            <input
              type="text"
              placeholder="Email"
              className={style["email-ip"]}
            />
            <input
              type="text"
              placeholder="Password"
              className={style["password-ip"]}
            />
            <input
              type="text"
              placeholder="Retype Password"
              className={style["password-ip"]}
            />
          </form>
          <div className={style["register__buttons"]}>
            <button className={style["register-btn"]}>Sign Up</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default register;
