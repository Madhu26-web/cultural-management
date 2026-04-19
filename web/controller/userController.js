const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Registration failed", error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};