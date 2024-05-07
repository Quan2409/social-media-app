const Users = require("../models/user.model.js");
const Verification = require("../models/emailVerification.model");
const FriendRequest = require("../models/friendRequest.js");
const ResetPassword = require("../models/resetPassword.model.js");
const path = require("path");
const { compareToken, createJWT } = require("../utils/handleToken.js");
const {
  hashPassword,
  resetPasswordLink,
} = require("../utils/handlePassword.js");

//verify email
const emailRequest = {
  verifyEmail: async (req, res) => {
    //get userId and token from url
    const { userId, token } = req.params;

    try {
      const verificationRecord = await Verification.findOne({ userId });

      if (!verificationRecord) {
        const message = "No verification record found";
        return res.redirect(`/user/verify?status=error&message=${message}`);
      }

      const { expireAt, token: hashToken } = verificationRecord;

      if (expireAt < Date.now()) {
        await Verification.findOneAndDelete({ userId });
        await Users.findOneAndDelete({ _id: userId });
        const message = "Verification Token has expired";
        res.redirect(`/user/verify?status=error&message=${message}`);
      }

      const isMatch = await compareToken(token, hashToken);
      if (isMatch) {
        await Users.findOneAndUpdate({ _id: userId }, { verified: true });
        await Verification.findOneAndUpdate({ userId });
        const message = "Email Verified Success";
        res.redirect(`/user/verified?status=success&message=${message}`);
      } else {
        const message = "Verification failed or link is invalid";
        res.redirect(`/user/verified?status=error&message=${message}`);
      }
    } catch (err) {
      const message = "An error occurred during email verification";
      return res.redirect(`/user/verified?status=error&message=${message}`);
    }
  },

  verifiedEmail: (req, res) => {
    const filePath = path.join(__dirname, "..", "views/build", "verified.html");
    res.sendFile(filePath);
  },
};

//reset password
const resetPasswordRequest = {
  sendRequest: async (req, res) => {
    try {
      const { email } = req.body;
      const userRecord = await Users.findOne({ email });
      if (!userRecord) {
        return res.status(404).json({
          status: "Failed",
          message: "Email address not found",
        });
      } else {
        await resetPasswordLink(userRecord, res);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },

  handleResetPasswordLink: async (req, res) => {
    const { userId, token } = req.params;
    try {
      const userRecord = await Users.findById(userId);
      if (!userRecord) {
        const message = "Invalid reset password link";
        res.redirect(
          `/users/new-password-form?&status=error&message=${message}`
        );
      }

      const resetPasswordRecord = await ResetPassword.findOne({ userId });
      if (!resetPasswordRecord) {
        const message = "invalid reset password link";
        res.redirect(`/user/new-password-form?status=error&message=${message}`);
      }

      const { expiresAt, token: resetToken } = resetPasswordRecord;
      if (expiresAt < Date.now()) {
        const message = "Reset password Link has expired";
        res.redirect(`/user/new-password-form?status=error&message=${message}`);
      }

      const isMatch = await compareToken(token, resetToken);
      if (isMatch) {
        res.redirect(`/user/new-password-form?type=reset&id=${userId}`);
      } else {
        const message = "Invalid reset password link";
        res.redirect(`/user/new-password-form?status=error&message=${message}`);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  },

  resetForm: (req, res) => {
    const filePath = path.join(__dirname, "..", "views/build", "reset.html");
    res.sendFile(filePath);
  },

  changePassword: async (req, res) => {
    try {
      const { userId, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const user = await Users.findByIdAndUpdate(
        { _id: userId },
        { password: hashedPassword }
      );
      if (user) {
        await ResetPassword.findOneAndDelete({ userId });
        res.status(200).json({
          ok: true,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  },
};

// user request
const userRequest = {
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body.user;

      const userRecord = await Users.findById(id ?? userId).populate({
        path: "friends",
        select: "-password",
      });
      if (!userRecord) {
        return res.status(200).send({
          message: "User Not Found",
          success: false,
        });
      }
      userRecord.password = undefined;
      res.status(200).json({
        success: true,
        user: userRecord,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Auth Error",
        success: false,
        error: err.message,
      });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        location,
        avatar,
        profession,
        user: { userId },
      } = req.body;

      if (!(firstName || lastName || location || profession)) {
        next("Please provide all required fields");
        return;
      }

      const updateUser = {
        firstName,
        lastName,
        location,
        avatar,
        profession,
        _id: userId,
      };

      const user = await Users.findByIdAndUpdate(userId, updateUser, {
        new: true,
      }).populate({ path: "friends", select: "-password" });

      const token = createJWT(user?._id);
      user.password = undefined;
      res.status(200).json({
        success: true,
        message: "User Updated Success",
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  },

  profileViews: async (req, res, next) => {
    try {
      const { userId } = req.body.user;
      const { id } = req.body;

      const userRecord = await Users.findById(id);
      userRecord.views.push(userId);
      await userRecord.save();
      res.status(201).json({
        success: true,
        message: "Success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "auth error",
        success: false,
        error: err.message,
      });
    }
  },

  suggestFriend: async (req, res, next) => {
    try {
      const { userId } = req.body.user;

      const queryObject = {
        _id: { $ne: userId },
        friends: { $nin: userId },
      };

      const suggestFriends = await Users.find(queryObject)
        .limit(15)
        .select("firstName lastName avatar profession -password");

      res.status(200).json({
        success: true,
        data: suggestFriends,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },
};

//friend request
const friendRequest = {
  sendFriendRequest: async (req, res, next) => {
    try {
      const { userId } = req.body.user; //sender
      const { receiver } = req.body; //receiver

      const requestExists = await FriendRequest.findOne({
        requestFrom: userId,
        receiver,
      });

      if (requestExists) {
        next("Friend Request already sent");
        return;
      }

      const receiverRequestExists = await FriendRequest.findOne({
        requestFrom: receiver,
        requestTo: userId,
      });

      if (receiverRequestExists) {
        next("Friend Request Already Sent");
        return;
      }

      await FriendRequest.create({
        receiver,
        requestFrom: userId,
      });

      res.status(201).json({
        success: true,
        message: "Friend Request sent success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Auth Failed",
        success: false,
        error: err.message,
      });
    }
  },

  getFriendRequest: async (req, res) => {
    try {
      const { userId } = req.body.user;

      const friendRequests = await FriendRequest.find({
        receiver: userId,
        requestStatus: "Pending",
      })
        .populate({
          path: "requestFrom",
          select: "firstName lastName avatar profession -password",
        })
        .limit(10)
        .sort({
          _id: -1,
        });

      res.status(200).json({
        success: true,
        data: friendRequests,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Auth Failed",
        success: false,
        error: err.message,
      });
    }
  },

  acceptRequest: async (req, res, next) => {
    try {
      const id = req.body.user.userId;
      const { requestId, status } = req.body;
      const requestExist = await FriendRequest.findById(requestId);
      if (!requestExist) {
        next("No Friend Request Found");
        return;
      }

      const newRequest = await FriendRequest.findByIdAndUpdate(
        { _id: requestId },
        { requestStatus: status }
      );

      if (status === "Accepted") {
        const userRecord = await Users.findById(id);
        userRecord.friends.push(newRequest?.requestFrom);
        await userRecord.save();

        const friend = await Users.findById(newRequest?.requestFrom);
        friend.friends.push(newRequest?.receiver);
        await friend.save();
      }
      res.status(201).json({
        success: true,
        message: "Friend Request " + status,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = {
  emailRequest,
  resetPasswordRequest,
  userRequest,
  friendRequest,
};
