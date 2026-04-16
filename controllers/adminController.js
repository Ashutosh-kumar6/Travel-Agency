const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const Contact = require('../models/Contact');
const CatalogItem = require('../models/CatalogItem');
const SitePage = require('../models/SitePage');
const asyncHandler = require('../middleware/asyncHandler');
const { adminSetupKey, jwtSecret, adminAccessCode } = require('../config/env');

const renderAdminLoginPage = (req, res) => {
    res.render('pages/admin-login', { title: 'Admin Login', layout: 'admin/layout' });
};

const renderAdminRegisterPage = (req, res) => {
    res.render('pages/admin-register', { title: 'Create Admin', layout: 'admin/layout' });
};

const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword, setupKey } = req.body;

    if (!name || !email || !password || !confirmPassword || !setupKey) {
        req.flash('error', 'Please complete all admin registration fields.');
        return res.redirect(`/admin/${adminAccessCode}/create`);
    }

    if (setupKey !== adminSetupKey) {
        req.flash('error', 'Invalid admin setup key.');
        return res.redirect(`/admin/${adminAccessCode}/create`);
    }

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect(`/admin/${adminAccessCode}/create`);
    }

    const existingAdmin = await User.findOne({ email: email.toLowerCase() });

    if (existingAdmin) {
        req.flash('error', 'A user with this email already exists.');
        return res.redirect(`/admin/${adminAccessCode}/create`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin'
    });

    req.flash('success', 'Admin account created successfully. Please login.');
    res.redirect(`/admin/${adminAccessCode}/login`);
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error', 'Please provide admin email and password.');
        return res.redirect(`/admin/${adminAccessCode}/login`);
    }

    const admin = await User.findOne({ email: email.toLowerCase(), role: 'admin' });

    if (!admin) {
        req.flash('error', 'Admin account not found.');
        return res.redirect(`/admin/${adminAccessCode}/login`);
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        req.flash('error', 'Invalid admin credentials.');
        return res.redirect(`/admin/${adminAccessCode}/login`);
    }

    const token = jwt.sign({ id: admin._id }, jwtSecret, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    });

    req.flash('success', `Welcome, Admin ${admin.name}.`);
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const renderDashboard = asyncHandler(async (req, res) => {
    const [pendingBookings, allBookings, destinations, contacts, catalogItems, pages] = await Promise.all([
        Booking.find({ status: 'pending' }).populate('user destination').sort({ createdAt: -1 }),
        Booking.find().populate('user destination').sort({ createdAt: -1 }).limit(12),
        Destination.find().sort({ createdAt: -1 }),
        Contact.find().sort({ createdAt: -1 }).limit(12),
        CatalogItem.find().sort({ section: 1, createdAt: -1 }),
        SitePage.find().sort({ createdAt: -1 })
    ]);

    res.render('pages/admin-dashboard', {
        title: 'Admin Dashboard',
        layout: 'admin/layout',
        pendingBookings,
        allBookings,
        destinations,
        contacts,
        catalogItems,
        pages
    });
});

const createCatalogItem = asyncHandler(async (req, res) => {
    const { section, title, description, priceLabel, image } = req.body;

    if (!section || !title || !description) {
        req.flash('error', 'Section, title, and description are required.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    await CatalogItem.create({
        section,
        title,
        description,
        priceLabel,
        image
    });

    req.flash('success', `${section} item added successfully.`);
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const renderEditCatalogItemPage = asyncHandler(async (req, res) => {
    const item = await CatalogItem.findById(req.params.id);

    if (!item) {
        req.flash('error', 'Catalog item not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    res.render('pages/admin-edit-item', {
        title: `Edit ${item.title}`,
        layout: 'admin/layout',
        item
    });
});

const updateCatalogItem = asyncHandler(async (req, res) => {
    const item = await CatalogItem.findById(req.params.id);

    if (!item) {
        req.flash('error', 'Catalog item not found.');
        return res.redirect('/admin/dashboard');
    }

    const { section, title, description, priceLabel, image, isPublished } = req.body;

    item.section = section;
    item.title = title;
    item.description = description;
    item.priceLabel = priceLabel;
    item.image = image;
    item.isPublished = Boolean(isPublished);

    await item.save();
    req.flash('success', 'Catalog item updated successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const deleteCatalogItem = asyncHandler(async (req, res) => {
    const item = await CatalogItem.findById(req.params.id);

    if (!item) {
        req.flash('error', 'Catalog item not found.');
        return res.redirect('/admin/dashboard');
    }

    await item.deleteOne();
    req.flash('success', 'Catalog item deleted successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const createPage = asyncHandler(async (req, res) => {
    const { title, slug, heroTitle, summary, content, showInNavbar } = req.body;

    if (!title || !slug || !heroTitle || !content) {
        req.flash('error', 'Title, slug, hero title, and content are required.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    const existingPage = await SitePage.findOne({ slug: slug.toLowerCase() });

    if (existingPage) {
        req.flash('error', 'A page with this slug already exists.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    await SitePage.create({
        title,
        slug: slug.toLowerCase(),
        heroTitle,
        summary,
        content,
        showInNavbar: Boolean(showInNavbar)
    });

    req.flash('success', 'Page created successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const renderEditPage = asyncHandler(async (req, res) => {
    const page = await SitePage.findById(req.params.id);

    if (!page) {
        req.flash('error', 'Page not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    res.render('pages/admin-edit-page', {
        title: `Edit ${page.title}`,
        layout: 'admin/layout',
        page
    });
});

const updatePage = asyncHandler(async (req, res) => {
    const page = await SitePage.findById(req.params.id);

    if (!page) {
        req.flash('error', 'Page not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    const { title, slug, heroTitle, summary, content, showInNavbar, isPublished } = req.body;
    const normalizedSlug = page.isSystem ? page.slug : slug.toLowerCase();
    const duplicatePage = await SitePage.findOne({ slug: normalizedSlug, _id: { $ne: page._id } });

    if (duplicatePage) {
        req.flash('error', 'Another page already uses that slug.');
        return res.redirect(`/admin/${adminAccessCode}/pages/${page._id}/edit`);
    }

    page.title = title;
    page.slug = normalizedSlug;
    page.heroTitle = heroTitle;
    page.summary = summary;
    page.content = content;
    page.showInNavbar = Boolean(showInNavbar);
    page.isPublished = Boolean(isPublished);

    await page.save();
    req.flash('success', 'Page updated successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const deletePage = asyncHandler(async (req, res) => {
    const page = await SitePage.findById(req.params.id);

    if (!page) {
        req.flash('error', 'Page not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    if (page.isSystem) {
        req.flash('error', 'System pages cannot be deleted.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    await page.deleteOne();
    req.flash('success', 'Page deleted successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['confirmed', 'cancelled', 'pending'];

    if (!allowedStatuses.includes(status)) {
        req.flash('error', 'Invalid booking status.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        req.flash('error', 'Booking not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    booking.status = status;
    await booking.save();

    req.flash('success', `Booking status updated to ${status}.`);
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const deleteDestination = asyncHandler(async (req, res) => {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
        req.flash('error', 'Destination not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    await Booking.deleteMany({ destination: destination._id });
    await destination.deleteOne();

    req.flash('success', 'Destination deleted successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

const renderEditDestinationPage = asyncHandler(async (req, res) => {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
        req.flash('error', 'Destination not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    res.render('pages/admin-edit-destination', {
        title: `Edit ${destination.name}`,
        layout: 'admin/layout',
        destination
    });
});

const updateDestination = asyncHandler(async (req, res) => {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
        req.flash('error', 'Destination not found.');
        return res.redirect(`/admin/${adminAccessCode}/dashboard`);
    }

    const { name, location, price, description, image } = req.body;

    destination.name = name;
    destination.location = location;
    destination.price = price;
    destination.description = description;
    destination.image = image;

    await destination.save();
    req.flash('success', 'Destination updated successfully.');
    res.redirect(`/admin/${adminAccessCode}/dashboard`);
});

module.exports = {
    renderAdminLoginPage,
    renderAdminRegisterPage,
    createAdmin,
    loginAdmin,
    renderDashboard,
    createCatalogItem,
    renderEditCatalogItemPage,
    updateCatalogItem,
    deleteCatalogItem,
    createPage,
    renderEditPage,
    updatePage,
    deletePage,
    updateBookingStatus,
    deleteDestination,
    renderEditDestinationPage,
    updateDestination
};
