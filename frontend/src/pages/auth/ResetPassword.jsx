import React, { useState } from "react";
import style from "../../styles/page/reset.module.css";
import * as yup from "yup";

const ResetPassword = () => {
  //state
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState({});

  //validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
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
      <div className={style["container"]}>
        <div className={style["content"]}>
          <h1 className={style["content-title"]}>Reset Password</h1>
        </div>
        <form className={style["form"]} onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
          />
          {error.email && <p className={style["error"]}>{error.email}</p>}
          <button className={style["form-btn"]}>Send Verification</button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
