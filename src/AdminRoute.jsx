// ProtectedRoute.jsx
import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, checkAuthentication } = useAuth();
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
  }, [checkAuthentication]);

  if (isLoading){
    return <div>Loading...</div>
  }

  if (isAuthenticated && isAdmin) {
      return children;
  }else{
    return <Navigate to="/blog" replace />;
  }

};

export default AdminRoute;