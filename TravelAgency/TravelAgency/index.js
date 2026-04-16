const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ui'));

// Serve static files (CSS, JS, images)
app.use(express.static('public'));
 
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/destination', (req, res) => {
    res.render('destination');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/food', (req, res) => {
    res.render('food');
});

app.get('/rental', (req, res) => {
    res.render('rental');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/bookYourTrip', (req, res) => {
    res.render('bookYourTrip');
});

// Start server
app.listen(PORT, () => {
    console.log(`🌍 Travel Agency Server running on http://localhost:${PORT}`);
});
