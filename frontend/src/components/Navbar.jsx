import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login'); // Redirect to login page after logout
    };

    // Exclude Navbar for certain paths
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/superadmin/register') {
        return null;
    }

    return (
        <nav className="bg-blue-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-white text-lg font-bold">Dashboard</Link>
                <div>
                    {userRole === 'Super Admin' && (
                        <Link to="/register" className="text-white mr-4">Register</Link> // Super Admin can see the Register link
                    )}
                    {userRole === 'Sales Manager' && (
                        <Link to="/sales-users/create" className="text-white mr-4">Create Sales User</Link> // Sales Manager can see the Create Sales User link
                    )}
                    <button onClick={handleLogout} className="text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
