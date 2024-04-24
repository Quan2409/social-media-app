const JWT = require("jsonwebtoken");

//json token
const createJWT = (id) => {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expireIn: "1d",
  });
};

module.exports = createJWT;
