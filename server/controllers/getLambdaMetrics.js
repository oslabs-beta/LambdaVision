const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const cloudwatch = new AWS.CloudWatch();

exports.getLambdaMetrics = async (req, res) => {
    const functionName = req.params.functionName;

    // Set time range for the last 15 minutes
    const startTime = new Date(Date.now() - 15 * 60 * 1000);
    const endTime = new Date();

    // Define metric queries
    const metrics = ["Invocations", "Errors", "Throttles", "Duration"];

    // Prepare CloudWatch requests
    const metricRequests = metrics.map(metric => ({
        Namespace: "AWS/Lambda",
        MetricName: metric,
        Dimensions: [{ Name: "FunctionName", Value: functionName }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 60,
        Statistics: metric === "Duration" ? ["Average"] : ["Sum"]
    }));

    try {
        // Fetch all metrics asynchronously using Promise.all()
        const responses = await Promise.all(
            metricRequests.map(request => cloudwatch.getMetricStatistics(request).promise())
        );

        // Extract values from responses
        const metricsData = {};
        responses.forEach((response, index) => {
            const metricName = metrics[index];
            metricsData[metricName] = response.Datapoints.length > 0 
                ? response.Datapoints[0].Sum || response.Datapoints[0].Average 
                : 0; // Default to 0 if no data is available
        });

        // Calculate Cold Start Duration (if applicable)
        const coldStartDuration = metricsData["Duration"] || 0;

        // Return JSON response
        return res.json({
            functionName,
            metrics: {
                Invocations: metricsData["Invocations"] || 0,
                Errors: metricsData["Errors"] || 0,
                Throttles: metricsData["Throttles"] || 0,
                ColdStartDuration: coldStartDuration
            }
        });

    } catch (error) {
        console.error("Error fetching Lambda metrics:", error);
        return res.status(500).json({ error: "Failed to fetch Lambda metrics" });
    }
};
