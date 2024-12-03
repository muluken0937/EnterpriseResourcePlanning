const mongoose = require('mongoose'); 
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register function for Super Admin and Admin
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        const isSuperAdminRegistration = req.path.includes('superadmin');

        // Determine the role of the new user
        if (isSuperAdminRegistration) {
            req.body.role = 'Super Admin';
        } else {
            const superAdminExists = await User.findOne({ role: 'Super Admin' });
            if (!superAdminExists) {
                req.body.role = 'Super Admin';
            } else if (req.user.role !== 'Super Admin') {
                return res.status(403).json({ message: 'Only Super Admin can register Admins or Sales Managers' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: req.body.role,
            ...(req.body.role !== 'Super Admin' && { createdBy: req.user.id })
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role,  userId: user._id  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a Sales User function (for Sales Manager)
exports.createSalesUser = async (req, res) => {
    const { username, email, password } = req.body;
    const createdBy = req.user.id;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSalesUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'Sales User',
            createdBy
        });

        await newSalesUser.save();
        res.status(201).json({ message: 'Sales User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Sales Users
exports.getSalesUsers = async (req, res) => {
    try {
        const salesUsers = await User.find({ role: 'Sales User' }).populate('createdBy', 'username email');
        res.status(200).json(salesUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a Customer function (for Sales User)
exports.createCustomer = async (req, res) => {
    const { username, email, password, phoneNumber, description, location } = req.body;
    const createdBy = req.user.id;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new User({
            username,
            email,
            password: hashedPassword,
            role: 'Customer',
            createdBy,
            phoneNumber,   
            description,    
            location        
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get all Customers or Customers for a specific Sales User
exports.getCustomers = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from route parameters
        let customers;

        if (userId) {
            customers = await User.find({ role: 'Customer', createdBy: userId }).populate('createdBy', 'username email');
            
            if (!customers.length) {
                return res.status(404).json({ message: 'No customers found for this Sales User.' });
            }
        } else {
            customers = await User.find({ role: 'Customer' }).populate('createdBy', 'username email');
            
            if (!customers.length) {
                return res.status(404).json({ message: 'No customers found.' });
            }
        }

        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getSalesPerformance = async (req, res) => {
    try {
        let salesPerformance;

        if (req.user.role === 'Sales User') {
            salesPerformance = await User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.user.id) } },
                {
                    $lookup: {
                        from: 'users',            
                        localField: '_id',        
                        foreignField: 'createdBy', 
                        as: 'customers',          
                    }
                },
                {
                    $project: {
                        username: 1,
                        email: 1,
                        customerCount: { $size: '$customers' },
                    }
                }
            ]);
        } else {
            salesPerformance = await User.aggregate([
                { $match: { role: 'Sales User' } },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'createdBy',
                        as: 'customers',
                    }
                },
                {
                    $project: {
                        username: 1,
                        email: 1,
                        customerCount: { $size: '$customers' },
                    }
                }
            ]);
        }

        res.status(200).json(salesPerformance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateVisitStatus = async (req, res) => {
    const { userId } = req.params;
    const { visitStatus } = req.body;

    try {
        if (!['Visited', 'Not Visited'].includes(visitStatus)) {
            return res.status(400).json({ message: 'Invalid visit status' });
        }

        const user = await User.findById(userId);
        if (!user || user.role !== 'Customer') {
            return res.status(404).json({ message: 'Customer not found' });
        }

        user.visitStatus = visitStatus;
        await user.save();

        res.status(200).json({ message: 'Visit status updated successfully', user });
    } catch (error) {
        console.error('Error updating visit status:', error);
        res.status(500).json({ message: error.message });
    }
};
