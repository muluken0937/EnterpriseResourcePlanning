// controllers/propertyController.js
const Property = require('../models/property'); // Assuming you have a Property model

// Add Property
exports.addProperty = async (req, res) => {
    try {
        const newProperty = new Property({
            propertyId: req.body.propertyId,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            location: req.body.location,
            size: req.body.size,
            rooms: req.body.rooms,
            price: req.body.price,
            availabilityStatus: req.body.availabilityStatus,
            createdBy: req.user.id // Assuming you want to keep track of who created the property
        });
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
