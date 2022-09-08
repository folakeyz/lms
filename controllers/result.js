const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Test = require("../models/OldTest");
const Result = require("../models/Result");
const Overview = require("../models/Overview");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createResult = asyncHandler(async (req, res, next) => {
  const exist = await Result.findOne({
    user: req.user.id,
    course: req.body.course,
  });
  req.body.user = req.user;
  const test = await Test.findById(req.body.question);

  let score;
  if (test.correctAnswer === req.body.answer) {
    score = 1;
  } else {
    score = 0;
  }
  if (exist) {
    const question = exist.question;
    const update = [
      {
        score: score,
        question: req.body.question,
        answer: req.body.answer,
      },
    ];
    question.push(...update);
    await Result.findByIdAndUpdate(
      exist._id,
      {
        question: question,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
    });
  } else {
    const question = [];

    const update = [
      {
        question: req.body.question,
        score: score,
        answer: req.body.answer,
      },
    ];
    question.push(...update);
    req.body.question = question;
    await Result.create(req.body);
    res.status(201).json({
      success: true,
    });
  }
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getResults = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get ALl Courses
// @route   POST/api/v1/employee
// @access   Private/Admin
exports.getMyResult = asyncHandler(async (req, res, next) => {
  const section = await Result.findOne({
    user: req.user.id,
    course: req.params.course,
  });
  const total = section.question.reduce((a, c) => a + c.score, 0);
  const cal = section.question.length / 100;
  const percentage = total / cal;

  let status = "";

  if (percentage >= 50) {
    status = "Pass";
  } else {
    status = "Fail";
  }
  const user = req.user.id;
  const course = req.params.course;
  const score = percentage;
  await Overview.create({
    user: user,
    course: course,
    score: Matn.round(score),
    status: status,
  });
  res.status(200).json({
    success: true,
    data: section,
    percentage,
  });
});
