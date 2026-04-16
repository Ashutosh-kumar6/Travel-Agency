const express = require('express');
const {
    getAllDestinations,
    getDestinationDetails,
    createDestination
} = require('../controllers/destinationController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/destination', getAllDestinations);
router.get('/destinations', getAllDestinations);
router.get('/destinations/:id', getDestinationDetails);
router.post('/destinations', protect, isAdmin, createDestination);

module.exports = router;
