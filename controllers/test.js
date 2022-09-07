const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ETest = require("../models/ETest");
const Question = require("../models/Question");
const Grade = require("../models/Grade");
const Overview = require("../models/Overview");

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
  const section = await ETest.findById(req.params.id).populate({
    path: "categories.category",
    select: "name instruction time",
  });
  let questions = [];
  for (let i = 0; i < section?.categories?.length; i++) {
    const qst = await Question.find({
      category: section?.categories[i]?.category,
    }).populate({
      path: "category",
      select: "name",
    });
    qst.sort(() => Math.random() - 0.5);
    const randomQuestions = qst.slice(0, section?.categories[i]?.count);
    questions.push(...randomQuestions);
  }

  res.status(200).json({
    success: true,
    data: questions,
  });
});

exports.gradeUser = asyncHandler(async (req, res, next) => {
  const exist = await Grade.findOne({
    user: req.user.id,
    test: req.body.test,
  });
  req.body.user = req.user;
  const test = await Question.findById(req.body.question);

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
    await Grade.findByIdAndUpdate(
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
    await Grade.create(req.body);
    res.status(201).json({
      success: true,
    });
  }
});

exports.getMyResult = asyncHandler(async (req, res, next) => {
  const assignedTest = await ETest.findById(req.params.id);
  const section = await Grade.findOne({
    user: req.user.id,
    test: req.params.id,
  });

  const total = section.question.reduce((a, c) => a + c.score, 0);
  const cal = section.question.length / 100;
  const percentage = total / cal;
  console.log(total);
  console.log(cal);

  let status = "";

  if (percentage >= assignedTest.passMark) {
    status = "Pass";
  } else {
    status = "Fail";
  }
  const user = req.user.id;
  const course = req.params.id;
  const score = percentage;
  await Overview.create({
    user: user,
    test: course,
    score: score,
    status: status,
  });
  res.status(200).json({
    success: true,
    data: section,
    percentage,
    status,
  });
});
