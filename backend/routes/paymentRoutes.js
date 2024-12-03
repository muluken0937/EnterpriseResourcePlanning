const express = require('express');
const { recordPayment, getPaymentById, getAllPayments,getPaymentsByCustomerId } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', recordPayment);
router.get('/:id', getPaymentById);
router.get('/', getAllPayments);
router.get('/customer/:customerId', getPaymentsByCustomerId);


module.exports = router;
