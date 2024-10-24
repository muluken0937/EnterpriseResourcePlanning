// middleware/salesMiddleware.js
const jwt = require('jsonwebtoken');

const isSalesManager = (req, res, next) => {
    // Ensure there's a token in the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from the 'Bearer' string

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the role is Sales Manager
        if (decoded.role !== 'Sales Manager') {
            return res.status(403).json({ message: 'Access denied. Only Sales Managers can perform this action.' });
        }

        // Set the user info in the request (req.user)
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
};

module.exports = { isSalesManager };
