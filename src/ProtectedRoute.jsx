// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuthentication } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
        checkAuthentication(); // Call checkAuthentication on every render
        setIsLoading(false);
    };
    authenticate();
  }, []);

  if (isLoading){
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  return children;
};

export default ProtectedRoute;