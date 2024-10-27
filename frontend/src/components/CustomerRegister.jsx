// src/components/CustomerRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/users/customers/create', 
                { username, email, password, phoneNumber, description, location },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Customer registered successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error registering customer:', error.response?.data?.message);
            alert(error.response?.data?.message || 'Failed to register customer');
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-md">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Register Customer</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-5">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />
                <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Register Customer
                </button>
            </form>
        </div>
    );
};

export default CustomerRegister;
