import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SuperAdminRegister from './components/SuperAdminRegister';
import Register from './components/Register'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'; 
import useAuth from './hooks/useAuth'; 
import { Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  const { isAuthenticated, userRole } = useAuth(); // Assuming useAuth provides userRole
  const location = useLocation(); // Get the current location

  // Check if the current path is one where you want to show the Navbar
  const showNavbar = location.pathname === '/' || location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

        {/* Protect the registration routes */}
        <Route 
          path="/register/superadmin" 
          element={isAuthenticated && userRole === 'Super Admin' ? <SuperAdminRegister /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated && userRole === 'Super Admin' ? <Register /> : <Navigate to="/login" />} 
        /> 

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
};

// Wrap App component with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
