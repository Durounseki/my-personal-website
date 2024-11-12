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
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const response = await api.post('/api/users/refresh');
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
    const [isAdmin, setIsAdmin] = useState(false);
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
                setUserId(response.data.id);
                setIsAdmin(response.data.isAdmin);
            }else{
                setIsAuthenticated(false);
                setUserId(null);
                setIsAdmin(false);
            }
        }catch(error){
            console.error("Authentication check failed:", error);
            setIsAuthenticated(false);
            setUserId(null);
            setIsAdmin(false);
        }
    };

    const signup = async (credentials) => {
        setAlertMessage('');
        setMessageType('');
        try{
            const response = await api.post('/api/users/signup', credentials);
            if(response.status === 201){
                setAlertMessage("Account created!");
                setMessageType("success");
                navigate('/users/profile');
            }
        }catch(error){
            if(error.response.status === 400){
                setAlertMessage("Email already registered.")
                setMessageType("warning");
            }else{
                setAlertMessage("An unexpected error occurred, please try again.")
                setMessageType("fail");
            }
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
        setAlertMessage('');
        setMessageType('');
        try {
            await api.post('/api/users/logout');
            setIsAuthenticated(false);
            setUserId(null);
            setAlertMessage('Logout successful!');
            setMessageType('success');
            navigate('/users/login');
        }catch(error){
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
        }
    };

    const updateUser = async (userId, data) => { 
        setAlertMessage('');
        setMessageType('');
        try {
            const response = await api.put(`/api/users/${userId}`, data);
            if (response.status === 200) {
                setAlertMessage('Account updated');
                setMessageType('success');
                return response.data;
            }
        } catch (error) {
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
        }
    };

    const deleteAccount = async (userId,data) => {
        setAlertMessage('')
        setMessageType('');
        try {
            const response = await api.delete(`/api/users/${userId}`,{data});
            if (response.status === 200) {
                setIsAuthenticated(false);
                setUserId(null);
                setAlertMessage('Account deleted.')
                setMessageType('success');
                navigate('/users/login');
            }
        } catch (error) {
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
        }
    };

    // const createPost = async (postId data, willClose) => {
    //     setAlertMessage('')
    //     setMessageType('');
    //     try{
    //         const response = await api.post(`/api/blog/posts`,{data});
    //         if(response.status === 200){
    //             setAlertMessage('Post created.')
    //             setMessageType('success');
    //             if(willClose){
    //                 navigate('/blog');
    //             }
    //         }
    //         console.log("post created",response.data.postId);
    //         return response.data.postId;
    //     }catch (error){
    //         setAlertMessage("An unexpected error occurred, please try again.")
    //         setMessageType("fail");
    //     }
    // }

    const savePost = async (postId, data, willClose) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.post(`/api/blog/posts/${postId}`,{data: data});
            if(response.status === 200){
                setAlertMessage('Post saved.')
                setMessageType('success');
                if(willClose){
                    navigate('/blog');
                }
            }
            console.log("post created",response);
        }catch (error){
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
        }
    }

    const deletePost = async (postId) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.delete(`/api/blog/posts/${postId}`);
            if(response.status === 200){
                setAlertMessage('Post deleted.')
                setMessageType('success');
            }
            console.log("post deleted",response);
            return true;
        }catch (error){
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
            return false;
        }
    }


    const contextValue = {
        isAuthenticated,
        userId,
        isAdmin,
        checkAuthentication,
        signup,
        login,
        logout,
        updateUser,
        deleteAccount,
        savePost,
        deletePost
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