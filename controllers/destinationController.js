const Destination = require('../models/Destination');
const asyncHandler = require('../middleware/asyncHandler');

const getAllDestinations = asyncHandler(async (req, res) => {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.render('pages/destinations', {
        title: 'Destinations',
        destinations
    });
});

const getDestinationDetails = asyncHandler(async (req, res) => {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
        const error = new Error('Destination not found.');
        error.statusCode = 404;
        throw error;
    }

    res.render('pages/destination-details', {
        title: destination.name,
        destination
    });
});

const createDestination = asyncHandler(async (req, res) => {
    const { name, location, price, description, image } = req.body;

    if (!name || !location || !price || !description || !image) {
        req.flash('error', 'Please fill in all destination fields.');
        return res.redirect('/destinations');
    }

    await Destination.create({
        name,
        location,
        price,
        description,
        image
    });

    req.flash('success', 'Destination added successfully.');
    res.redirect('/destinations');
});

module.exports = {
    getAllDestinations,
    getDestinationDetails,
    createDestination
};
