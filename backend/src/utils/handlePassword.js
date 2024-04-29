const bcrypt = require("bcrypt");

//handle hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

//handle compare password
const comparePassword = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

module.exports = {
  hashPassword,
  comparePassword,
};
