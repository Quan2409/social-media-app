const express = require("express");
const router = express.Router();
const authRouter = require("../routes/auth.routes.js");
const userRouter = require("../routes/user.routes.js");
const postRouter = require("../routes/post.routes.js");

//url: auth/register
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
