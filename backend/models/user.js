//models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Super Admin', 'Admin', 'Sales Manager', 'Sales User', 'Customer'], 
        default: 'Customer' 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: function() { return this.role !== 'Super Admin'; }  // Required for all except Super Admin
    },
    propertiesAssigned: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Property' 
    }]  
});

module.exports = mongoose.model('User', userSchema);
