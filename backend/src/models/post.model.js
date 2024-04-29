const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
