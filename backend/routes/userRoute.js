const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    createSalesUser, 
    getSalesUsers, 
    createCustomer, 
    getCustomers 
} = require('../controllers/userController');
const { protect, restrictTo, isSalesManager } = require('../middleware/userMiddleware');

// User registration routes
router.post('/register/superadmin', register);
router.post('/register', protect, restrictTo('Super Admin'), register);

// User login route
router.post('/login', login);

// Sales Manager routes
router.post('/sales-users/create', protect, isSalesManager, createSalesUser);
router.get('/sales-users', protect, isSalesManager, getSalesUsers);

// Customer routes
router.post('/customers/create', protect, restrictTo('Sales User'), createCustomer);  // Allow only Sales Users to create customers
router.get('/customers', protect, restrictTo('Super Admin', 'Admin', 'Sales User'), getCustomers); // Allow Sales User to view customers too

module.exports = router;
