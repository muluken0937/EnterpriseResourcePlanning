

const express = require('express');
const {
  createInvoice,
  getInvoiceById,
  updateInvoice,
  getAllInvoices,
  deleteInvoice,
} = require('../controllers/invoiceController');
const { protect, restrictTo } = require('../middleware/userMiddleware'); 

const router = express.Router();

// Routes
router.post('/', protect, restrictTo('Admin', 'Super Admin', 'Sales Manager',), createInvoice); 
router.get('/:id', protect, getInvoiceById); 
router.put('/:id', protect, restrictTo('Admin', 'Super Admin', 'Sales Manager'), updateInvoice); 
router.get('/', protect, getAllInvoices); 
router.delete('/:id', protect, restrictTo('Admin', 'Super Admin', 'Sales Manager'), deleteInvoice); 

module.exports = router;
