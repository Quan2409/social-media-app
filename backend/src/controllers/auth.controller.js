const Users = require("../models/user.model.js");
const yup = require("yup");
const { hashPassword } = require("../utils/handlePassword.js");

//validation schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
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
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //send email verification
  } catch (error) {
    if (error.name === "validationError") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = handleRegister;
