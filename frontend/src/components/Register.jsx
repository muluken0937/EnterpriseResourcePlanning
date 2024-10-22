import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Sales Manager');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // State for success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:5000/api/users/register', 
                { username, email, password, role }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
            setSuccess('User registered successfully!'); // Set success message
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Registration failed');
            setSuccess(null); // Clear any previous success message
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl mb-6 text-center">Register User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                >
                    <option value="Admin">Admin</option>
                    <option value="Sales Manager">Sales Manager</option>
                </select>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
            </form>
        </div>
    );
}

export default Register;
