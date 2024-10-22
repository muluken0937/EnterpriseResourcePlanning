// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/userMiddleware');


router.post('/register/superadmin', register); 

router.post('/register', protect, restrictTo('Super Admin'), register);

router.post('/login', login);

module.exports = router;
