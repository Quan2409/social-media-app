const express = require("express");
const router = express.Router();
const {
  verifyEmail,
  getUser,
  updateUser,
  friendRequest,
} = require("../controllers/user.controller");
const userAuth = require("../middlewares/auth.middleware");

router.get("/verify/:userId/:token", verifyEmail);
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

//friend-request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);
router.post("/accept-request", userAuth, acceptRequest);

module.exports = router;
