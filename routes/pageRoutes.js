const express = require('express');
const {
    renderHomePage,
    renderBookingPage,
    renderAboutPage,
    renderServicesPage,
    renderFoodPage,
    renderRentalPage,
    renderContactPage,
    renderLoginPage,
    renderRegisterPage
} = require('../controllers/pageController');

const router = express.Router();

router.get('/', renderHomePage);
router.get('/about', renderAboutPage);
router.get('/services', renderServicesPage);
router.get('/food', renderFoodPage);
router.get('/rental', renderRentalPage);
router.get('/contact', renderContactPage);
router.get('/login', renderLoginPage);
router.get('/register', renderRegisterPage);
router.get('/bookYourTrip', renderBookingPage);
router.get('/book-your-trip', renderBookingPage);

module.exports = router;
