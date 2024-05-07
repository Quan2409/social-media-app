const express = require("express");
const router = express.Router();
const {
  emailRequest,
  resetPasswordRequest,
  userRequest,
  friendRequest,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//verify email
router.get("/verify/:userId/:token", emailRequest.verifyEmail);
router.get("/verified", emailRequest.verifiedEmail);

//reset password
router.post("/request-to-reset", resetPasswordRequest.sendRequest);
router.get(
  "/reset-password/:userId/:token",
  resetPasswordRequest.handleResetPasswordLink
);
router.post("/change-password", resetPasswordRequest.changePassword);
router.get("/new-password-form", resetPasswordRequest.resetForm);

//user request
router.post("/get-user/:id?", authMiddleware, userRequest.getUserById);
router.put("/update-user", authMiddleware, userRequest.updateUser);
router.post("/profile-view", authMiddleware, userRequest.profileViews);
router.post("/suggested-friend", authMiddleware, userRequest.suggestFriend);

//friend request
router.post("/friend-request", authMiddleware, friendRequest.sendFriendRequest);
router.post(
  "/get-friend-request",
  authMiddleware,
  friendRequest.getFriendRequest
);
router.post("/accept-request", authMiddleware, friendRequest.acceptRequest);

module.exports = router;
