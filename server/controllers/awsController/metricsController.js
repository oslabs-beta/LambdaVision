const { LambdaClient } = require('@aws-sdk/client-lambda');
const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const User = require("../../models/User");

exports.getTotalMetrics = async (req, res) => {
  try {
    // Get the user ID from request (assuming it's from JWT authentication)
    const userId = req.user.id; 

    // Find user in database by userId
    const user = await User.findById(userId);
    if (!user || !user.awsCredential) {
        return res.status(403).json({ error: "AWS credentials not found for user" });
    }

    // Extract AWS credentials from the database
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = user.awsCredential;

    // Create instances of AWS services using user's credentials
    const lambdaClient = new LambdaClient({
      region: AWS_REGION,
      credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    const cloudWatchClient = new CloudWatchClient({
      region: AWS_REGION,
      credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    // Fetch all Lambda functions for the user
    const functionsData = await lambdaClient.listFunctions({});
    const functionNames = functionsData.Functions.map((fn) => fn.FunctionName);

    let totalInvocations = 0;
    let totalErrors = 0;
    let totalDuration = 0;

    // Function to fetch metrics
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

      const command = new GetMetricStatisticsCommand(params);
      const data = await cloudWatchClient.send(command);
      
      // If data.Datapoints exists and has values, map the relevant statistic value
      const values = data.Datapoints && data.Datapoints.length > 0
        ? data.Datapoints.map((dp) => dp[statistic] || 0)
        : [0];
        
      return values.reduce((sum, value) => sum + value, 0); // Aggregate metric values
    }

    // Fetch metrics for each function
    for (const functionName of functionNames) {
      const invocations = await fetchMetric(functionName, "Invocations", "Sum");
      const errors = await fetchMetric(functionName, "Errors", "Sum");
      const duration = await fetchMetric(functionName, "Duration", "Average");

      totalInvocations += invocations;
      totalErrors += errors;
      totalDuration += duration;
    }

    //  Calculate error rate (if invocations > 0)
    const errorRate = totalInvocations > 0 ? (totalErrors / totalInvocations) * 100 : 0;

    // Respond with metrics
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
