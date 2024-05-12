const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },

    comment: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: String,
      },
    ],

    from: {
      type: String,
      required: true,
    },

    replies: [
      {
        replyId: { type: mongoose.Schema.Types.ObjectId },

        userId: { type: Schema.Types.ObjectId, ref: "Users" },

        from: { type: String },

        replyAt: { type: String },

        comment: { type: String },

        likes: [{ type: String }],

        createdAt: {
          type: Date,
          default: Date.now(),
        },

        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
