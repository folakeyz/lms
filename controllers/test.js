const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ETest = require("../models/ETest");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createTest = asyncHandler(async (req, res, next) => {
  const upload = await ETest.create(req.body);
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
  const section = await ETest.find({ course: req.params.course }).populate({
    path: "section",
    select: "name instruction",
  });
  res.status(200).json({
    success: true,
    data: section,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getTest = asyncHandler(async (req, res, next) => {
  const section = await ETest.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: section,
  });
});
