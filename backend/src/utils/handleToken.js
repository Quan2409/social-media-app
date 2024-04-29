const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//hashed token
const hashToken = async (token) => {
  const salt = await bcrypt.genSalt(10);
  const hashToken = await bcrypt.hash(token, salt);
  return hashToken;
};

//compare token
const compareToken = async (userToken, token) => {
  const isMatch = await bcrypt.compare(userToken, token);
  return isMatch;
};

//create token
const createJWT = (id) => {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = {
  hashToken,
  compareToken,
  createJWT,
};
