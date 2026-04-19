const Event = require('../model/eventModel');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { title, venue, category } = req.body;
        const newEvent = new Event({ title, venue, category });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error: error.message });
    }
};

// Get All Events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};