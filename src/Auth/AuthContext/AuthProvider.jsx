import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext.jsx';

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
                await api.post('/api/users/refresh');
                return api(originalRequest);
            }catch(refreshError){
                console.error('Invalid token', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [csrfToken, setCsrfToken] = useState(null);

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
                setCsrfToken(response.data.csrfToken);
            }else{
                setIsAuthenticated(false);
                setUserId(null);
                setIsAdmin(false);
                setCsrfToken(null);
            }
        }catch(error){
            console.error("Authentication check failed:", error);
            setIsAuthenticated(false);
            setUserId(null);
            setIsAdmin(false);
            setCsrfToken(null)
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
            console.log("Error loging out:", error);
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
            console.log("Error updating user:", error);
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
            console.log("Error deleting account:", error);
        }
    };

    const requestResetPassword = async (data) => {
        setAlertMessage('')
        setMessageType('');
        try{
            console.log("sending email",data);
            const response = await api.post(`/api/users/reset-password`,data);
            if(response.status === 202){
                setAlertMessage('You will receive an email with a link to reset your password.')
                setMessageType('success');
            }
        }catch(error){
            console.log("error sending email");
            if(error.response.status === 404){
                if(error.response.data.message === 'User account not found'){
                    setAlertMessage("Email not found");
                    setMessageType("warning");
                }else{
                    console.log("Bot detected!");
                }
            }else{
                setAlertMessage("An unexpected error occurred, please try again.");
                setMessageType("fail");
            }
        }
    }

    const resetPassword = async (tokenId,data) => {
        setAlertMessage('')
        setMessageType('');
        try{
            console.log("resetting password",data);
            const response = await api.post(`/api/users/reset-password/${tokenId}`,data);
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
            console.log("error resetting password");
            if(error.response.status === 404){
                console.log("Bot detected!");
            }else{
                setAlertMessage("An unexpected error occurred, please try again.");
                setMessageType("fail");
            }
        }
    }

    const savePost = async (postId, data, willClose) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.post(`/api/blog/posts/${postId}`,{data: data});
            if(response.status === 200){
                setAlertMessage('Post saved.')
                setMessageType('success');
                if(willClose){
                    localStorage.clear();
                    navigate('/blog');
                }else if(response.data.newPost){
                    localStorage.clear();
                    navigate(`/blog/${response.data.postId}`);
                }
            }
        }catch (error){
            console.error(error);
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
        }
    }

    const publishPost = async (postId,token,published) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.patch(`/api/blog/posts/${postId}`,{_csrf: token, published: published});
            if(response.status === 200){
                published ? setAlertMessage('Post published.') : setAlertMessage('Post ready to edit');
                setMessageType('success');
                navigate('/blog');
                return true;
            }
            console.log("post published",response);
        }catch (error){
            console.error(error);
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
            return false;
        }
    }

    const deletePost = async (postId,token) => {
        setAlertMessage('')
        setMessageType('');
        try{
            console.log("send csrf:",token);
            const response = await api.delete(`/api/blog/posts/${postId}`,{
                headers: {'X-CSRF-Token': token}
            });
            if(response.status === 200){
                setAlertMessage('Post deleted.')
                setMessageType('success');
            }
            console.log("post deleted",response);
            return true;
        }catch (error){
            setAlertMessage("An unexpected error occurred, please try again.")
            setMessageType("fail");
            console.log("Error deleting post:", error);
            return false;
        }
    }


    const contextValue = {
        isAuthenticated,
        userId,
        isAdmin,
        csrfToken,
        checkAuthentication,
        signup,
        login,
        logout,
        updateUser,
        deleteAccount,
        requestResetPassword,
        resetPassword,
        savePost,
        publishPost,
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

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;