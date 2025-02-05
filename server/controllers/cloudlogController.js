const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const lambda = new AWS.Lambda();
const cloudwatchlogs = new AWS.CloudWatchLogs();

exports.getAllLambdaErrorLogs = async (req, res) => {
    try {
        // Step 1: Fetch all Lambda functions
        const functionsResponse = await lambda.listFunctions().promise();
        const functionNames = functionsResponse.Functions.map(fn => fn.FunctionName);

        // Step 2: Fetch logs for each function
        let allErrorLogs = [];

        for (const functionName of functionNames) {
            const logGroupName = `/aws/lambda/${functionName}`;

            try {
                // Get the most recent log streams
                const logStreams = await cloudwatchlogs.describeLogStreams({
                    logGroupName,
                    orderBy: "LastEventTime",
                    descending: true,
                    limit: 2
                }).promise();

                if (!logStreams.logStreams.length) continue;

                // Fetch logs from the most recent stream
                const latestStreamName = logStreams.logStreams[0].logStreamName;
                const logEvents = await cloudwatchlogs.getLogEvents({
                    logGroupName,
                    logStreamName: latestStreamName,
                    limit: 10
                }).promise();

                // Filter error messages
                const errorLogs = logEvents.events
                    .filter(event => event.message.includes("ERROR") || event.message.includes("Exception"))
                    .map(event => event.message);

                if (errorLogs.length > 0) {
                    allErrorLogs.push({ functionName, errorLogs });
                }
            } catch (logError) {
                console.warn(`No logs found for function: ${functionName}`);
            }
        }

        return res.json({ errorLogs: allErrorLogs });

    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ error: "Failed to fetch Lambda error logs" });
    }
};
