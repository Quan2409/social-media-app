import React from "react";
import style from "../../style/page/login.module.css";

const Login = () => {
  return (
    <div className={style["container"]}>
      <div className={style["login"]}>
        <div className={style["login__content"]}>
          <h1>Welcome to Social Media</h1>
          <p>Connect people to the world</p>
        </div>

        <div className={style["login-form"]}>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>

        <div className={style["login-actions"]}>
          <a href="/reset-password">Forget Password</a>
          <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
