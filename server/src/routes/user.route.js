const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  emailController,
  passwordController,
  userController,
  friendController,
} = require("../controllers/user.controller");

//verify email
router.get("/verify/:userId/:token", emailController.verifyEmail);
router.get("/verified", emailController.verifiedEmail);

//reset password
router.post("/send-request", passwordController.sendRequest);
router.get(
  "/reset-password/:userId/:token",
  passwordController.handleResetPasswordLink
);
router.post("/change-password", passwordController.changePassword);
router.get("/new-password-form", passwordController.resetForm);

//user request
router.post("/get-user/:id?", authMiddleware, userController.getUserById);
router.put("/update-user", authMiddleware, userController.updateUser);
router.post("/profile-view", authMiddleware, userController.viewProfile);

//friend request
router.post(
  "/friend-request",
  authMiddleware,
  friendController.sendFriendRequest
);
router.post(
  "/get-friend-request",
  authMiddleware,
  friendController.getFriendRequest
);
router.post("/accept-request", authMiddleware, friendController.acceptRequest);
router.post(
  "/suggested-friend",
  authMiddleware,
  friendController.suggestFriend
);

module.exports = router;
