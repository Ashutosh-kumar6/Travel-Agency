const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const { sessionSecret } = require('./config/env');

const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { attachUserToLocals } = require('./middleware/authMiddleware');
const { attachNavigationPages } = require('./middleware/siteMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend', 'views'));
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }
    })
);
app.use(flash());

app.use(attachUserToLocals);
app.use(attachNavigationPages);
app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    res.locals.formatCurrency = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(Number(value || 0));
    res.locals.formatPriceLabel = (label) => {
        if (!label) {
            return '';
        }

        return label.replace(/\$([\d,]+(?:\.\d+)?)/g, (_, amount) => {
            const formattedAmount = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(Number(amount.replace(/,/g, '')));

            return formattedAmount;
        });
    };
    next();
});

app.use('/', pageRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', destinationRoutes);
app.use('/', bookingRoutes);
app.use('/', contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
