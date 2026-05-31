const Booking = require('../models/Booking');

// POST create a new booking
const createBooking = async (req, res) => {
  try {
    const { customerName, email, phone, service, date, time, address, notes } = req.body;

    // Basic validation
    if (!customerName || !email || !phone || !service || !date || !time || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
      });
    }

    const booking = await Booking.create({
      customerName,
      email,
      phone,
      service,
      date,
      time,
      address,
      notes,
    });

    // Populate service details before returning
    const populated = await booking.populate('service', 'name price');

    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully!',
      data: populated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET all bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH mark booking as completed (admin)
const markCompleted = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed' },
      { new: true }
    ).populate('service', 'name price');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE a booking (admin)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking, getAllBookings, markCompleted, deleteBooking };
