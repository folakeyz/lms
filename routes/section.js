const express = require("express");
const {
  createSection,
  getSections,
  getCourseSection,
} = require("../controllers/section");
const Section = require("../models/Section");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createSection)
  .get(protect, advancedResults(Section), getSections);
router.route("/:course").get(protect, getCourseSection);

module.exports = router;
