import { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from './Auth/AuthRoute/useAuth';

import './Blog.css';

function Blog(){
    const { isAuthenticated, isAdmin, checkAuthentication, csrfToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const hasRun = useRef(false);
    const location = useLocation().pathname;
    console.log(location);

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

    if(location === '/blog/create'){
        if(isAuthenticated && isAdmin){
            return <Outlet context={{csrfToken}}/>
        }else{
            return <Navigate to='/blog' replace />
        }
    }else{
        return <Outlet context={{isAuthenticated, isAdmin, csrfToken}}/>
    }
}

export default Blog;