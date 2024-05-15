const express = require("express");
const router = express.Router();
const authRouter = require("../routes/auth.route.js");
const userRouter = require("../routes/user.route.js");
const postRouter = require("../routes/post.route.js");

//url: auth/register
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
