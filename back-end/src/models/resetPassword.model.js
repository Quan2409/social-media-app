const mongoose = require("mongoose");

const passwordResetSchema = Schema({
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

  created_at: {
    type: Date,
  },

  expire_at: {
    type: Date,
  },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;
