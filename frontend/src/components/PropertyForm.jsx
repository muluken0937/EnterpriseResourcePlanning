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
        images: [],
        documents: [],
    });
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
                    console.error('Error fetching property:', error.response || error.message);
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
        setFiles(Array.from(e.target.files));
    };

    const handleDocumentChange = (e) => {
        setDocuments(Array.from(e.target.files));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
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

        files.forEach((file) => {
            formData.append('images', file);
        });

        documents.forEach((document) => {
            formData.append('documents', document);
        });

        try {
            const headers = { Authorization: `Bearer ${token}` };
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/properties/${id}`, formData, { headers });
                console.log('Property updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/properties/add', formData, { headers });
                console.log('Property added successfully');
            }
            navigate('/properties');
        } catch (error) {
            setError('Error saving property. Please try again.');
            console.error('Error saving property:', error.response ? error.response.data : error.message);
        }
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        setIsModalOpen(true); // Open modal before submission
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };

    return (
        <div className="property-form-container p-8 bg-white rounded shadow-md max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Property' : 'Add Property'}</h1>
            {error && <div className="error-message text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleConfirm} className="space-y-4">
                {!isEditing && (
                    <input
                        type="text"
                        name="propertyId"
                        placeholder="Property ID"
                        value={property.propertyId}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                )}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={property.title}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={property.description}
                    onChange={handleChange}
                    required
                    className="input-field h-24"
                />
                <select
                    name="type"
                    value={property.type}
                    onChange={handleChange}
                    required
                    className="input-field"
                >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>

                <h3 className="font-semibold">Location</h3>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={property.location.address}
                    onChange={handleLocationChange}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={property.location.city}
                    onChange={handleLocationChange}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={property.location.state}
                    onChange={handleLocationChange}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={property.location.zipCode}
                    onChange={handleLocationChange}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    name="size"
                    placeholder="Size (sq ft)"
                    value={property.size}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    name="rooms"
                    placeholder="Number of Rooms"
                    value={property.rooms}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={property.price}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <select
                    name="availabilityStatus"
                    value={property.availabilityStatus}
                    onChange={handleChange}
                    required
                    className="input-field"
                >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                </select>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="input-field"
                    required={!isEditing}
                />

                <input
                    type="file"
                    onChange={handleDocumentChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    multiple
                    className="input-field"
                    required={!isEditing}
                />

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {isEditing ? 'Update Property' : 'Add Property'}
                </button>
            </form>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal bg-white p-6 rounded shadow-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Property Details</h2>
                        <p><strong>Title:</strong> {property.title}</p>
                        <p><strong>Description:</strong> {property.description}</p>
                        <p><strong>Type:</strong> {property.type}</p>
                        <p><strong>Location:</strong> {`${property.location.address}, ${property.location.city}, ${property.location.state}, ${property.location.zipCode}`}</p>
                        <p><strong>Size:</strong> {property.size} sq ft</p>
                        <p><strong>Rooms:</strong> {property.rooms}</p>
                        <p><strong>Price:</strong> ${property.price}</p>
                        <p><strong>Status:</strong> {property.availabilityStatus}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyForm;
