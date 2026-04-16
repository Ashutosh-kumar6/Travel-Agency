const SitePage = require('../models/SitePage');

const attachNavigationPages = async (req, res, next) => {
    try {
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
