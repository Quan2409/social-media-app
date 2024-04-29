const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailVerification = new Schema({
  userId: {
    type: String,
  },

  token: {
    type: String,
  },

  createdAt: {
    type: Date,
  },

  expireAt: {
    type: Date,
  },
});

const Verification = mongoose.model("Verification", emailVerification);

module.exports = Verification;
