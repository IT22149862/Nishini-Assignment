const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin-protected routes
router.post('/', adminAuth, createService);
router.put('/:id', adminAuth, updateService);
router.delete('/:id', adminAuth, deleteService);

module.exports = router;
