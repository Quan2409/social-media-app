const mongoose = require("mongoose");

const emailVerification = Schema({
  userId: {
    type: String,
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

const Verification = mongoose.model("Verification", emailVerification);

module.exports = Verification;
