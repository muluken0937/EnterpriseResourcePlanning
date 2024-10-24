import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SuperAdminRegister from './components/SuperAdminRegister';
import SalesUserForm from './components/SalesUserForm'; // Change import to SalesUserForm
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound'; // Import NotFound component
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Example authentication check
  const userRole = localStorage.getItem('role'); // Get the user role

  return (
    <Router>
      {/* Render Navbar only if not on login or super admin registration pages */}
      {window.location.pathname !== '/login' && 
       window.location.pathname !== '/superadmin/register' && <Navbar />}

      <Routes>
        {/* Add a route for "/" and redirect it to "/login" or any other default page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Restrict access to Register route; only authenticated users can access it */}
        <Route 
          path="/register" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PrivateRoute>
          } 
        />
        
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />

        {/* Update route for creating Sales Users to use SalesUserForm */}
        <Route 
          path="/sales-users/create" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales Manager">
              <SalesUserForm /> {/* Change to SalesUserForm */}
            </PrivateRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        <Route path="*" element={<NotFound />} /> {/* Handle 404 errors */}
      </Routes>
    </Router>
  );
}

export default App;
