const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    postId: {
      type: Schema.Types.objectId,
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
      replies: [
        {
          replyId: { type: mongoose.Schema.Types.ObjectId },

          userId: { type: Schema.Types.ObjectId, ref: "Users" },

          from: { type: String },

          reply_at: { type: Date, default: Date.now() },

          comment: { type: String },

          created_At: {
            type: Date,
            default: Date.now(),
          },

          updated_At: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;