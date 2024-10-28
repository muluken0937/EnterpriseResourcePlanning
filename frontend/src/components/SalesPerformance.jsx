// src/components/SalesPerformance.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesPerformance = () => {
    const [salesPerformance, setSalesPerformance] = useState([]);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/sales-performance', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSalesPerformance(response.data);
            } catch (error) {
                console.error('Error fetching sales performance:', error.response?.data?.message);
            }
        };

        fetchPerformance();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl mb-4">Sales User Performance</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Customer Count</th>
                    </tr>
                </thead>
                <tbody>
                    {salesPerformance.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.customerCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesPerformance;
