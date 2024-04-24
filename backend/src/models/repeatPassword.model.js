const mongoose = require("mongoose");

const passwordResetSchema = Schema({
  userId: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    uniques: true,
  },

  token: {
    type: String,
  },

  created_at: {
    type: Date,
  },

  expired_at: {
    type: Date,
  },
});

const RepeatPassword = mongoose.model("Post", passwordResetSchema);

module.exports = RepeatPassword;
