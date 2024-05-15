const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPassword = new Schema({
  userId: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
  },

  token: {
    type: String,
  },

  createdAt: {
    type: Date,
  },

  expiredAt: {
    type: Date,
  },
});

const ResetPassword = mongoose.model("resetPassword", resetPassword);

module.exports = ResetPassword;
