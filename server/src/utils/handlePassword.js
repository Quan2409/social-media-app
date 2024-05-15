const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { hashToken } = require("./handleToken");
const { v4: createUUID } = require("uuid");
const ResetPassword = require("../models/resetPassword.model");

// config env
dotenv.config();

//nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

//handle hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

//handle compare password
const comparePassword = async (userPassword, passwordRecord) => {
  const isMatch = await bcrypt.compare(userPassword, passwordRecord);
  return isMatch;
};

const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;
  const token = _id + createUUID();
  const link =
    process.env.APP_URL + "/user/reset-password/" + _id + "/" + token;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Cuisine Hub - Reset Password",
    html: `
    <div style="border-radius: 5px; padding: 20px; font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7;">
      <h3 style="color: #ffd700; text-align: center; font-size: 2rem">
        Password Reset Link. Please click the link below to reset password.
      </h3>
      <hr />
      <p>This link <b>expires in 10 minutes</b></p>
      <br />
      <a href="${link}" style="padding: 14px; color: #fff; text-decoration: none; background-color: #ffd700; border-radius: 8px; font-size: 18px;">
      Verify Email Address
      </a>
      </div>
    `,
  };

  try {
    const hashedToken = await hashToken(token);
    const resetEmail = await ResetPassword.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });
    if (resetEmail) {
      await transporter.sendMail(mailOptions);
      res.status(201).send({
        success: "Pending...",
        message: "Reset password link has been sent",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Failed to send reset link" });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  resetPasswordLink,
};
