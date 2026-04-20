const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');
const asyncHandler = require('./asyncHandler');
const { jwtSecret, adminAccessCode } = require('../config/env');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error', 'Please login to continue.');
        return res.redirect('/login');
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        res.clearCookie('token');
        req.flash('error', 'Your session has expired. Please login again.');
        return res.redirect('/login');
    }

    req.user = user;
    next();
});

const attachUserToLocals = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.currentUser = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id).select('-password');
        req.user = user || null;
        res.locals.currentUser = user || null;
    } catch (error) {
        req.user = null;
        res.locals.currentUser = null;
    }

    next();
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        req.flash('error', 'Only admins can access this action.');
        return res.redirect('/destinations');
    }

    next();
};

const protectAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error', 'Please login as admin to continue.');
        return res.redirect(`/admin/${adminAccessCode}/login`);
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.role !== 'admin') {
        res.clearCookie('token');
        req.flash('error', 'Admin access is required.');
        return res.redirect(`/admin/${adminAccessCode}/login`);
    }

    req.user = user;
    res.locals.currentUser = user;
    next();
});

const validateAdminAccessCode = (req, res, next) => {
    const { accessCode } = req.params;

    if (accessCode !== adminAccessCode) {
        return res.status(404).render('pages/error', {
            title: 'Not Found',
            layout: 'layout',
            error: 'Page not found'
        });
    }

    next();
};

module.exports = {
    protect,
    isAdmin,
    protectAdmin,
    attachUserToLocals,
    validateAdminAccessCode
};
