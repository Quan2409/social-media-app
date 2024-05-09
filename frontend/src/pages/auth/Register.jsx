import React, { useState } from "react";
import style from "../../styles/page/register.module.css";
import * as yup from "yup";

const register = () => {
  //

  // state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [error, setError] = useState({});

  //validation schema
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .matches(/^[^\d]+$/, "First name must not contain numbers")
      .required("First name is required"),

    lastName: yup
      .string()
      .matches(/^[^\d]+$/, "Last name must not contain numbers")
      .required("Last name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup.string().required("Password is required"),
    retypePassword: yup.string().required("Please retype password to confirm"),
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      setError({ retypePassword: "Passwords do not match" });
      return;
    }

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
      <div className={style["register"]}>
        <div className={style["container"]}>
          <div className={style["register-content"]}>
            <h1 className={style["content-title"]}>
              Become a member of Cuisine Hub
            </h1>
            <p className={style["content-quote"]}>"Let the food connect us"</p>
          </div>
          <form className={style["register-form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              // value={formData.firstName}
              onChange={handleChange}
            />
            {error.firstName && (
              <p className={style["error"]}>{error.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {error.lastName && (
              <p className={style["error"]}>{error.lastName}</p>
            )}

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className={style["error"]}>{error.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && (
              <p className={style["error"]}>{error.password}</p>
            )}

            <input
              type="password"
              name="retypePassword"
              placeholder="Retype Password"
              value={formData.retypePassword}
              onChange={handleChange}
            />
            {error.retypePassword && (
              <p className={style["error"]}>{error.retypePassword}</p>
            )}
            <button className={style["form-btn"]}>Send Verification</button>
          </form>

          <a href="/login">Already have accounts. Login Now</a>
        </div>
      </div>
    </main>
  );
};

export default register;
