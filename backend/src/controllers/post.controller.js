const Post = require("../models/post.model");
const Users = require("../models/user.model");
const Comments = require("../models/comment.model");

const postRequest = {
  createPost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { title, description, image } = req.body;
      if (!title || !description) {
        next("Please provide title and description");
        return;
      }

      const post = await Post.create({
        userId,
        title,
        description,
        image,
      });

      res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  getPost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { search } = req.body;

      const user = await Users.findById(userId);
      const friends = user?.friends?.toString().split("") ?? [];
      friends.push(userId);

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

      const posts = await Post.find(search ? searchPostQuery : {})
        .populate({
          path: "userId",
          select: "firstName lastName location avatar -password",
        })
        .sort({
          _id: -1,
        });

      const friendsPosts = posts?.filter((post) => {
        return friends.includes(post?.userId?._id.toString());
      });

      const otherPosts = posts.filter((post) => {
        return !friends.includes(post?.userId?._id.toString());
      });

      let postResponse = null;

      if (friendsPosts?.length > 0) {
        postResponse = search ? friendsPosts : [...friendsPosts, ...otherPosts];
      } else {
        postResponse = posts;
      }

      res.status(200).json({
        success: true,
        message: "Success",
        data: postResponse,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  getDetailPost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate({
        path: "userId",
        select: "firstName lastName location avatar -password",
      });

      res.status(200).json({
        success: true,
        message: "success",
        data: post,
      });
    } catch (err) {
      console.log(err);
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
        success: true,
        message: "Delete Success",
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },
};

const commentRequest = {
  getComments: async (req, res, next) => {
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
    } catch (err) {
      console.log(err);
    }
  },

  writeComment: async (req, res, next) => {
    try {
      const { comment, from } = req.body;
      const { userId } = req.body.user;
      const { id } = req.params;

      if (comment === null) {
        res.status(404).json({ message: "Comment is required" });
        return;
      }

      const newComment = new Comments({ comment, from, userId, postId: id });
      await newComment.save();

      const post = await Post.findById(id);
      post.comments.push(newComment._id);

      await Post.findByIdAndUpdate(id, post, {
        new: true,
      });

      res.status(201).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  replyComment: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { comment, replyAt, from } = req.body;
      const { id } = req.params;

      if (comment === null) {
        res.status(404).json({ message: "Comment is required" });
        return;
      }

      const commentContent = await Comments.findById(id);
      commentContent.replies.push({
        comment,
        replyAt,
        from,
        userId,
        createdAt: Date.now(),
      });
      commentContent.save();

      res.status(200).json(commentContent);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  },
};

const likeRequest = {
  likePost: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id } = req.params;

      const post = await Post.findById(id);
      const index = post.likes.findIndex((postId) => postId === String(userId));

      if (index === -1) {
        post.likes.push(userId);
      } else {
        post.likes = post.likes.filter((postId) => postId !== String(userId));
      }

      const updatePost = await Post.findByIdAndUpdate(id, post, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "success",
        data: updatePost,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  likeComment: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id, replyId } = req.params;

      if (replyId === undefined || replyId === null || replyId === "false") {
        const comment = await Comments.findById(id);
        const index = comment.likes.findIndex(
          (element) => element === String(userId)
        );

        if (index === -1) {
          comment.likes.push(userId);
        } else {
          comment.likes = comment.likes.filter(
            (index) => index !== String(userId)
          );
        }

        const updated = await Comments.findByIdAndUpdate(id, comment, {
          new: true,
        });

        res.status(201).json(updated);
      } else {
        const replyComments = await Comments.findOne(
          {
            _id: id,
          },
          {
            replies: {
              $elemMatch: {
                _id: replyId,
              },
            },
          }
        );

        const index = replyComments?.replies[0]?.likes.findIndex(
          (index) => index === String(userId)
        );

        if (index === -1) {
          replyComments.replies[0].likes =
            replyComments.replies[0]?.likes.filter(
              (index) => index !== String(userId)
            );
        } else {
          replyComments.replies[0].likes =
            replyComments.replies[0]?.likes.filter(
              (index) => index !== String(userId)
            );
        }

        const query = { _id: id, "replies.id": replyId };
        const result = await Comments.updateOne(query, updated, { new: true });

        res.status(201).json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },
};

module.exports = {
  postRequest,
  commentRequest,
  likeRequest,
};
