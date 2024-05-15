import React, { useState } from "react";
import style from "../../style/page/reset-password.module.css";
import * as yup from "yup";
import { resetPasswordRequest } from "../../service/userService";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email type"),
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));

    setEmail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(email, { abortEarly: false });
      const response = await resetPasswordRequest(email);
      setSuccess(response.message);
    } catch (validationError) {
      const newErrors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      } else {
        newErrors.server = error.message;
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className={style["reset-password"]}>
      <h1>Reset Password</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {error.email && (
          <span className={style["form-error"]}>{error.email}</span>
        )}
        {success && <span className={style["form-success"]}>{success}</span>}
        <button>Send Request</button>
      </form>
    </div>
  );
};

export default ResetPassword;
