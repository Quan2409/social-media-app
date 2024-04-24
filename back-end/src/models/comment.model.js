const mongoose = required("mongoose");

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
          replyId: {
            type: mongoose.Schema.Types.ObjectId,
          },

          userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
          },

          from: {
            type: String,
          },

          content: {
            type: String,
          },

          reply_at: {
            type: Date,
            default: Date.now(),
          },

          created_at: {
            type: Date,
            default: Date.now(),
          },

          updated_at: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  },
  {
    timestamp: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
