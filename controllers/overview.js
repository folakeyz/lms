const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Overview = require("../models/Overview");

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getOverview = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
