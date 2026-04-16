const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { jwtSecret } = require('../config/env');

const createToken = (userId) =>
    jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' });

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        req.flash('error', 'Please fill in all required fields.');
        return res.redirect('/register');
    }

    if (password.length < 6) {
        req.flash('error', 'Password must be at least 6 characters long.');
        return res.redirect('/register');
    }

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/register');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
        req.flash('error', 'An account with this email already exists.');
        return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
    });

    req.flash('success', 'Registration successful. Please login.');
    res.redirect('/login');
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error', 'Please provide both email and password.');
        return res.redirect('/login');
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
    }

    const token = createToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    });

    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/');
});

const logoutUser = (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'You have been logged out successfully.');
    res.redirect('/login');
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
