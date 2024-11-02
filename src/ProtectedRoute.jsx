// ProtectedRoute.jsx
import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuthentication } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if(!hasRun.current){
        hasRun.current = true;
        const authenticate = async () => {
            try{
                await checkAuthentication();
            }finally{
                setIsLoading(false);
            }
        };
        authenticate();
    }
  }, []);

  if (isLoading){
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
      return children;
  }else{
    return <Navigate to="/users/login" replace />;
  }

};

export default ProtectedRoute;