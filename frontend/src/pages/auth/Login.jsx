import React from "react";
import style from "../../styles/page/login.module.css";

const Login = () => {
  return (
    <main className={style["main"]}>
      <div className={style["login"]}>
        <div className={style["container"]}>
          <div className={style["login-content"]}>
            <h1 className={style["content-title"]}>Welcome to Cuisine Hub</h1>
            <p className={style["content-quote"]}>"Let the food connect us"</p>
          </div>
          <form className={style["login-form"]}>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/reset-password">Forgot Password</a>
            <button className={style["form-btn"]}>Log In</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
