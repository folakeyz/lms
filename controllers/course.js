const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createCourse = asyncHandler(async (req, res, next) => {
  const admin = req.user;

  const file = req.files.video;
  //Make sure the image is a photo
  if (!file.mimetype.startsWith("video")) {
    return next(new ErrorResponse(`Please Upload a Video`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  //crete custom filename
  file.name = `Video_${admin._id}_${file.name}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
  });

  const thumb = req.files.thumbnail;
  //Make sure the image is a photo
  if (!thumb.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please Upload an Image`, 400));
  }

  // Check filesize
  if (thumb.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  //crete custom filename
  thumb.name = `Photo_${admin._id}_${thumb.name}${path.parse(thumb.name).ext}`;
  thumb.mv(`${process.env.FILE_UPLOAD_PATH}/${thumb.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
  });

  req.body.thumbnail = thumb.name;
  req.body.video = file.name;
  const upload = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getCourses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getSingleCourse = asyncHandler(async (req, res, next) => {
  const section = await Course.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: section,
  });
});
