const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Test = require("../models/OldTest");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createTest = asyncHandler(async (req, res, next) => {
  const upload = await Test.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getTests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getCourseTest = asyncHandler(async (req, res, next) => {
  const section = await Test.find({ course: req.params.course }).populate({
    path: "section",
    select: "name instruction",
  });
  res.status(200).json({
    success: true,
    data: section,
  });
});
