const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authenticateJWT");

const TotalMetrics = require("../controllers/awsControllers/metricsController");
const LambdaFunctionsList = require("../controllers/awsControllers/functionListController");
const lambdaFunctionMetrics = require("../controllers/awsControllers/getLambdaMetrics");
const LambdaCloudLogs = require("../controllers/awsControllers/cloudlogController");
const awsCredentials = require("../controllers/awsControllers/credentialsController");

// Save AWS Credentials (Only for logged-in users)
router.post("/lambda/credentials", authenticateJWT, awsCredentials.awsCredentials);

// Protected routes - Require valid JWT
router.get("/lambda/total-metrics", authenticateJWT, TotalMetrics.getTotalMetrics);
router.get("/lambda/total-functions", authenticateJWT, LambdaFunctionsList.getLambdaFunctions);
router.get("/lambda/functions/:functionName/metrics", authenticateJWT, lambdaFunctionMetrics.getLambdaMetrics);
router.get("/lambda/cloudlogs", authenticateJWT, LambdaCloudLogs.getAllLambdaErrorLogs);

module.exports = router;





