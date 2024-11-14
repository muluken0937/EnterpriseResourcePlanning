
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const propertyRoutes = require('./routes/propertyRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const financeRoutes = require('./routes/financeRoutes');
const cors = require('cors');

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'config/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', financeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
