const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const userMiddleware = require('../middleware/userMiddleware');
const upload = require('../config/upload'); 

router.get('/', userMiddleware.protect, propertyController.getAllProperties);
router.get('/:id', userMiddleware.protect, propertyController.getPropertyById);
router.post(
    '/add',
    userMiddleware.protect,
    userMiddleware.restrictTo('Sales User'),
    upload.single('image'), // Single image upload
    propertyController.addProperty
);
router.put(
    '/:id',
    userMiddleware.protect,
    userMiddleware.restrictTo('Super Admin', 'Admin', 'Sales Manager', 'Sales User'),
    upload.single('image'), // Single image upload
    propertyController.updateProperty
);
router.delete(
    '/:id',
    userMiddleware.protect,
    userMiddleware.restrictTo('Super Admin', 'Admin', 'Sales Manager', 'Sales User'),
    propertyController.deleteProperty
);

module.exports = router;
