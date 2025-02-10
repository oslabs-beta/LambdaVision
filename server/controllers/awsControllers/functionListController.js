const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
const User = require('../../models/User');

exports.getLambdaFunctions = async (req, res) => {
    try {
        // Step 1: Get userId from request parameters
        const userId = req.params.userId;

        // Step 2: Find user in database by userId
        const user = await User.findById(userId);
        if (!user || !user.awsCredential) {
            return res.status(403).json({ error: "AWS credentials not found for user" });
        }

        // Step 3: Extract credentials from database
        const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = user.awsCredential;

        // Step 4: Create a new Lambda client instance using the user's credentials
        const client = new LambdaClient({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        });

        // Step 5: List Lambda functions
        const command = new ListFunctionsCommand({});
        const response = await client.send(command);

        // Step 6: Format and send the response
        if (response.Functions && response.Functions.length > 0) {
            const functionsArray = response.Functions.map(func => ({
                name: func.FunctionName,
                runtime: func.Runtime,
                lastModified: func.LastModified
            }));
            return res.status(200).json({ functions: functionsArray });
        } else {
            return res.status(404).json({ message: "No Lambda Functions found" });
        }

    } catch (error) {
        console.error("Error fetching Lambda functions:", error);
        return res.status(500).json({ error: "Failed to fetch Lambda functions" });
    }
};