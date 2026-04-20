const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// ✅ view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'ui'));

// ✅ static files
app.use(express.static(path.join(process.cwd(), 'public')));

// ✅ middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ session & flash
app.use(session({
    secret: process.env.SESSION_SECRET || 'travelagency-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(flash());

// ✅ Import middleware
const { attachUserToLocals } = require('./middleware/authMiddleware');
const { attachNavigationPages } = require('./middleware/siteMiddleware');

app.use(attachUserToLocals);
app.use(attachNavigationPages);

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const pageRoutes = require('./routes/pageRoutes');

// ✅ Use routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/booking', bookingRoutes);
app.use('/contact', contactRoutes);
app.use('/destination', destinationRoutes);
app.use('/', pageRoutes);  // Core pages at root level

// ✅ test route
app.get('/test', (req, res) => {
  res.send("Working 🚀");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send("Something broke! " + err.message);
});

// ✅ export
module.exports = app;