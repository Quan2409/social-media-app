import React, { useState } from "react";
import style from "../../style/page/register.module.css";
import * as yup from "yup";
import { registerRequest } from "../../service/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validationSchema = yup.object({
    firstName: yup
      .string("First name mus be string")
      .required("First Name is required"),
    lastName: yup
      .string("Last name mus be string")
      .required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Enter password, please"),
    confirmPassword: yup.string().required("Enter confirm password, please"),
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await registerRequest(formData);
      setSuccess(response.message);
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
      <div className={style["register"]}>
        <h1>Become a member of Social Media</h1>
        <form className={style["register__form"]} onSubmit={handleSubmit}>
          <div className={style["form__username"]}>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className={style["register-form__error"]}>
                  {errors.firstName}
                </span>
              )}
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className={style["register-form__error"]}>
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className={style["form__auth"]}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className={style["register-form__error"]}>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className={style["register-form__error"]}>
                  {errors.password}
                </span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className={style["register-form__error"]}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
          {errors.server && (
            <span className={style["server__error"]}>{errors.server}</span>
          )}
          {success && (
            <span className={style["register-form__success"]}>{success}</span>
          )}

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
