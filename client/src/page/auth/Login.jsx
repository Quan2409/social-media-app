import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../style/page/login.module.css";
import * as yup from "yup";
import { loginRequest } from "../../service/authService";
import { setLogin } from "../../redux/slice/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState({});

  //validation schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),

    password: yup.string().required("Password is required"),
  });

  // handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
      server: "",
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      server: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await loginRequest(formData);
      const localData = { token: response.token, ...response.userInfo };
      dispatch(setLogin(localData));
      window.location.replace("/");
    } catch (error) {
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      } else {
        newErrors.server = error.message;
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className={style["container"]}>
      <div className={style["login"]}>
        <div className={style["login__content"]}>
          <h1>Welcome to Social Media</h1>
          <p>Connect people to the world</p>
        </div>

        <div className={style["login-form"]}>
          <form onSubmit={handleSubmit}>
            <div className={style["login-form__email-ip"]}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <span className={style["login-form__error"]}>
                  {error.email}
                </span>
              )}
            </div>

            <div className={style["login-form__password-ip"]}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <span className={style["login-form__error"]}>
                  {error.password}
                </span>
              )}
            </div>

            {error.server && (
              <span className={style["server-error"]}>{error.server}</span>
            )}
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
