import React from "react";
import style from "../../style/page/register.module.css";

const Register = () => {
  return (
    <div className={style["container"]}>
      <div className={style["register"]}>
        <h1>Become a member of Social Media</h1>
        <form action="" className={style["register__form"]}>
          <div className={style["form__username"]}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>

          <div className={style["form__auth"]}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>

          <button>Register</button>
        </form>
        <a href="/login" className={style["register__actions"]}>
          Already have Accounts. Login Now !
        </a>
      </div>
    </div>
  );
};

export default Register;
