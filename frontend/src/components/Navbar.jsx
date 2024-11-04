import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/image.png'; 
import '../CSS/Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login'); // Redirect to login page after logout
    };

    if (['/login', '/register', '/superadmin/register'].includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    <Link to="/dashboard" className="navbar-dashboard-link">Dashboard</Link>
                </div>
                <div>
                    {userRole === 'Super Admin' && (
                        <Link to="/register" className="navbar-link">Register</Link> 
                    )}
                    {userRole === 'Sales Manager' && (
                        <Link to="/sales-users/create" className="navbar-link">Create Sales User</Link>
                    )}
                    {userRole === 'Sales User' && (
                        <Link to="/customers/register" className="navbar-link">Register Customer</Link> 
                    )}
                    {(userRole === 'Super Admin' || userRole === 'Admin' || userRole === 'Sales Manager' || userRole === 'Sales User') && (
                        <Link to="/sales-performance" className="navbar-link">Sales Performance</Link>
                    )}
                    <button onClick={handleLogout} className="navbar-button">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;