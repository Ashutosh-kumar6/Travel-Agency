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
app.get('/contact', (req, res) => res.render('contact'));

// ✅ test route
app.get('/test', (req, res) => {
  res.send("Working 🚀");
});

// ❌ REMOVE THIS:
// app.listen(...)

// ✅ export
module.exports = app;