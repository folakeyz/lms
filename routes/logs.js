const express = require("express");
const { getLogs } = require("../controllers/logs");
const Log = require("../models/Logs");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(
    protect,
    advancedResults(Log, { path: "user", select: "firstname" }),
    getLogs
  );

module.exports = router;
