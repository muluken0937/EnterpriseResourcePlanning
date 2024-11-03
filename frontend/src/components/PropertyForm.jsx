import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/PropertyForm.css';

const PropertyForm = ({ isEditing }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [property, setProperty] = useState({
        propertyId: '',
        title: '',
        description: '',
        type: 'Residential',
        location: { address: '', city: '', state: '', zipCode: '' },
        size: '',
        rooms: 0,
        price: '',
        availabilityStatus: 'Available',
        images: []
    });
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            if (isEditing) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:5000/api/properties/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProperty(response.data);
                } catch (error) {
                    setError('Error fetching property details.');
                    console.error("Error fetching property:", error.response || error.message);
                }
            }
        };
        fetchPropertyDetail();
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({
            ...prev,
            location: { ...prev.location, [name]: value },
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update file state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const formData = new FormData();
        // Append the property fields to the formData
        formData.append('propertyId', property.propertyId);
        formData.append('title', property.title);
        formData.append('description', property.description);
        formData.append('type', property.type);
        formData.append('location[address]', property.location.address);
        formData.append('location[city]', property.location.city);
        formData.append('location[state]', property.location.state);
        formData.append('location[zipCode]', property.location.zipCode);
        formData.append('size', property.size);
        formData.append('rooms', property.rooms);
        formData.append('price', property.price);
        formData.append('availabilityStatus', property.availabilityStatus);
        
        // Append the image file correctly
        if (file) {
            formData.append('image', file); // Ensure the field name matches what the backend expects
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/properties/${id}`, formData, { headers });
                console.log("Property updated successfully");
            } else {
                await axios.post('http://localhost:5000/api/properties/add', formData, { headers });
                console.log("Property added successfully");
            }
            navigate('/properties'); // Redirect to properties list
        } catch (error) {
            setError('Error saving property. Please try again.');
            console.error("Error saving property:", error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <div className="property-form-container">
            <h1>{isEditing ? 'Edit Property' : 'Add Property'}</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                {!isEditing && (
                    <input
                        type="text"
                        name="propertyId"
                        placeholder="Property ID"
                        value={property.propertyId}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={property.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={property.description}
                    onChange={handleChange}
                    required
                />
                <select name="type" value={property.type} onChange={handleChange} required>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>

                <h3>Location</h3>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={property.location.address}
                    onChange={handleLocationChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={property.location.city}
                    onChange={handleLocationChange}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={property.location.state}
                    onChange={handleLocationChange}
                    required
                />
                <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={property.location.zipCode}
                    onChange={handleLocationChange}
                    required
                />
                
                <input
                    type="number"
                    name="size"
                    placeholder="Size (sq ft)"
                    value={property.size}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="rooms"
                    placeholder="Number of Rooms"
                    value={property.rooms}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={property.price}
                    onChange={handleChange}
                    required
                />
                <select
                    name="availabilityStatus"
                    value={property.availabilityStatus}
                    onChange={handleChange}
                    required
                >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                </select>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required={!isEditing}
                />
                
                <button type="submit">{isEditing ? 'Update Property' : 'Add Property'}</button>
            </form>
        </div>
    );
};

export default PropertyForm;
