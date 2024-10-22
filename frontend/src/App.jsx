import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuperAdminRegister from './components/SuperAdminRegister';
import Register from './components/Register'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'; 
import useAuth from './hooks/useAuth'; 
import { Navigate } from 'react-router-dom'; 

const App = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

          <Route path="/register/superadmin" element={<SuperAdminRegister />} />

          <Route path="/register" element={<Register />} /> 

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
