const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Section = require("../models/Section");
const Course = require("../models/Course");
const Video = require("../models/Video");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createSection = asyncHandler(async (req, res, next) => {
  req.body.course = req.body.id;
  const upload = await Section.create(req.body);
  const exist = await Course.findById(req.body.course);

  let section = exist.section;
  const update = [upload._id];
  section.push(...update);
  await Course.findByIdAndUpdate(
    req.body.course,
    {
      section: section,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getSections = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getCourseSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: section,
  });
});

exports.addCourseSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.section);
  const admin = req.user;
  const video = req.files.video;
  //Make sure the image is a photo
  if (!video.mimetype.startsWith("video")) {
    return next(new ErrorResponse(`Please Upload a Video`, 400));
  }

  // Check filesize
  if (video.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  //crete custom filename
  video.name = `Video_${admin._id}_${path.parse(video.name).ext}`;
  video.mv(`${process.env.FILE_UPLOAD_PATH}/${video.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
  });

  req.body.video = video.name;
  const upload = await Video.create(req.body);

  let sec = section.video;
  console.log(sec);
  const update = [upload._id];
  sec.push(...update);
  await Section.findByIdAndUpdate(
    req.params.section,
    {
      video: sec,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: upload,
  });
});
