const express = require('express');
const { recordPayment, getPaymentById, getAllPayments } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', recordPayment);
router.get('/:id', getPaymentById);
router.get('/', getAllPayments);

module.exports = router;
