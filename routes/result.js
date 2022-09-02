const express = require("express");
const {
  createResult,
  getResults,
  getMyResult,
} = require("../controllers/result");
const Result = require("../models/Result");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createResult)
  .get(protect, advancedResults(Result), getResults);
router.route("/me/:course").get(protect, getMyResult);

module.exports = router;
