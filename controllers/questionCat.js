const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const QuestionCategory = require("../models/QuestionCat");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createQCategory = asyncHandler(async (req, res, next) => {
  const upload = await QuestionCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getQCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getQCategory = asyncHandler(async (req, res, next) => {
  const section = await QuestionCategoory.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: section,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.updateQCategory = asyncHandler(async (req, res, next) => {
  const section = await QuestionCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: section,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.deleteQCategory = asyncHandler(async (req, res, next) => {
  const section = await QuestionCategory.findById(req.params.id);
  section.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
