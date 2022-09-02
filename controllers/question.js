const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Test = require("../models/Test");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getTest = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
