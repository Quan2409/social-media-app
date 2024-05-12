const Users = require("../models/user.model.js");
const { sendVerificationEmail } = require("../utils/handleEmail.js");
const { hashPassword, comparePassword } = require("../utils/handlePassword.js");
const { createJWT } = require("../utils/handleToken.js");

const authController = {
  // handle register
  handleRegister: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    //check validate
    if (!(firstName || lastName || email || password)) {
      next("Please provide required fields");
      return;
    }

    try {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        next("Email already exist");
        return;
      }

      const hashedPassword = await hashPassword(password);

      // create user
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      sendVerificationEmail(newUser, res);
    } catch (error) {
      if (error.name === "validationError") {
        res.status(400).json({ success: false, message: error.message });
      } else {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
    }
  },

  //handle login
  handleLogin: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!(email || password)) {
        next("Please provide required fields");
        return;
      }

      //find user by email, including friend information
      const userInfo = await Users.findOne({ email })
        .select("+password")
        .populate({
          path: "friends",
          select: "firstName, lastName, location, avatar -password",
        });

      if (!userInfo) {
        next("Invalid email or password");
        return;
      }

      if (!userInfo?.verified) {
        next("Email is not verified");
        return;
      }

      //compare password
      const isMatch = await comparePassword(userInfo?.password, password);
      if (!isMatch) {
        next("Wrong Password");
        return;
      }

      // remove password field from user object if valid
      userInfo.password = undefined;

      const token = createJWT(userInfo?._id);

      // send successful login response
      res.status(201).json({
        success: true,
        message: "Login Success",
        userInfo,
        token: token,
      });
    } catch (error) {
      if (error.name === "validationError") {
        res.status(400).json({ success: false, message: error.message });
      } else {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
    }
  },
};

module.exports = { authController };
