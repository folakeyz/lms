const express = require("express");
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../controllers/category");
const Category = require("../models/Category");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createCategory)
  .get(protect, advancedResults(Category), getCategories);
router.route("/:category").get(protect, getCategory);

module.exports = router;
