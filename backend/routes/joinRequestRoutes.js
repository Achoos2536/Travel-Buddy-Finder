const express = require('express');

const {
    requestToJoin,
    updateJoinRequest,
    getJoinRequests,
    getMyJoinRequests
} = require('../controllers/joinRequestController');

const {
    protect,
    authorizeRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

// Traveller requests to join a trip
router.post(
    '/:tripId',
    protect,
    authorizeRoles('traveller'),
    requestToJoin
);

// Trip Creator approves or rejects a request
router.patch(
    '/:requestId',
    protect,
    authorizeRoles('tripCreator'),
    updateJoinRequest
);

// Trip Creator views requests for a trip
router.get(
    '/trip/:tripId',
    protect,
    authorizeRoles('tripCreator'),
    getJoinRequests
);
// Traveller views their own requests
router.get(
    '/my-requests',
    protect,
    authorizeRoles('traveller'),
    getMyJoinRequests
);

module.exports = router;