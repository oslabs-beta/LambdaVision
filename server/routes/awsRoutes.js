const express = require("express");
const router = express.Router();
const TotalMetrics = require("../controllers/awsControllers/metricsController");
const LambdaFunctionsList = require("../controllers/awsControllers/functionListController");
const lambdaFunctionMetrics = require("../controllers/awsControllers/getLambdaMetrics");
const LambdaCloudLogs = require("../controllers/awsControllers/cloudlogController");
const awsCredentials = require("../controllers/awsControllers/credentialsController");

// Route to add AWS credential information
router.post("/lambda/credentials", awsCredentials.awsCredentials)

// Total metrics
router.get("/lambda/total-metrics",awsCredentials.awsCredentials, TotalMetrics.getTotalMetrics);

//List of total Lambda functions
router.get("/lambda/total-functions",awsCredentials.awsCredentials, LambdaFunctionsList.getLambdaFunctions);

//Metrics on specific functions
router.get("/lambda/functions/:functionName/metrics",awsCredentials.awsCredentials, lambdaFunctionMetrics.getLambdaMetrics)

// Error logs (cloudlogs)
router.get("/lambda/cloudlogs",awsCredentials.awsCredentials, LambdaCloudLogs.getAllLambdaErrorLogs);





module.exports = router;