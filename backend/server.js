// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const cors = require('cors'); // Import CORS

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());  // Middleware to parse JSON bodies

// User routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
