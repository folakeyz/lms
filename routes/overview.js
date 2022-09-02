const express = require("express");
const { getOverview } = require("../controllers/overview");
const Overview = require("../models/Overview");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(
  protect,
  advancedResults(Overview, {
    path: "user",
    select: "firstname lastname",
  }),
  getOverview
);

module.exports = router;
