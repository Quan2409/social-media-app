import React from "react";
import style from "../../styles/page/register.module.css";

const register = () => {
  return (
    <main className={style["main"]}>
      <div className={style["register"]}>
        <div className={style["container"]}>
          <div className={style["register-content"]}>
            <h1 className={style["content-title"]}>
              Become a member of Cuisine Hub
            </h1>
            <p className={style["content-quote"]}>"Let the food connect us"</p>
          </div>
          <form className={style["register-form"]}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Retype Password" />
            <button className={style["form-btn"]}>Send Verification</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default register;
