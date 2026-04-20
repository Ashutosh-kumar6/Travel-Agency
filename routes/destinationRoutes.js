const express = require('express');
const {
    getAllDestinations,
    getDestinationDetails,
    createDestination
} = require('../controllers/destinationController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/all', getAllDestinations);
router.get('/:id', getDestinationDetails);
router.post('/', protect, isAdmin, createDestination);

module.exports = router;
