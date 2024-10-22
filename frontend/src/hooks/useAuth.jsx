import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token'); 
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth(); 
  }, []);

  return { isAuthenticated };
};

export default useAuth;
