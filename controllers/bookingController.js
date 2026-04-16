const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const asyncHandler = require('../middleware/asyncHandler');

const createBooking = asyncHandler(async (req, res) => {
    const { destination, date } = req.body;

    if (!destination || !date) {
        req.flash('error', 'Please choose a destination and travel date.');
        return res.redirect('/book-your-trip');
    }

    const selectedDestination = await Destination.findById(destination);

    if (!selectedDestination) {
        req.flash('error', 'Selected destination was not found.');
        return res.redirect('/book-your-trip');
    }

    await Booking.create({
        user: req.user._id,
        destination: selectedDestination._id,
        date,
        status: 'pending'
    });

    req.flash('success', 'Booking request submitted successfully.');
    res.redirect('/my-bookings');
});

const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('destination')
        .sort({ createdAt: -1 });

    res.render('pages/my-bookings', {
        title: 'My Bookings',
        bookings
    });
});

module.exports = {
    createBooking,
    getMyBookings
};
