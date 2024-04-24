const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    useId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    text: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    likes: [
      {
        type: String,
      },
    ],

    comments: [
      {
        type: Schema.Type.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
