const User = require('../../models/User');


exports.awsCredentials = async (req, res) => {
    // Get user's AWS credential input from request body
    const { accessKey, secretAccessKey, region } = req.body;

    // Error handling - if data is missing, return error
    if (!accessKey || !secretAccessKey || !region) {
        return res.status(400).json({ error: 'Missing required properties in request body' });
    }

    // Extract JWT from the request headers
    const token = req.headers['authorization']?.split(' ')[1]; //Bearer token
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token and extract user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // User ID from token payload

        // New credential object to store in database
        const newCredentials = {
            AWS_ACCESS_KEY_ID: accessKey,
            AWS_SECRET_ACCESS_KEY: secretAccessKey,
            AWS_REGION: region,
        };

        // Find the user by userId and update their AWS credentials
        const updatedUser = await User.findByIdAndUpdate(
            userId,  //  userId from decoded JWT token
            { $set: { awsCredential: newCredentials } },  // Update awsCredential field
            { new: true, runValidators: true }  // Ensure the updated user is returned
        );

        // If no user is found with the given userId
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Successfully updated AWS credentials
        return res.status(200).json({ message: 'AWS credentials successfully updated', user: updatedUser });
    } catch (error) {
        // Catch any errors and return them in the response
        console.error('Error updating AWS credentials:', error);
        return res.status(500).json({ error: 'Error updating AWS credentials' });
    }
};
