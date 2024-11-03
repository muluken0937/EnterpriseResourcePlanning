const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token no longer exists' });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token verification failed, not authorized' });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

// Specific Role-Based Middleware (optional, if needing separate middleware for specific roles)
exports.isSalesManager = (req, res, next) => {
    if (req.user.role !== 'Sales Manager') {
        return res.status(403).json({ message: 'Access denied. Only Sales Managers can perform this action.' });
    }
    next();
};

exports.isCustomer = (req, res, next) => {
    if (req.user.role !== 'Customer') {
        return res.status(403).json({ message: 'Access denied. Only Customers can perform this action.' });
    }
    next();
};
