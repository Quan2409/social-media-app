const Users = require("../models/user.model.js");
const yup = require("yup");
const { sendVerificationEmail } = require("../utils/handleEmail.js");
const { hashPassword } = require("../utils/handlePassword.js");
const { comparePassword } = require("../utils/handlePassword.js");
const { createJWT } = require("../utils/handleToken.js");

//validation schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required(),
});

//handle register
const handleRegister = async (req, res, next) => {
  try {
    //check validate
    await registerSchema.validate(req.body);

    //request data
    const { firstName, lastName, email, password } = req.body;

    //check if user already exits
    const userExist = await Users.findOne({ email });
    if (userExist) {
      next("Email already exist");
      return;
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //send email verification
    await sendVerificationEmail(user, res);
  } catch (error) {
    if (error.name === "validationError") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  }
};

//handle login
const handleLogin = async (req, res, next) => {
  try {
    //check validate
    await loginSchema.validate(req.body);

    // user data
    const { email, password } = req.body;

    //find user by email, including friend information
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName, lastName, location, avatar -password",
    });

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next("User Account is not verify");
      return;
    }

    //compare password
    const isMatch = await comparePassword(password, user?.password);
    if (!isMatch) {
      next("Wrong Password");
      return;
    }

    // remove password field from user object
    user.password = undefined;

    // generate JWT token
    const token = createJWT(user?._id);

    // send successful login response
    res.status(201).json({
      success: true,
      message: "Login Success",
      user,
      token,
    });
  } catch (error) {
    if (error.name === "validationError") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = { handleRegister, handleLogin };
