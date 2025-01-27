const express = require("express");
const router = express.Router();
const lambdaController = require("../controllers/metricsController");

// Define routes
router.get("/lambda/metrics", lambdaController.getLambdaMetrics);

module.exports = router;
