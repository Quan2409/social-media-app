const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectID,
      ref: "User",
    },

    requestFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    requestStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model("FriendRequest", requestSchema);

module.exports = FriendRequest;
