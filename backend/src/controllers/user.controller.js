const Users = require("../models/user.model.js");
const Verification = require("../models/emailVerification.model");
const FriendRequest = require("../models/friendRequest.js");
const ResetPassword = require("../models/resetPassword.model.js");
const yup = require("yup");
const path = require("path");
const { compareToken, createJWT } = require("../utils/handleToken.js");
const {
  hashPassword,
  resetPasswordLink,
} = require("../utils/handlePassword.js");

//validation
const userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  location: yup.string().required("Location is Required"),
  professional: yup.string().required("Professional is Required"),
});

//verify email
const verifyEmail = async (req, res) => {
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
};

const verifiedEmail = (req, res) => {
  const filePath = path.join(__dirname, "..", "views/build", "verified.html");
  res.sendFile(filePath);
};

//reset password
const requestToReset = async (req, res) => {
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
};

const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  try {
    const userRecord = await Users.findById(userId);
    if (!userRecord) {
      const message = "Invalid reset password link";
      res.redirect(`/users/new-password-form?&status=error&message=${message}`);
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
};

const newPasswordForm = (req, res) => {
  const filePath = path.join(__dirname, "..", "views/build", "reset.html");
  res.sendFile(filePath);
};

const changePassword = async (req, res) => {
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
};

//user
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body.user;

    const user = await Users.findById(id ?? userId).populate({
      path: "friends",
      select: "-password",
    });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Auth Error",
      success: false,
      error: err.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      location,
      avatar,
      profession,
      user: { userId },
    } = req.body;

    //check validate
    await userSchema.validate(req.body);

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
    }).populate({ path: "friend", select: "-password" });

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
};

const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { requestTo } = req.body;

    const requestExit = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    if (requestExit) {
      next("Friend Request already sent");
    }

    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (accountExist) {
      next("Friend Request Already Sent");
      return;
    }

    await FriendRequest.create({
      requestTo,
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
};

const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const request = await FriendRequest.find({
      requestTo: userId,
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Auth Failed",
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
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
};
