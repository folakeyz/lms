const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Training = require("../models/Training");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createTraining = asyncHandler(async (req, res, next) => {
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
  file.name = `Video_${file.name}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
  });

  req.body.video = file.name;
  const upload = await Training.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getTrainings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
