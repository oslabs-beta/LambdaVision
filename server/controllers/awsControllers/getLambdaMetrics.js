const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const User = require("../../models/User");

exports.getLambdaMetrics = async (req, res) => {
    const functionName = req.params.functionName;
    const userId = req.user.id;

    //  Find user in the database by userId
    const user = await User.findById(userId);
    if (!user || !user.awsCredential) {
        return res.status(403).json({ error: "AWS credentials not found for user" });
    }

    //  Extract AWS credentials from the database
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = user.awsCredential;

    // Initialize CloudWatchClient with credentials
    const client = new CloudWatchClient({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
    });

    // Set time range for the last 15 minutes
    const startTime = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago
    const endTime = new Date();

    //  Define metric queries for various Lambda metrics
    const metrics = ["Invocations", "Errors", "Throttles", "Duration"];

    const metricRequests = metrics.map(metric => ({
        Namespace: "AWS/Lambda",
        MetricName: metric,
        Dimensions: [{ Name: "FunctionName", Value: functionName }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 60, // 1-minute intervals
        Statistics: metric === "Duration" ? ["Average"] : ["Sum"]
    }));

    try {
        //  Fetch all metrics asynchronously using Promise.all
        const responses = await Promise.all(
            metricRequests.map(request => client.send(new GetMetricStatisticsCommand(request)))
        );

        //  Extract values from the responses
        const metricsData = {};
        responses.forEach((response, index) => {
            const metricName = metrics[index];
            const dataPoint = response.Datapoints.length > 0 ? response.Datapoints[0] : null;
            if (dataPoint) {
                // Handle Sum for non-duration metrics and Average for Duration
                metricsData[metricName] = metricName === "Duration"
                    ? dataPoint.Average || 0
                    : dataPoint.Sum || 0;
            } else {
                metricsData[metricName] = 0; // Default to 0 if no data is available
            }
        });

        //  Calculate Cold Start Duration (if applicable)
        const coldStartDuration = metricsData["Duration"] || 0;

        //  Return metrics as JSON response
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
