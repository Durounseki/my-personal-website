import { createContext, useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const apiRootUrl = "http://localhost:8080";

const api = axios.create({
    baseURL: apiRootUrl,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async error => {
        // console.log("error:", error.response.status)
        const originalRequest = error.config;
        // console.log("retried:", originalRequest._retry)
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            // console.log("retried:", originalRequest._retry)
            try{
                // console.log("trying to refresh");
                const response = await api.post('/api/users/refresh');
                // console.log("refresh successful");
                return api(originalRequest);
            }catch(refreshError){
                console.error('Invalid token', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    
    const checkAuthentication = async () =>{
        try{
            console.log("authenticating");
            const response = await api.get('/api/users/checkAuth');
            if(response.status === 200){
                console.log("authenticated");
                setIsAuthenticated(true);
                setUserId(response.data);
                console.log("response:", response.data);
            }else{
                console.log("something went wrong")
                setIsAuthenticated(false);
                setUserId(null)
            }
        }catch(error){
            console.error("Authentication check failed:", error);
            setIsAuthenticated(false);
            setUserId(null);
        }
    };

    const login = async(credentials) => {
        try{
            const response = await api.post('/api/users/login', credentials);
            if(response.status === 200){
                navigate('/users/profile');
            }
        }catch(error){
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/users/logout');
            setIsAuthenticated(false);
            setUserId(null);
            navigate('/users/login');
        }catch(error){
            console.error("Logout failed:", error);
            throw error;
        }
    };

    const contextValue = {
        isAuthenticated,
        userId,
        checkAuthentication,
        login,
        logout
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}