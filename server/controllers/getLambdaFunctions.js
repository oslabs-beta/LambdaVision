const { FunctionVersion, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
const aws = require('aws-sdk');
require('dotenv').config();


//Configure Aws
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

// Create new instances of lambda and cloudwatch 
const lambda = new AWS.Lambda();


exports.getLambdaFunctions = async (req, res) => {
    const input = {
        MasterRegion: "ALL",
        FunctionVersion: "ALL",
        Market: "NextMarker",
        MaxItems: 10
    }

    
    try {
        const command = new ListFunctionsCommand(input);
    
        const response = await client.send(command);
        
        // Check if the response contains functions
        if (response.Functions && response.Functions.length > 0) {
            const functionsArray = response.Functions.map(func => ({
                name: func.FunctionName,
                runtime: func.Runtime,
                lastModified: func.LastModified
            }));
            res.status(200).json({functions: functionsArray});
        } else {
            res.status(400).json({message: "No Lambda Functions found"})
        }
        
    } catch (error) {
        console.error("Error in fetching lambda functions");
        res.status(500).json({error: "Failed to fetch lambda functions"});
    }
}
