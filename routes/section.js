const express = require("express");
const {
  createSection,
  getSections,
  getCourseSection,
  addCourseSection,
} = require("../controllers/section");
const Section = require("../models/Section");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createSection)
  .get(protect, advancedResults(Section), getSections);
router.route("/:id").get(protect, getCourseSection);
router.route("/course/:section").put(protect, addCourseSection);

module.exports = router;
