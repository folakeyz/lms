const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Category = require("../models/Category");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const upload = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getCategory = asyncHandler(async (req, res, next) => {
  const section = await Categoory.findById(req.params.category);
  res.status(200).json({
    success: true,
    data: section,
  });
});
