const express = require('express');
const { createContactMessage } = require('../controllers/contactController');

const router = express.Router();

router.post('/contact', createContactMessage);

module.exports = router;
