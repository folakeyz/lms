const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.createQuestion = asyncHandler(async (req, res, next) => {
  const upload = await Question.create(req.body);
  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
