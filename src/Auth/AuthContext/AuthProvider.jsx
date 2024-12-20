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
        if(error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/users/login'){
            originalRequest._retry = true;
            try{
                await api.post('/api/users/refresh');
                return api(originalRequest);
            }catch(refreshError){
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
    const [hasLoggedOut,setHasLoggedOut] = useState(false);

    const navigate = useNavigate();

    const handleDeleteMessage = () => {
        setAlertMessage('');
        setMessageType('');
        if(hasLoggedOut){
            setHasLoggedOut(false);
        }
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }
            else{
                if(400 <= error.response.status < 500){
                    if(error.response.data.message){
                        if(!hasLoggedOut){
                            setAlertMessage(error.response.data.message);
                            setMessageType('warning');
                        }
                    }
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.");
                    setMessageType('fail');
                }
            }
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else if(error.response.status === 400){
                    setAlertMessage(error.response.data.message || "Email already in use.");
                    setMessageType("warning");
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.");
                    setMessageType("fail");
                }
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else if(error.response.status === 401){
                    setAlertMessage(error.response.data.message || "Invalid email or password.")
                    setMessageType("warning");
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
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
            setHasLoggedOut(true);
            navigate('/users/login');
        }catch(error){
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                setMessageType("fail");
            }
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else if(error.response.status === 401 || error.response.status === 403){
                    setAlertMessage(error.response.data.message || "Invalid email or password.")
                    setMessageType("warning");
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
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
                setHasLoggedOut(true);
                navigate('/users/login');
            }
        } catch (error) {
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
        }
    };

    const requestResetPassword = async (data) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.post(`/api/users/reset-password`,data);
            if(response.status === 202){
                setAlertMessage('You will receive an email with a link to reset your password.')
                setMessageType('success');
            }
        }catch(error){
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    if(error.response.data.message === 'User account not found'){
                        setAlertMessage("Email not found");
                        setMessageType("warning");
                    }else{
                        const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                        notFoundError.status = error.response.status;
                        throw notFoundError;
                    }
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
        }
    }

    const resetPassword = async (tokenId,data) => {
        setAlertMessage('')
        setMessageType('');
        try{
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else if(error.response.status === 401){
                    setAlertMessage(error.response.data.message || "Invalid reset link. Please request a new one.")
                    setMessageType("fail");
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
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
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
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
        }catch (error){
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
            return false;
        }
    }

    const deletePost = async (postId,token) => {
        setAlertMessage('')
        setMessageType('');
        try{
            const response = await api.delete(`/api/blog/posts/${postId}`,{
                headers: {'X-CSRF-Token': token}
            });
            if(response.status === 200){
                setAlertMessage('Post deleted.')
                setMessageType('success');
            }
            return true;
        }catch (error){
            if(!error.response){
                setAlertMessage('An unexpected network error occurred.');
                setMessageType('fail');
            }else{
                if(error.response.status === 404){
                    const notFoundError = new Error(error.response.data.message || "It seems you got lost!");
                    notFoundError.status = error.response.status;
                    throw notFoundError;
                }else{
                    setAlertMessage(error.response.data.message || "An unexpected error occurred. Please try again.")
                    setMessageType("fail");
                }
            }
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