

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Admin' // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('User registered successfully!'); 
      setError(''); 
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1000); 
    } catch (error) {
      setError(error.response?.data.message || 'Registration failed');
      setSuccess(''); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register New User</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>} {/* Success message */}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Admin">Admin</option>
              <option value="Sales Manager">Sales Manager</option>
            </select>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
