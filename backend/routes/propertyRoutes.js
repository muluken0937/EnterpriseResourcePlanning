const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/', userMiddleware.protect, propertyController.getAllProperties);
router.get('/:id', userMiddleware.protect, propertyController.getPropertyById);
router.post('/add', userMiddleware.protect, userMiddleware.restrictTo('Sales User'), propertyController.addProperty);
router.put('/:id', userMiddleware.protect, userMiddleware.restrictTo('Super Admin', 'Admin', 'Sales Manager'), propertyController.updateProperty);
router.delete('/:id', userMiddleware.protect, userMiddleware.restrictTo('Super Admin', 'Admin', 'Sales Manager'), propertyController.deleteProperty);

module.exports = router;
