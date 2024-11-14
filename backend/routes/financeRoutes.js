// financeRoutes.js

const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const { protect, restrictTo } = require('../middleware/userMiddleware');

router.get('/summary', protect, restrictTo('Super Admin', 'Admin'), financeController.getFinancialSummary);
router.get('/revenue', protect, restrictTo('Super Admin', 'Admin'), financeController.getRevenueByPeriod);
router.get('/overdue', protect, restrictTo('Super Admin', 'Admin'), financeController.getOverdueInvoices);

module.exports = router;
