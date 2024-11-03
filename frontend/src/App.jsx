import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SuperAdminRegister from './components/SuperAdminRegister';
import SalesUserForm from './components/SalesUserForm';
import CustomerRegister from './components/CustomerRegister';
import SalesPerformance from './components/SalesPerformance';
import PropertyList from './components/PropertyList';  
import PropertyDetail from './components/PropertyDetail'; 
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import PropertyForm from './components/PropertyForm';
function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const userRole = localStorage.getItem('role');

  return (
    <Router>
      {window.location.pathname !== '/login' && 
       window.location.pathname !== '/superadmin/register' && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/register" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PrivateRoute>
          } 
        />
        
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />

        <Route 
          path="/sales-users/create" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales Manager">
              <SalesUserForm />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/customers/register" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales User">
              <CustomerRegister />
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

        <Route 
          path="/sales-performance" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole={["Super Admin", "Admin", "Sales Manager", "Sales User"]}>
              <SalesPerformance />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/properties"  
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PropertyList />
            </PrivateRoute>
          } 
        /> 
        <Route 
        path="/properties/add" 
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <PropertyForm />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/properties/edit/:id" 
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <PropertyForm isEditing={true} />
          </PrivateRoute>
        } 
      />
        <Route 
          path="/properties/:id" // Route for PropertyDetail
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PropertyDetail />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
