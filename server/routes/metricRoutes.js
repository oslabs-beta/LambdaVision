const express = require("express");
const router = express.Router();
const lambdaController = require("../controllers/metricsController");
const {
  listLogGroups,
  listLogStreams,
  getLogEvents,
  filterLogEvents,
} = require("../controllers/cloudlogController");

// Define routes
router.get("/lambda/metrics", lambdaController.getLambdaMetrics);
router.get("/lambda/log-groups", listLogGroups);
router.get("/lambda/log-streams", listLogStreams);
router.get("/lambda/log-events", getLogEvents);
router.get("/lambda/filter-log-events", filterLogEvents);

module.exports = router;
