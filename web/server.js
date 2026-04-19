const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Allows your frontend to talk to this backend
app.use(express.json()); // Essential: allows the server to read JSON from requests
app.use(express.urlencoded({ extended: true }));

// --- DATABASE CONNECTION ---
// Replace the URI with your MongoDB Atlas string or keep local for development
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventDB';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Stop the server if DB connection fails
    });

// --- API ROUTES ---
// Mount the Event logic under /api/events
app.use('/api/events', eventRoutes);

// Mount the User logic under /api/users
app.use('/api/users', userRoutes);

// --- GLOBAL ERROR HANDLER ---
// This catches any errors that occur in your routes so the server doesn't crash
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    🌟 Mini Project Server Running!
    ---------------------------------
    📡 URL: http://localhost:${PORT}
    📅 Events: http://localhost:${PORT}/api/events
    👤 Users:  http://localhost:${PORT}/api/users
    ---------------------------------
    `);
});