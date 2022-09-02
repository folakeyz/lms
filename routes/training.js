const express = require("express");
const { createTraining, getTrainings } = require("../controllers/training");
const Training = require("../models/Training");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(createTraining)
  .get(advancedResults(Training), getTrainings);

module.exports = router;
