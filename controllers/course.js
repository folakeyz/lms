const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Section = require("../models/Section");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createCourse = asyncHandler(async (req, res, next) => {
  const admin = req.user;
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
  const section = await Course.findOne({ _id: req.params.id }).populate([
    {
      path: "category",
      select: "name description",
    },
    {
      path: "section",
      select: "name description video",
    },
    {
      path: "video",
      select: "name description video",
    },
  ]);
  const videos = await Section.find({ course: req.params.id }).populate([
    {
      path: "section",
      select: "name description video",
    },
    {
      path: "video",
      select: "name description video",
    },
  ]);

  res.status(200).json({
    success: true,
    data: section,
    videos,
  });
});
