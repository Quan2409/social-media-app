const mongoose = require("mongoose");

const requestSchema = Schema(
  {
    requestTo: {
      type: Schema.Type.ObjectId,
      ref: "Users",
    },

    requestFrom: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    requestStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const friendRequest = mongoose.model("FriendRequest", requestSchema);

module.exports = friendRequest;
