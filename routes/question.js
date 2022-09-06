const express = require("express");
const { getTest } = require("../controllers/question");
const Test = require("../models/OldTest");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(
  protect,
  advancedResults(Test, {
    path: "course",
    select: "name",
  }),
  getTest
);

module.exports = router;
