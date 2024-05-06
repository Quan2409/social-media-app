const express = require("express");
const router = express.Router();
const {
  verifyEmail,
  verifiedEmail,
  requestToReset,
  resetPassword,
  changePassword,
  newPasswordForm,
  getUser,
  updateUser,
  friendRequest,
  getFriendRequest,
} = require("../controllers/user.controller");
const userAuth = require("../middlewares/auth.middleware");

//verify email
router.get("/verify/:userId/:token", verifyEmail);
router.get("/verified", verifiedEmail);

//reset password
router.post("/request-to-reset", requestToReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/change-password", changePassword);
router.get("/new-password-form", newPasswordForm);

router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

//friend-request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);
// router.post("/accept-request", userAuth, acceptRequest);

module.exports = router;
