import React, { useState } from "react";
import style from "../../styles/page/login.module.css";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch;

  // state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await yup.reach(validationSchema, name).validate(value);
      setError({ ...error, [name]: "" });
    } catch (err) {
      setError({ ...error, [name]: err.message });
    }
  };

  //handle submit
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Valid Data: ", formData);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setError(errors);
    }
  };

  return (
    <main className={style["main"]}>
      <div className={style["login"]}>
        <div className={style["container"]}>
          <div className={style["login-content"]}>
            <h1 className={style["content-title"]}>Welcome to Cuisine Hub</h1>
            <p className={style["content-quote"]}>"Let the food connect us"</p>
          </div>
          <form className={style["login-form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {error.email && <p className={style["error"]}>{error.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {error.password && (
              <p className={style["error"]}>{error.password}</p>
            )}

            <a href="/reset-password">Forgot Password</a>

            <button className={style["form-btn"]}>
              {isSubmit ? "Signing in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
