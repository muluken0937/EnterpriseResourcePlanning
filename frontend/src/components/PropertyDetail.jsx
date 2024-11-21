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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const userRole = localStorage.getItem('role');
                const response = await axios.get(`http://localhost:5000/api/properties/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
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
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this property? This action cannot be undone.'
        );
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:5000/api/properties/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSuccessMessage('Property deleted successfully!');
            } catch (error) {
                setError('Error deleting property. Please try again later.');
                console.error("Error deleting property:", error.response || error.message);
            }
        }
    };

    const handleUpdate = () => {
        navigate(`/properties/edit/${id}`);
    };

    const handleNavigateToInvoices = () => {
        navigate(`/invoices/create`, {
            state: {
                propertyId: property._id,
                price: property.price,
            },
        });
    };
    
    

    const handleSuccessConfirm = () => {
        navigate('/properties');
    };

    const encodeImageUrl = (url) => {
        return url.replace('(', '%28').replace(')', '%29');
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

    const imageUrl = property.images?.[0]?.imageUrl
        ? `http://localhost:5000${encodeImageUrl(property.images[0].imageUrl)}`
        : '';

    return (
        <div
            className="property-detail-container"
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl}?timestamp=${new Date().getTime()})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
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

                    {property.inspectionDates?.length > 0 && (
                        <div>
                            <strong>Inspection Dates:</strong>
                            <ul>
                                {property.inspectionDates.map((date, index) => (
                                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {property.maintenanceLogs?.length > 0 && (
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

                    {isAuthorized && (
                        <div className="button-container">
                            <button onClick={handleUpdate} className="update-button">Update Property</button>
                            <button onClick={handleDelete} className="delete-button">Delete Property</button>
                            <button onClick={handleNavigateToInvoices} className="invoice-button">create Invoices</button>
                        </div>
                    )}
                </div>

                {successMessage && (
                    <div className="success-modal">
                        <div className="modal-content">
                            <p>{successMessage}</p>
                            <button onClick={handleSuccessConfirm} className="success-button">OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetail;
