const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required"],
    },

    lastName: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [6, "Password length should be greater than 6 character"],
      select: true,
    },

    location: {
      type: String,
    },

    profession: {
      type: String,
    },

    avatar: {
      type: String,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: [{ type: String }],

    verified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
