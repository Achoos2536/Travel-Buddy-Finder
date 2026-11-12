const express = require('express');
const { createTrip, getTrips } = require('../controllers/tripController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Browse active trips
router.get('/', protect, getTrips);

// Create a trip — Trip Creators only
router.post('/', protect, authorizeRoles('tripCreator'), createTrip);

module.exports = router;