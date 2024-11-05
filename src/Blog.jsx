import { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

import './Blog.css';

function Blog(){
    const { isAuthenticated, isAdmin, checkAuthentication } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const hasRun = useRef(false);
    const location = useLocation().pathname;

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

    if(location.pathname === '/blog/create'){
        if(isAuthenticated && isAdmin){
            return <Outlet/>
        }else{
            return <Navigate to='/blog' replace />
        }
    }else{
        return <Outlet context={{isAuthenticated, isAdmin}}/>
    }
}

export default Blog;