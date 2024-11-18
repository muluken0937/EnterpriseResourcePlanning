const Property = require('../models/property');
const path = require('path');

exports.addProperty = async (req, res) => { 
    try {
        const imageFiles = req.files['images'] || [];
        const documentFiles = req.files['documents'] || [];

        const images = imageFiles.map(file => ({
            imageUrl: `/uploads/${file.filename}`,
            description: req.body.imageDescriptions || ''
        }));

        const documents = documentFiles.map(file => ({
            documentType: req.body.documentTypes || '',
            documentUrl: `/uploads/${file.filename}`
        }));

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
            images,
            documents
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

        const imageFiles = req.files['images'] || [];
        const documentFiles = req.files['documents'] || [];

        const images = imageFiles.map(file => ({
            imageUrl: `/uploads/${file.filename}`,
            description: req.body.imageDescriptions || ''
        }));
        if (images.length > 0) property.images.push(...images);

        const documents = documentFiles.map(file => ({
            documentType: req.body.documentTypes || '',
            documentUrl: `/uploads/${file.filename}`
        }));
        if (documents.length > 0) property.documents.push(...documents);

        Object.assign(property, req.body);

        const updatedProperty = await property.save();
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        
        
        property.images.forEach((img) => fs.unlinkSync(path.join(__dirname, '../config', img.imageUrl)));
        property.documents.forEach((doc) => fs.unlinkSync(path.join(__dirname, '../config', doc.documentUrl)));
        
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: error.message });
    }
};
