const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');

const createContactMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        req.flash('error', 'Please complete the contact form before submitting.');
        return res.redirect('/contact');
    }

    await Contact.create({
        name,
        email,
        message
    });

    req.flash('success', 'Your message has been sent. We will contact you soon.');
    res.redirect('/contact');
});

module.exports = {
    createContactMessage
};
