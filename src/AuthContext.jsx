import { createContext, useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';
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
    const [alertMessage, setAlertMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();

    const handleDeleteMessage = () => {
        setAlertMessage('');
        setMessageType('');
    }
    
    const checkAuthentication = async () =>{
        try{
            const response = await api.get('/api/users/checkAuth');
            if(response.status === 200){
                setIsAuthenticated(true);
                setUserId(response.data);
            }else{
                setIsAuthenticated(false);
                setUserId(null)
            }
        }catch(error){
            console.error("Authentication check failed:", error);
            setIsAuthenticated(false);
            setUserId(null);
        }
    };

    const signup = async (credentials) => {
        try{
            const response = await api.post('/api/users/signup', credentials);
            if(response.status === 200){
                navigate('/users/login');
            }
        }catch(error){
            console.error("Signup failed:", error);
            throw error;
        }
    };

    const login = async(credentials) => {
        setAlertMessage('');
        setMessageType('');
        try{
            const response = await api.post('/api/users/login', credentials);
            if(response.status === 200){
                setAlertMessage("Login successful!");
                setMessageType("success");
                navigate('/users/profile');
            }
        }catch(error){
            if( 400 <= error.response.status < 500){
                setAlertMessage("Invalid email or password.")
                setMessageType("warning");
            }else{
                setAlertMessage("An unexpected error occurred, please try again.")
                setMessageType("fail");
            }
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

    const updateUser = async (userId, data) => { 
        try {
            console.log("sending data");
            console.log("route:", `/api/users/${userId}`)
            const response = await api.put(`/api/users/${userId}`, data);
            if (response.status === 200) {
                console.log("User updated successfully"); 
                return response.data;
            }
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    };

    const deleteAccount = async (userId,data) => {
        try {
            console.log("deleting user data:",data);
            const response = await api.delete(`/api/users/${userId}`,{data});
            if (response.status === 200) {
                console.log("Account deleted successfully");
                setIsAuthenticated(false);
                setUserId(null);
                navigate('/users/login');
            }
        } catch (error) {
            console.error("Failed to delete account:", error);
            throw error; 
        }
    };


    const contextValue = {
        isAuthenticated,
        userId,
        checkAuthentication,
        signup,
        login,
        logout,
        updateUser,
        deleteAccount
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
            {alertMessage !== '' && (
                <AlertMessage
                    message={alertMessage}
                    type={messageType}
                    onDeleteMessage={handleDeleteMessage}
                />
            ) }
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}