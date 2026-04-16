const SitePage = require('../models/SitePage');
const mongoose = require('mongoose');

const attachNavigationPages = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            res.locals.navigationPages = [];
            next();
            return;
        }

        const navigationPages = await SitePage.find({
            isPublished: true,
            showInNavbar: true
        }).sort({ title: 1 });

        res.locals.navigationPages = navigationPages;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    attachNavigationPages
};
