const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comments = require("../models/comment.model");
const {
  toggleLikePost,
  toggleLikeComment,
} = require("../utils/handleLikePost");

const postController = {
  createPost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { title, content, image } = req.body;

      if (!content) {
        next("Please provide content");
        return;
      }

      const newPost = await Post.create({
        userId,
        title,
        description,
        image,
      });

      res.status(200).json({
        message: "Post created success",
        data: newPost,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        message: error.message,
      });
    }
  },

  readAllPost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { search } = req.body;

      //fetch user information
      const userInfo = await User.findById(userId);

      // get friends list and add current user ID to it
      const friends = (userInfo?.friends?.toString().split("") ?? []).concat(
        userId
      );

      // create search query for posts
      const searchPostQuery = {
        $or: [
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };

      // fetch posts (with or without search query)
      const posts = await Post.find(search ? searchPostQuery : {})
        .populate({
          path: "userId",
          select: "firstName lastName location avatar -password",
        })
        .sort({
          _id: -1,
        });

      // filter posts by friends and non-friends
      const friendsPosts = posts?.filter((post) =>
        friends.includes(post?.userId?._id.toString())
      );
      const otherPosts = posts.filter(
        (post) => !friends.includes(post?.userId?._id.toString())
      );

      // determine response based on friends posts availability
      let postResponse = null;
      if (friendsPosts?.length > 0) {
        postResponse = search ? friendsPosts : [...friendsPosts, ...otherPosts];
      } else {
        postResponse = posts;
      }

      res.status(200).json({
        message: "All posts showed",
        data: postResponse,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        message: error.message,
      });
    }
  },

  readSinglePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const postInfo = await Post.findById(id).populate({
        path: "userId",
        select: "firstName lastName location avatar -password",
      });

      res.status(200).json({
        message: "This is a single post",
        data: postInfo,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Post.findByIdAndDelete(id);

      res.status(200).json({
        message: "Delete Success",
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  writeComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body.user;
      const { comment, from } = req.body;

      if (!comment) {
        next("Comment is required");
        return;
      }

      const newComment = await Comments.create({
        comment,
        from,
        userId,
        postId: id,
      });

      await Post.findByIdAndUpdate(
        id,
        { $push: { comments: newComment } },
        { new: true }
      );

      res.status(201).json({
        message: "Comment created success",
        data: newComment,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        message: error.message,
      });
    }
  },

  replyComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body.user;
      const { comment, replyAt, from } = req.body;

      if (!comment) {
        next("Comment is required");
        return;
      }

      const commentContent = await Comments.findById(id);
      if (!commentContent) {
        next("Comment Not Found");
        return;
      }

      const reply = {
        comment,
        replyAt,
        from,
        userId,
        createdAt: new Date(),
      };

      commentContent.replies.push(reply);
      await commentContent.save();

      res.status(200).json({
        message: "Reply comment success",
        data: commentContent,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
    }
  },

  readAllComments: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const postComments = await Comments.find({
        postId,
      })
        .populate({
          path: "userId",
          select: "firstName lastName location avatar -password",
        })
        .populate({
          path: "replies.userId",
          select: "firstName lastName location avatar -password",
        })
        .sort({
          _id: -1,
        });

      res.status(200).json({
        success: true,
        message: "Success",
        data: postComments,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
    }
  },

  likePost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id } = req.params;

      const postInfo = await Post.findById(id);
      const updatePost = await toggleLikePost(postInfo, userId);
      const savedPost = await updatePost.save();

      res.status(200).json({
        message: "Post liked",
        data: savedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  likeComment: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id, replyId } = req.params;

      if (replyId === undefined || replyId === null) {
        const comment = await Comments.findById(id);
        const updateComment = await toggleLikeComment(comment, userId);
        const saveComment = await Comments.findByIdAndUpdate(id, updateComment);

        if (saveComment) {
          res.status(201).json({
            message: "Comment is Liked",
            data: saveComment,
          });
        } else {
          res.status(404).json({
            message: "Comment not found",
          });
        }
      } else {
        const replyComments = await Comments.findOne(
          { _id: id },
          {
            replies: {
              $elemMatch: {
                _id: replyId,
              },
            },
          }
        );

        if (!replyComments || !replyComments.replies[0]) {
          res.status(404).json({
            message: "Reply not found",
          });
          return;
        }

        const index = replyComments?.replies[0]?.likes.findIndex(
          (index) => index === String(userId)
        );

        if (index === -1) {
          replyComments.replies[0].likes =
            replyComments.replies[0]?.likes.filter(
              (index) => index !== String(userId)
            );
        }

        const reply = replyComments.replies[0];
        const updateReply = await toggleLikeComment(reply, userId);
        const query = { _id: id, "replies.id": replyId };
        const saveReply = await Comments.updateOne(query, updateReply);

        res.status(201).json({
          message: "Reply is Liked",
          data: saveReply,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = {
  postController,
};
