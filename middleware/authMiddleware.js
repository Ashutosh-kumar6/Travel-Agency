const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error', 'Please login to continue.');
        return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

module.exports = {
    protect,
    isAdmin,
    attachUserToLocals
};
