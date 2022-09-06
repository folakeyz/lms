const express = require("express");
const {
  createTest,
  getTests,
  getCourseTest,
  getTest,
} = require("../controllers/test");
const ETest = require("../models/ETest");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createTest)
  .get(protect, advancedResults(ETest), getTests);
router.route("/:id").get(protect, getTest);

module.exports = router;
