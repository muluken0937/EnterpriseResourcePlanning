import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    setSuccess(''); 

    const token = localStorage.getItem('token'); 

    // Ensure token exists before making the request
    if (!token) {
      setError('Access denied. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/sales-users/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        }
      );

      // Show success message and navigate after a short delay
      setSuccess('Sales User created successfully!');
      setTimeout(() => {
        navigate('/dashboard'); // Update this to your actual dashboard route
      }, 1000); // Delay in milliseconds (1 second)

      setFormData({ username: '', email: '', password: '' }); // Reset form

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create Sales User');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Sales User</h2>
      {error && <div className="text-red-500 mb-4" aria-live="assertive">{error}</div>}
      {success && <div className="text-green-500 mb-4" aria-live="assertive">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Sales User'}
        </button>
      </form>
    </div>
  );
};

export default SalesUserForm;
