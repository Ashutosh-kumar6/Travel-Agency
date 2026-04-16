const notFound = (req, res, next) => {
    const error = new Error(`Page not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    if (statusCode >= 500) {
        console.error(error);
    }

    res.status(statusCode).render('pages/error', {
        title: statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong',
        statusCode,
        message: error.message || 'Unexpected server error.'
    });
};

module.exports = {
    notFound,
    errorHandler
};
