import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/PropertyList.css';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/properties', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error.response || error.message);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div className="property-list-container">
            <h1 className="property-list-title">Property List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <Link to={`/properties/${property._id}`} key={property._id} className="property-card-link">
                        <div className="property-card">
                            {/* Display the image if available, otherwise show a placeholder */}
                            {property.images.length > 0 ? (
                                <img 
                                    src={`http://localhost:5000${property.images[0].imageUrl}`} 
                                    alt={`${property.title} image`} 
                                    className="property-card-image" 
                                />
                            ) : (
                                <div className="property-card-placeholder">
                                    <span>No Image Available</span>
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="property-card-title">{property.title}</h2>
                                <p className="property-card-text">{property.description}</p>
                                <p className="property-card-details">
                                    <span className="font-bold">Location:</span> {property.location?.city || 'N/A'}, {property.location?.state || 'N/A'}
                                </p>
                                <p className="property-card-details">
                                    <span className="font-bold">Size:</span> {property.size || 'N/A'} sqft
                                </p>
                                <p className="property-card-details">
                                    <span className="font-bold">Price:</span> ${property.price || 'N/A'}
                                </p>
                                <p className="property-card-status">
                                    <span>Status:</span> {property.availabilityStatus || 'Unavailable'}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
