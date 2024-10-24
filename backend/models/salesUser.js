const mongoose = require('mongoose');

const salesUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Sales Manager's ID
    propertiesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]   // If you want to associate properties
});

module.exports = mongoose.model('SalesUser', salesUserSchema);
