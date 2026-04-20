const Destination = require('../../database/models/Destination');
const CatalogItem = require('../../database/models/CatalogItem');
const SitePage = require('../../database/models/SitePage');
const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');

const isDbReady = () => mongoose.connection.readyState === 1;

const renderHomePage = asyncHandler(async (req, res) => {
    const featuredDestinations = isDbReady()
        ? await Destination.find().limit(3).sort({ createdAt: -1 })
        : [];

    res.render('pages/home', {
        title: 'Home',
        featuredDestinations
    });
});

const renderBookingPage = asyncHandler(async (req, res) => {
    const destinations = isDbReady() ? await Destination.find().sort({ name: 1 }) : [];

    res.render('pages/book-your-trip', {
        title: 'Book Your Trip',
        destinations
    });
});

const renderManagedPage = asyncHandler(async (req, res) => {
    if (!isDbReady()) {
        const error = new Error('This page is temporarily unavailable.');
        error.statusCode = 503;
        throw error;
    }

    const page = await SitePage.findOne({ slug: req.params.slug, isPublished: true });

    if (!page) {
        const error = new Error('Page not found.');
        error.statusCode = 404;
        throw error;
    }

    res.render('pages/site-page', {
        title: page.title,
        page
    });
});

const renderAboutPage = asyncHandler(async (req, res) => {
    if (!isDbReady()) {
        return res.render('pages/about', { title: 'About' });
    }

    const page = await SitePage.findOne({ slug: 'about', isPublished: true });

    if (!page) {
        return res.render('pages/about', { title: 'About' });
    }

    res.render('pages/site-page', {
        title: page.title,
        page
    });
});

const renderCatalogPage = (section, title, heading, searchPlaceholder) =>
    asyncHandler(async (req, res) => {
        const items = isDbReady()
            ? await CatalogItem.find({ section, isPublished: true }).sort({ createdAt: -1 })
            : [];

        res.render('pages/catalog', {
            title,
            section,
            heading,
            searchPlaceholder,
            items
        });
    });

module.exports = {
    renderHomePage,
    renderBookingPage,
    renderManagedPage,
    renderAboutPage,
    renderServicesPage: renderCatalogPage(
        'service',
        'Services',
        'Premium Services',
        'Search premium travel services...'
    ),
    renderFoodPage: renderCatalogPage(
        'food',
        'Food',
        'Culinary Experiences',
        'Search culinary experiences and food tours...'
    ),
    renderRentalPage: renderCatalogPage(
        'rental',
        'Rental',
        'Rental Options',
        'Search luxury rentals and transport options...'
    ),
    renderContactPage: (req, res) => res.render('pages/contact', { title: 'Contact' }),
    renderLoginPage: (req, res) => res.render('pages/login', { title: 'Login' }),
    renderRegisterPage: (req, res) => res.render('pages/register', { title: 'Register' })
};
