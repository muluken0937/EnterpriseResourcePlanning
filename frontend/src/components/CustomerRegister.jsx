// src/components/CustomerRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');  // Retrieve token from local storage
            await axios.post(
                'http://localhost:5000/api/users/customers/create', 
                { username, email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Customer registered successfully');
            navigate('/dashboard');  // Redirect to dashboard after successful registration
        } catch (error) {
            console.error('Error registering customer:', error.response?.data?.message);
            alert(error.response?.data?.message || 'Failed to register customer');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl mb-4">Register Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Register Customer
                </button>
            </form>
        </div>
    );
};

export default CustomerRegister;
