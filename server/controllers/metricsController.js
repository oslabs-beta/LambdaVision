const AWS = require("aws-sdk");
require('dotenv').config();

//Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

//Create instances of cloudwatch and lambda
const lambda = new AWS.Lambda();
const cloudwatch = new AWS.CloudWatch();



//Function to fetch metrics from Cloudwatch 
async function fetchMetric(functionName, metricName, statistic) {
    const params = {
        StartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        EndTime: new Date(),
        MetricName: metricName,
        Namespace: "AWS/Lambda",
        Period: 3600, // 1 hour intervals
        Statistics: [statistic],
        Dimensions: [{ Name: "FunctionName", Value: functionName }],
    };

    const data = await cloudwatch.getMetricStatistics(params).promise();
    const values = data.Datapoints.map((dp) => dp[statistic] || 0);
    return values.reduce((sum, value) => sum + value, 0); // Aggregate metric values
}

// Controller to fetch Lambda metrics
exports.getLambdaMetrics = async (req, res) => {
    try {
      // Step 1: Fetch all Lambda functions
      const functionsData = await lambda.listFunctions().promise();
      const functionNames = functionsData.Functions.map((fn) => fn.FunctionName);
  
      let totalInvocations = 0;
      let totalErrors = 0;
      let totalDuration = 0;
  
      // Step 2: Fetch metrics for each function
      for (const functionName of functionNames) {
        const invocations = await fetchMetric(functionName, "Invocations", "Sum");
        const errors = await fetchMetric(functionName, "Errors", "Sum");
        const duration = await fetchMetric(functionName, "Duration", "Average");
  
        totalInvocations += invocations;
        totalErrors += errors;
        totalDuration += duration;
      }
  
      // Step 3: Calculate error rate (if invocations > 0)
      const errorRate = totalInvocations > 0 ? (totalErrors / totalInvocations) * 100 : 0;
  
      // Step 4: Respond with metrics
      res.json({
        totalFunctions: functionNames.length,
        totalInvocations,
        totalErrors,
        errorRate: errorRate.toFixed(2) + "%",
        averageDuration: (totalDuration / functionNames.length).toFixed(2) + " ms",
      });
    } catch (err) {
      console.error("Error fetching Lambda metrics:", err);
      res.status(500).json({ error: "Failed to fetch Lambda metrics" });
    }
  };
