

const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    createSalesUser, 
    getSalesUsers, 
    createCustomer, 
    getCustomers, 
    getSalesPerformance, 
    updateVisitStatus
} = require('../controllers/userController');
const { protect, restrictTo, isSalesManager } = require('../middleware/userMiddleware');

router.post('/register/superadmin', register);
router.post('/register', protect, restrictTo('Super Admin'), register);

router.post('/login', login);

router.post('/sales-users/create', protect, isSalesManager, createSalesUser);
router.get('/sales-users', protect, isSalesManager, getSalesUsers);

router.post('/customers/create', protect, restrictTo('Sales User'), createCustomer);  // Allow only Sales Users to create customers
router.get('/customers', protect, restrictTo('Super Admin', 'Admin', 'Sales User'), getCustomers); // Allow Sales User to view customers too
router.get('/customers/:userId?', protect, restrictTo('Super Admin', 'Admin', 'Sales Manager', 'Sales User'), getCustomers);
router.get('/sales-performance', protect, restrictTo('Super Admin', 'Admin', 'Sales Manager', 'Sales User'), getSalesPerformance);
router.patch('/customers/:userId/visit-status', protect, restrictTo('Sales User'), updateVisitStatus);


module.exports = router;
