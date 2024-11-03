const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyId: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Residential', 'Commercial'],
        required: true,
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        }
    },
    size: {
        type: Number, // Square footage or unit area
        required: true,
    },
    rooms: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Under Offer', 'Sold', 'Leased'],
        default: 'Available',
    },
    assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Linking to Sales User
        required: false,
    },
    inspectionDates: [Date], // Optional: Array of scheduled inspection dates
    maintenanceLogs: [{
        date: Date,
        description: String,
    }],
    documents: [{
        documentType: String, // e.g., Ownership, Inspection, Contract
        documentUrl: String,
    }],
    images: [{
        imageUrl: String, // URL of the uploaded image
        description: String, // Optional description for each image
    }],
}, 
{ timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
