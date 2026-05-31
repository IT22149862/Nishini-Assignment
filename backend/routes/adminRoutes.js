const express = require('express');
const router = express.Router();
const { getAllBookings, markCompleted, deleteBooking } = require('../controllers/bookingController');
const adminAuth = require('../middleware/adminAuth');

// All admin routes are protected
router.get('/bookings', adminAuth, getAllBookings);
router.patch('/bookings/:id/complete', adminAuth, markCompleted);
router.delete('/bookings/:id', adminAuth, deleteBooking);

module.exports = router;
