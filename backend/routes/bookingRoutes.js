const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');

// Public route — anyone can submit a booking
router.post('/', createBooking);

module.exports = router;
