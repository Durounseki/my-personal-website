import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from './AlertMessage.jsx';

import axios from 'axios';
import './Login.css'

const apiRootUrl = "http://localhost:8080";

const api = axios.create({
    baseURL: apiRootUrl,
    withCredentials: true,
});

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleDeleteMessage = () => {
        setMessage('');
        setMessageType('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try{
            const response = await api.post("/api/users/login", {
                email,
                password,
                rememberMe
            });
            console.log(response);
            if(response.status === 200){
                setMessage("Login successful!");
                setMessageType("success");
                setIsAuthenticated(true);
            }else{
                setMessage("Invalid email or password.");
                setMessageType("warning");
            }
        }catch(error){
            if( 400 <= error.response.status < 500){
                setMessage("Invalid email or password.")
                setMessageType("fail");
            }else{
                setMessage("An unexpected error occurred, please try again.")
                setMessageType("fail");
            }
        }
    }

    const handleProfileGet = async () => {
        if(isAuthenticated){
            try {
                const response = await api.get("/profile");
                if (response) { 
                    console.log("Profile GET response:", response.data);
                } else {
                    console.log("Profile GET: Unauthorized"); // Or handle it differently
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access:", error.response.data); 
                } else {
                    console.error("Profile GET error:", error);
                }
            }
        }else{
            console.log("Not authenticated. Skipping /profile request");
        }
    };
    
      const handleRefreshPost = async () => {
        if(isAuthenticated){
            try {
                const response = await api.post("/api/users/refresh");
                console.log("Refresh POST response:", response.data);
            } catch (error) {
                console.error("Refresh POST error:", error);
            }
        }else{
            console.log("Not authenticated. Skipping /profile request");
        }
      };
    
      const handleLogoutPost = async () => {
        if(isAuthenticated){

            try {
                const response = await api.post("/api/users/logout");
                console.log("Logout POST response:", response.data);
                setIsAuthenticated(false);
            } catch (error) {
                console.error("Logout POST error:", error);
            }
        }else{
            console.log("Not authenticated. Skipping /profile request");
        }
      };

    const handleGithubSubmit = (event) => {
        event.preventDefault();
    }
    const handleGoogleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <AlertMessage message={message} type={messageType} onDeleteMessage={handleDeleteMessage}/>
            <div className="login-form-container">
                <h1>Welcome back</h1>
                <p>Log in to your account to continue.</p>

                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                id="email-confirm"
                                name="email-confirm"
                                autoComplete="off"
                                style={{visibility: 'hidden', position: 'absolute'}}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                required
                            />
                            <div className="forgot-or-remember">
                                <label htmlFor="remember-me">
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember me
                                </label>
                                <Link to="/users/reset-password">Forgot password</Link>
                            </div>
                        </div>
                        <button type="submit" className="submit-user">Log in</button>
                    </form>
                    <div className="form-separator">
                        <p>Or continue with</p>
                    </div>
                    <div className="social-login">
                        <form onSubmit={handleGithubSubmit}>
                            <button><i className='fa-brands fa-github'></i></button>
                        </form>
                        <form onSubmit={handleGoogleSubmit}>
                            <button><i className='fa-brands fa-google'></i></button>
                        </form>
                    </div>
                    <div>
                            <button onClick={handleProfileGet}>GET /profile</button>
                            <button onClick={handleRefreshPost}>POST /api/users/refresh</button>
                            <button onClick={handleLogoutPost}>POST /api/users/logout</button>
                        </div>

                </div>
                <p>Don't have an account? <Link to="/users/signup">Sign up</Link></p>
            </div>
        </>
    )
}

export default Login;