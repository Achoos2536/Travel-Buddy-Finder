const Trip = require('../models/Trip');

// Create a new trip
const createTrip = async (req, res) => {
    try {
        const { destination, startDate, endDate, description } = req.body;

        if (!destination || !startDate || !endDate) {
            return res.status(400).json({
                message: 'Destination and dates are required'
            });
        }

        if (
            !Number.isFinite(Date.parse(startDate)) ||
            !Number.isFinite(Date.parse(endDate)) ||
            new Date(endDate) < new Date(startDate)
        ) {
            return res.status(400).json({
                message: 'Invalid trip dates'
            });
        }

        const trip = await Trip.create({
            creatorId: req.user._id,
            destination,
            startDate,
            endDate,
            description
        });

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Browse active trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ status: 'active' });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTrip, getTrips };