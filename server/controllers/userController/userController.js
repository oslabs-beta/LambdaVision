const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userSignup = async (req, res) => {
    const { email, password, username } = req.body;

    // Error handling for missing fields
    if (!email || !password || !username) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ message: "User successfully created" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.userLogin = async (req, res) => {
    const { password, username } = req.body;

    try {
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};