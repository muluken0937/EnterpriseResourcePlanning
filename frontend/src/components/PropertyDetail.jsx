import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/PropertyDetail.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const userRole = localStorage.getItem('role');
                const response = await axios.get(`http://localhost:5000/api/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProperty(response.data);
                setIsAuthorized(checkAuthorization(userRole));
            } catch (error) {
                setError('No property found. Please check the ID or your permissions.');
                console.error("Error fetching property detail:", error.response || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetail();
    }, [id]);

    const checkAuthorization = (role) => {
        return ['Super Admin', 'Admin', 'Sales Manager', 'Sales User'].includes(role);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/properties');
        } catch (error) {
            setError('Error deleting property. Please try again later.');
            console.error("Error deleting property:", error.response || error.message);
        }
    };

    const handleUpdate = () => {
        navigate(`/properties/edit/${id}`);
    };

    if (loading) {
        return <div className="loading-message">Loading property details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!property) {
        return <div className="no-property-message">No property details available.</div>;
    }

    return (
        <div className="property-detail-container" style={{ backgroundImage: `url(http://localhost:5000${property.images[0].imageUrl})` }}>
            <div className="property-detail-overlay">
                <h1 className="property-detail-title">{property.title || 'N/A'}</h1>
                <div className="property-detail-info">
                    <p className="property-detail-description">{property.description || 'No description available.'}</p>
                    <p><strong>Type:</strong> {property.type || 'N/A'}</p>
                    <p><strong>Location:</strong> {property.location?.address || 'N/A'}, {property.location?.city || 'N/A'}, {property.location?.state || 'N/A'} {property.location?.zipCode || 'N/A'}</p>
                    <p><strong>Size:</strong> {property.size || 'N/A'} sqft</p>
                    <p><strong>Rooms:</strong> {property.rooms || 'N/A'}</p>
                    <p><strong>Price:</strong> ${property.price || 'N/A'}</p>
                    <p><strong>Status:</strong> {property.availabilityStatus || 'N/A'}</p>
                    {property.assignedAgent && (
                        <p><strong>Assigned Agent:</strong> {property.assignedAgent.name || 'N/A'}</p>
                    )}
                    {property.inspectionDates && property.inspectionDates.length > 0 ? (
                        <div>
                            <strong>Inspection Dates:</strong>
                            <ul>
                                {property.inspectionDates.map((date, index) => (
                                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No scheduled inspection dates available.</p>
                    )}
                    {property.maintenanceLogs && property.maintenanceLogs.length > 0 && (
                        <div>
                            <strong>Maintenance Logs:</strong>
                            <ul>
                                {property.maintenanceLogs.map((log, index) => (
                                    <li key={index}>
                                        {new Date(log.date).toLocaleDateString()}: {log.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {property.documents && property.documents.length > 0 && (
                        <div>
                            <strong>Documents:</strong>
                            <ul>
                                {property.documents.map((doc, index) => (
                                    <li key={index}>
                                        {doc.documentType}: <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {isAuthorized && (
                        <div className="button-container">
                            <button onClick={handleUpdate} className="update-button">Update Property</button>
                            <button onClick={handleDelete} className="delete-button">Delete Property</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
