const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { postController } = require("../controllers/post.controller");

const router = express.Router();

// post
router.get("/", authMiddleware, postController.readAllPost);
router.get("/:id", authMiddleware, postController.readSinglePost);
router.post("/create-post", authMiddleware, postController.createPost);
router.delete("/:id", authMiddleware, postController.deletePost);

//comment
router.get("/comment/:postId", authMiddleware, postController.readAllComments);
router.post("/comment/:id", authMiddleware, postController.writeComment);
router.post("/reply-comment/:id", authMiddleware, postController.replyComment);

// like
router.post("/like/:id", authMiddleware, postController.likePost);
router.post(
  "/like-comment/:id/:replyId?",
  authMiddleware,
  postController.likeComment
);

module.exports = router;
