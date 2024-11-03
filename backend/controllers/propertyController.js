const Property = require('../models/property');
const path = require('path');

exports.addProperty = async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

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
            createdBy: req.user.id,
            images: imageUrl ? [{ imageUrl }] : []
        });

        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        console.error("Error saving property:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (req.file) {
            const imageUrl = `/uploads/${req.file.filename}`;
            property.images = [{ imageUrl }];
        }

        Object.assign(property, req.body);
        const updatedProperty = await property.save();
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
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
