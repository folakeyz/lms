const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const axios = require("axios");

exports.userRegistration = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return next(new ErrorResponse(`No access token provided`, 400));
  }
  const config = {
    method: "get",
    url: "https://graph.microsoft.com/v1.0/me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios(config); //get user data from active directory
  const checkEmail = data.mail.split("@"); //split the email address
  if (
    checkEmail[1] !== "lotusbetaanalytics.com" ||
    !checkEmail.includes("lotusbetaanalytics.com")
  ) {
    return next(new ErrorResponse(`Invalid email`, 400));
  }
  let { mail, displayName } = data;
  mail = mail.toLowerCase();
  const checkStaff = await User.findOne({ email: mail });
  if (!checkStaff) {
    const staff = await User.create({
      email: mail,
      firstname: displayName,
      lastname: displayName,
    });
    sendTokenResponse(staff, 200, res);
  }

  sendTokenResponse(checkStaff, 200, res);
  //   if (!checkStaff.fullname) {
  //     checkStaff.fullname = displayName;
  //     await checkStaff.save();

  //   } else {

  //     res.status(201).json({
  //       success: true,
  //       data: staff,
  //     });
  //   }
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc    Get ALl User
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
