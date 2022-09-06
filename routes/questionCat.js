const express = require("express");
const {
  createQCategory,
  getQCategories,
  getQCategory,
  updateQCategory,
  deleteQCategory,
} = require("../controllers/questionCat");
const QuestionCategory = require("../models/QuestionCat");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createQCategory)
  .get(protect, advancedResults(QuestionCategory), getQCategories);
router
  .route("/:id")
  .get(protect, getQCategory)
  .put(protect, updateQCategory)
  .delete(protect, deleteQCategory);

module.exports = router;
