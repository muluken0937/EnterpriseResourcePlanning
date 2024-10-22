const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        const isSuperAdminRegistration = req.path.includes('superadmin');

        if (isSuperAdminRegistration) {
            req.body.role = 'Super Admin';
        } else {
            const superAdminExists = await User.findOne({ role: 'Super Admin' });

            if (!superAdminExists) {
                req.body.role = 'Super Admin';
            } else if (role && role !== 'Super Admin' && req.user.role !== 'Super Admin') {
                return res.status(403).json({ message: 'Only Super Admin can register Admins or Sales Managers' });
            }
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Save the hashed password
            role: req.body.role
        });

        await newUser.save();
        console.log(`User registered: ${newUser}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            console.log(`User not found with email: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log(`User found: ${user}`);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match status: ${isMatch}`);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};
