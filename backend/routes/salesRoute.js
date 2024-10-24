// routes/salesRoute.js
const express = require('express');
const router = express.Router();
const SalesUser = require('../models/salesUser');
const { isSalesManager } = require('../middleware/salesMiddleware');

// Route: Create a new Sales User (accessible by Sales Managers only)
router.post('/create', isSalesManager, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Add password hashing here if necessary
        // Example: bcrypt.hash(password, saltRounds)

        const newSalesUser = new SalesUser({
            username,
            email,
            password,
            createdBy: req.user._id  // Sales Manager ID from the middleware
        });

        const savedSalesUser = await newSalesUser.save();
        res.status(201).json(savedSalesUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route: Get all Sales Users created by the Sales Manager
router.get('/', isSalesManager, async (req, res) => {
    try {
        const salesUsers = await SalesUser.find({ createdBy: req.user._id });
        res.status(200).json(salesUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
