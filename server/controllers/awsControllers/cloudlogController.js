const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
const { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand } = require('@aws-sdk/client-cloudwatch-logs');
const User = require('../../models/User');

exports.getAllLambdaErrorLogs = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user in database by userId
        const user = await User.findById(userId);
        if (!user || !user.awsCredential) {
            return res.status(403).json({ error: "AWS credentials not found for user" });
        }

        // Extract AWS credentials from the database
        const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = user.awsCredential;

        // Initialize AWS SDK v3 clients
        const lambdaClient = new LambdaClient({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        });

        const cloudWatchClient = new CloudWatchLogsClient({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        });

        // Fetch all Lambda function names
        const listFunctionsCommand = new ListFunctionsCommand({});
        const functionsResponse = await lambdaClient.send(listFunctionsCommand);
        const functionNames = functionsResponse.Functions.map(fn => fn.FunctionName);

        let allErrorLogs = [];

        for (const functionName of functionNames) {
            const logGroupName = `/aws/lambda/${functionName}`;
            try {
                // Get latest log streams
                const logStreamsCommand = new DescribeLogStreamsCommand({
                    logGroupName,
                    orderBy: "LastEventTime",
                    descending: true,
                    limit: 2
                });

                const logStreamsResponse = await cloudWatchClient.send(logStreamsCommand);
                if (!logStreamsResponse.logStreams || logStreamsResponse.logStreams.length === 0) {
                    continue;
                }

                const latestStreamName = logStreamsResponse.logStreams[0].logStreamName;

                // Fetch log events
                const logEventsCommand = new GetLogEventsCommand({
                    logGroupName,
                    logStreamName: latestStreamName,
                    limit: 10
                });

                const logEventsResponse = await cloudWatchClient.send(logEventsCommand);

                // Filter only error logs
                const errorLogs = logEventsResponse.events
                    .filter(event => event.message.includes("ERROR") || event.message.includes("Exception"))
                    .map(event => event.message);

                if (errorLogs.length > 0) {
                    allErrorLogs.push({ functionName, errorLogs });
                }

            } catch (logError) {
                console.warn(`⚠️ No logs found for function: ${functionName}`);
            }
        }

        return res.json({ errorLogs: allErrorLogs });

    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ error: "Failed to fetch Lambda error logs" });
    }
};
