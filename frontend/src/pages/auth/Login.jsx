import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/page/auth/login.module.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <main className={style["main"]}>
      <div className={style["container"]}>
        <div className={style["login"]}>
          <div className={style["login__content"]}>
            <h1 className={style["title"]}>Welcome to Cuisine Hub</h1>
            <p className={style["quotes"]}>"Let the food connect us"</p>
          </div>
          <form className={style["login__form"]}>
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
          </form>
          <div className={style["login__buttons"]}>
            <a className={style["forgot-pas-link"]}>Forgot Password</a>
            <button className={style["login-btn"]}>Sign in</button>
            <a href="/register" className={style["register-link"]}>
              Don't have account ? Register Here
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
