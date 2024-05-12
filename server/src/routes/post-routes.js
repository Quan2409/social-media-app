const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  postRequest,
  commentRequest,
  likeRequest,
} = require("../controllers/post-controller");

const router = express.Router();

// post
router.get("/", authMiddleware, postRequest.getPost);
router.get("/:id", authMiddleware, postRequest.getDetailPost);
router.post("/create-post", authMiddleware, postRequest.createPost);
router.delete("/:id", authMiddleware, postRequest.deletePost);

//comment
router.get("/comment/:postId", authMiddleware, commentRequest.getComments);
router.post("/comment/:id", authMiddleware, commentRequest.writeComment);
router.post("/reply-comment/:id", authMiddleware, commentRequest.replyComment);

// like
router.post("/like/:id", authMiddleware, likeRequest.likePost);
router.post(
  "/like-comment/:id/:replyId?",
  authMiddleware,
  likeRequest.likeComment
);

module.exports = router;
