import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/image.png';
import '../CSS/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    if (['/login', '/register', '/superadmin/register'].includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    <NavLink to="/dashboard" className="navbar-dashboard-link">Dashboard</NavLink>
                </div>
                <div className="navbar-links">
                    <NavLink to="/dashboard" className="navbar-link">Home</NavLink>
                    <NavLink to="/About" className="navbar-link">About</NavLink>
                    <NavLink to="/resources" className="navbar-link">Resources</NavLink>
                    <NavLink to="/properties" className="navbar-link">Property List</NavLink>
                    <NavLink to="/contact-us" className="navbar-link">Contact Us</NavLink>


                    <div className="navbar-dropdown">
                        <button className="navbar-dropdown-toggle flex items-center">
                    
                            More Options
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div className="navbar-dropdown-content">
                            <NavLink to="/dashboard" className="navbar-dropdown-link">Dashboard</NavLink>
                            {userRole && <span className="navbar-dropdown-link">Role: {userRole}</span>}
                            {userRole === 'Super Admin' && (
                                <NavLink to="/register" className="navbar-dropdown-link">Register</NavLink>
                            )}
                            {userRole === 'Sales Manager' && (
                                <NavLink to="/sales-users/create" className="navbar-dropdown-link">Create Sales User</NavLink>
                            )}
                            {userRole === 'Sales User' && (
                                <NavLink to="/customers/register" className="navbar-dropdown-link">Register Customer</NavLink>
                            )}
                            {userRole === 'Sales User' && (
                                <NavLink to="/properties/add" className="navbar-dropdown-link">Add Property</NavLink>
                            )}
                            {(userRole === 'Super Admin' || userRole === 'Admin' || userRole === 'Sales Manager' || userRole === 'Sales User') && (
                                <NavLink to="/sales-performance" className="navbar-dropdown-link">Sales Performance</NavLink>
                            )}
                            <button onClick={handleLogout} className="navbar-dropdown-link logout">Logout</button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
