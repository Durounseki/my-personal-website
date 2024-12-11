import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  console.log("children type:", typeof(children));
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
  }, [checkAuthentication]);

  if (isLoading){
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
      return <Navigate to="/users/profile" replace />
  }else{
    return children;
  }

};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;