const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Verification = require("../models/emailVerification-model");
const { v4: createUUID } = require("uuid");
const { hashToken } = require("./handleToken");

// config env
dotenv.config();

//setup nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = async (user, res) => {
  const { _id, email, lastName } = user;
  const token = _id + createUUID();
  const link = process.env.APP_URL + "/user/verify/" + _id + "/" + token;

  //nodemailer options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Cuisine Hub - Account Verification",
    html: `
    <div style="border-radius: 5px; padding: 20px; font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7;">
      <h3 style="color: #ffd700; text-align: center; font-size: 2rem">
        Please verify your email address
      </h3>
      <hr />
      <h4>Hi ${lastName},</h4>
      <p>
        Please verify your email address so we can know that it's really you.
      </p>
      <p>This link <b>expires in 1 hour</b></p>
      <br />
      <a href="${link}" style="padding: 14px; color: #fff; text-decoration: none; background-color: #ffd700; border-radius: 8px; font-size: 18px;">
      Verify Email Address
      </a>
      <div style="margin-top: 60px">
        <h5>Best Regards</h5>
      </div>
      </div>
    `,
  };

  try {
    const hashedToken = await hashToken(token);
    const newVerifyEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });

    // if newVerifyEmail = true
    if (newVerifyEmail) {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
          return res
            .status(404)
            .json({ message: "Failed to send verify email" });
        }
        res.status(201).send({
          success: "Pending...",
          message: "Verification Email has been sent to your email",
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Failed to send verify email" });
  }
};

module.exports = { sendVerificationEmail };
