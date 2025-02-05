const express = require("express");
const router = express.Router();
const TotalMetrics = require("../controllers/metricsController");
const LambdaFunctionsList = require("../controllers/getLambdaFunctions")
const lambdaFunctionMetrics = require("../controllers/getLambdaMetrics");
const LambdaCloudLogs = require("../controllers/cloudlogController")



// Total metrics
router.get("/lambda/total-metrics", TotalMetrics.getTotalMetrics);

//List of total Lambda functions
router.get("/lambda/total-functions", LambdaFunctionsList.getLambdaFunctions);

//Metrics on specific functions
router.get("/lambda/functions/:functionName/metrics", lambdaFunctionMetrics.getLambdaMetrics)

// Error logs (cloudlogs)
router.get("/lambda/cloudlogs", LambdaCloudLogs.getAllLambdaErrorLogs);

module.exports = router;
