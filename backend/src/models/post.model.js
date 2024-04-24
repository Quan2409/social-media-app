const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    likes: [{ type: String }],

    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
