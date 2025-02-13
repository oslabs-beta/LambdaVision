const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    console.log("Received Authorization Header:", authHeader);  // ✅ Debug log

    if (!authHeader) {
        console.error("No Authorization header received");
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    console.log("Extracted Token:", token);  // ✅ Debug log

    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  // ✅ Debug log
        req.user = decoded;  // Attach user info to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
