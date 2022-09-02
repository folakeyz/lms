const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Section = require("../models/Section");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createSection = asyncHandler(async (req, res, next) => {
  const upload = await Section.create(req.body);
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
  const section = await Section.find({ course: req.params.course });
  res.status(200).json({
    success: true,
    data: section,
  });
});
