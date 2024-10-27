const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Protect middleware: ensures the user is authenticated
exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user data to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token failed, not authorized' });
    }
};

// RestrictTo middleware: restricts access based on roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

// isSalesManager middleware: specific for Sales Manager actions
exports.isSalesManager = (req, res, next) => {
    if (req.user.role !== 'Sales Manager') {
        return res.status(403).json({ message: 'Access denied. Only Sales Managers can perform this action.' });
    }
    next();
};

// isCustomer middleware (Optional): in case specific routes are exclusive to Customers
exports.isCustomer = (req, res, next) => {
    if (req.user.role !== 'Customer') {
        return res.status(403).json({ message: 'Access denied. Only Customers can perform this action.' });
    }
    next();
};
