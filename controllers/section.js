const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Section = require("../models/Section");
const Course = require("../models/Course");

// @desc    Create User
// @route   POST/api/v1/User/
// @access   Private/Admin
exports.createSection = asyncHandler(async (req, res, next) => {
  req.body.course = req.body.id;
  const upload = await Section.create(req.body);
  const exist = await Course.findById(req.body.course);

  let section = exist.section;
  const update = [upload._id];
  section.push(...update);
  await Course.findByIdAndUpdate(
    req.body.course,
    {
      section: section,
    },
    {
      new: true,
      runValidators: true,
    }
  );
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
