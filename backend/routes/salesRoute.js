// routes/salesRoute.js
const express = require('express');
const { isSalesManager } = require('../middleware/salesMiddleware'); // Ensure this path is correct
const SalesUser = require('../models/salesUser');

const router = express.Router();

// Create Sales User route
router.post('/create', isSalesManager, async (req, res) => {
    const { username, email, password } = req.body;
    const createdBy = req.user.id; // Get the Sales Manager's ID from the token

    try {
        // Create a new Sales User
        const newSalesUser = new SalesUser({
            username,
            email,
            password,
            createdBy,
        });

        // Save the new user to the database
        await newSalesUser.save();

        return res.status(201).json({ message: 'Sales User created successfully!' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Get All Sales Users route
router.get('/', isSalesManager, async (req, res) => {
    try {
        const salesUsers = await SalesUser.find().populate('createdBy', 'username email'); // Populate with creator details if necessary
        return res.status(200).json(salesUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
