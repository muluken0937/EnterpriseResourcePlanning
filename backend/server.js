// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const salesRoutes = require('./routes/salesRoute'); // Import Sales Routes
const cors = require('cors'); // Import CORS

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/sales-users', salesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
