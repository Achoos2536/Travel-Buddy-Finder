const JoinRequest = require('../models/JoinRequest');
const Trip = require('../models/Trip');

// Traveller requests to join a trip
const requestToJoin = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);

        if (!trip || trip.status !== 'active') {
            return res.status(404).json({
                message: 'Trip not available'
            });
        }

        const existing = await JoinRequest.findOne({
            tripId: trip._id,
            travellerId: req.user._id
        });

        if (existing) {
            return res.status(400).json({
                message: 'You have already requested to join this trip'
            });
        }

        const request = await JoinRequest.create({
            tripId: trip._id,
            travellerId: req.user._id
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Trip Creator approves or rejects a request
const updateJoinRequest = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Status must be approved or rejected'
            });
        }

        const request = await JoinRequest.findById(req.params.requestId);

        if (!request) {
            return res.status(404).json({
                message: 'Join request not found'
            });
        }

        const trip = await Trip.findById(request.tripId);

        if (!trip || trip.creatorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Only the trip creator can manage this request'
            });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({
                message: 'This request has already been processed'
            });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Trip Creator wants to join requests for their trip
const getJoinRequests = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        if (trip.creatorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Only the trip creator can view these requests'
            });
        }

        const requests = await JoinRequest.find({
            tripId: trip._id
        }).populate('travellerId', 'name email');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Traveller views their own join requests
const getMyJoinRequests = async (req, res) => {
    try {
        const requests = await JoinRequest.find({
            travellerId: req.user._id
        }).populate('tripId');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { requestToJoin, updateJoinRequest, getJoinRequests, getMyJoinRequests };