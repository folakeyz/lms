const express = require("express");
const { createQuestion, getQuestions } = require("../controllers/question");
const Question = require("../models/Question");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createQuestion)
  .get(
    protect,
    advancedResults(Question, { path: "category", select: "name" }),
    getQuestions
  );

module.exports = router;
