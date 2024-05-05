import React from "react";
import style from "../../styles/page/reset.module.css";

const ResetPassword = () => {
  return (
    <main className={style["main"]}>
      <div className={style["container"]}>
        <div className={style["content"]}>
          <h1 className={style["content-title"]}>Reset Password</h1>
        </div>
        <form className={style["form"]}>
          <input type="text" placeholder="Enter Your Email" />
          <button className={style["form-btn"]}>Send Verification</button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
