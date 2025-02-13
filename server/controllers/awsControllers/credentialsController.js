const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.awsCredentials = async (req, res) => {
    console.log("🟡 Received request body:", req.body);
    console.log("🟡 Headers:", req.headers);

    // 🔍 Fix: Ensure correct destructuring
    const { accessKey, secretKey, region } = req.body; // Check variable names

    // 🔥 Log received values
    console.log("Extracted Fields:");
    console.log("  - Access Key:", accessKey);
    console.log("  - Secret Key:", secretKey);
    console.log("  - Region:", region);

    // ❌ If any value is undefined, return error
    if (!accessKey || !secretKey || !region) {
        console.error("🔴 Missing required fields in request body:", req.body);
        return res.status(400).json({ error: 'Missing required properties in request body' });
    }

    try {
        // ✅ Process token and save credentials as before...
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // ✅ Save credentials correctly
        user.awsCredential = {
            AWS_ACCESS_KEY_ID: accessKey,
            AWS_SECRET_ACCESS_KEY: secretKey, // 🔍 Fix key name to match request
            AWS_REGION: region
        };

        await user.save();
        console.log("🟢 AWS credentials saved successfully:", user.awsCredential);

        return res.status(200).json({ message: 'AWS credentials successfully updated', user });
    } catch (error) {
        console.error('🔴 Error updating AWS credentials:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};