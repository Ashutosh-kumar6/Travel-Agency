const express = require('express');
const path = require('path');

const app = express();

// ✅ view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'ui'));

// ✅ static
app.use(express.static(path.join(process.cwd(), 'public')));

// ✅ middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ routes - TESTING BYPASS
app.get('/', (req, res) => {
    res.send("Server is working ✅");
});

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pageRoutes = require('./routes/pageRoutes');

// ✅ Use routes
app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);
app.use('/contact', contactRoutes);
app.use('/destination', destinationRoutes);
app.use('/admin', adminRoutes);
app.use('/pages', pageRoutes);

// ✅ test route
app.get('/test', (req, res) => {
  res.send("Working 🚀");
});

// ✅ Error handling middleware (IMPORTANT - catches crashes)
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send("Something broke! " + err.message);
});

// ❌ REMOVE THIS:
// app.listen(...)

// ✅ export
module.exports = app;