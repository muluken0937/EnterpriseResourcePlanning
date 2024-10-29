// SalesPerformance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/SalesPerformance.css';

const SalesPerformance = () => {
    const [salesPerformance, setSalesPerformance] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/sales-performance', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSalesPerformance(response.data);
                setError(null);
            } catch (error) {
                setError('Error fetching sales performance');
                console.error(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformance();
    }, []);

    const handleUserClick = async (userId) => {
        setSelectedCustomer(null);
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/users/customers/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(response.data);
            setSelectedUser(userId);
            if (response.data.length === 0) {
                setError('No customers found for this user.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('No customers found for this user.');
            } else {
                setError('Error fetching customers for selected user');
                console.error(error.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setError(null);
    };

    return (
        <div className="sales-container">
            <h2 className="sales-header">Sales Performance</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Sales User List */}
            <div className="sales-user-grid">
                {salesPerformance.map((user) => (
                    <div 
                        key={user._id} 
                        onClick={() => handleUserClick(user._id)}
                        className={`sales-user-card ${selectedUser === user._id ? 'active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleUserClick(user._id); }}
                    >
                        <h3 className="sales-user-name">{user.username}</h3>
                        <p className="sales-user-email">{user.email}</p>
                        <p className="sales-user-count">Customers: {user.customerCount}</p>
                    </div>
                ))}
            </div>

            {/* Customer List for Selected User */}
            {selectedUser && !loading && !error && (
                <div className="customer-details-section">
                    <div className="customer-list">
                        <h3 className="customer-list-header">Customer List</h3>
                        {customers.length > 0 ? (
                            <ul className="customer-list-ul">
                                {customers.map((customer) => (
                                    <li 
                                        key={customer._id} 
                                        onClick={() => handleCustomerClick(customer)}
                                        className={`customer-list-item ${selectedCustomer === customer ? 'active' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={(e) => { if (e.key === 'Enter') handleCustomerClick(customer); }}
                                    >
                                        {customer.username}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-customers">No customers found for this user.</p>
                        )}
                    </div>

                    {/* Selected Customer Details */}
                    {selectedCustomer && (
                        <div className="selected-customer-details">
                            <h3>Customer Details</h3>
                            <p><strong>Username:</strong> {selectedCustomer.username}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
                            <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p>
                            <p><strong>Description:</strong> {selectedCustomer.description}</p>
                            <p><strong>Location:</strong> {selectedCustomer.location}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalesPerformance;
