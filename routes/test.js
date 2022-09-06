const express = require("express");
const { createTest, getTests, getCourseTest } = require("../controllers/test");
const Test = require("../models/OldTest");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createTest)
  .get(protect, advancedResults(Test), getTests);
router.route("/:course").get(protect, getCourseTest);

module.exports = router;
