import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Dashboard</Link>
                <div>
                    <Link to="/register" className="text-white mr-4">Register</Link>
                    <button onClick={handleLogout} className="text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
