const Destination = require('../models/Destination');
const asyncHandler = require('../middleware/asyncHandler');

const renderPage = (viewName, title) => (req, res) => {
    res.render(`pages/${viewName}`, { title });
};

const renderHomePage = asyncHandler(async (req, res) => {
    const featuredDestinations = await Destination.find().limit(3).sort({ createdAt: -1 });

    res.render('pages/home', {
        title: 'Home',
        featuredDestinations
    });
});

const renderBookingPage = asyncHandler(async (req, res) => {
    const destinations = await Destination.find().sort({ name: 1 });

    res.render('pages/book-your-trip', {
        title: 'Book Your Trip',
        destinations
    });
});

module.exports = {
    renderHomePage,
    renderBookingPage,
    renderAboutPage: renderPage('about', 'About'),
    renderServicesPage: renderPage('services', 'Services'),
    renderFoodPage: renderPage('food', 'Food'),
    renderRentalPage: renderPage('rental', 'Rental'),
    renderContactPage: renderPage('contact', 'Contact'),
    renderLoginPage: renderPage('login', 'Login'),
    renderRegisterPage: renderPage('register', 'Register')
};
