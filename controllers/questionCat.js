const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const QuestionCategory = require("../models/QuestionCat");
const Log = require("../models/Logs");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createQCategory = asyncHandler(async (req, res, next) => {
  const upload = await QuestionCategory.create(req.body);
  await Log.create({
    user: req.user.id,
    activity: "Created Question Category",
  });
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
  await Log.create({
    user: req.user.id,
    activity: "Updated Question Category",
  });
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
  await Log.create({
    user: req.user.id,
    activity: "Deleted Question Category",
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});
