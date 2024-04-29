const Users = require("../models/user.model.js");
const Verification = require("../models/emailVerification.model");
const FriendRequest = require("../models/friendRequest.js");
const yup = require("yup");
const { compareToken, createJWT } = require("../utils/handleToken.js");

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

    //check token is expired or not
    if (expireAt < Date.now()) {
      await Verification.findOneAndDelete({ userId });
      await Users.findOneAndDelete({ _id: userId });
      const message = "Verification Token has expired";
      res.redirect(`/user/verify?status=error&message=${message}`);
    }

    //if token valid => compare => verify
    const isMatch = await compareToken(token, hashToken);
    if (isMatch) {
      await Users.findOneAndUpdate({ _id: userId }, { verified: true });
      await Verification.findOneAndUpdate({ userId });
      const message = "Email Verified Success";
      // res.redirect(`/user/verified?status=success&message=${message}`);
      return res.send(message);
    } else {
      const message = "Verification failed or link is invalid";
      // res.redirect(`/user/verified?status=error&message=${message}`);
      return res.send(message);
    }
  } catch (err) {
    const message = "An error occurred during email verification";
    // return res.redirect(`/user/verified?status=error&message=${message}`);
    return res.send(message);
  }
};

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
  getUser,
  updateUser,
  friendRequest,
  getFriendRequest,
};
