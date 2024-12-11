import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from './AuthContext';
import './Login.css';
import * as validators from './validators.js';

function Login(){
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailMessage('');
        setPasswordMessage('');
        const emailError = validators.validateEmail(email);
        const passwordError = validators.validatePassword(password);

        if(emailError || passwordError){
            setEmailMessage(emailError ? emailError : "");
            setPasswordMessage(passwordError ? passwordError : "");
            return;
        }else{
            try{
                const data = {}
                for(const [key, value] of new FormData(event.target)){
                    data[key] = value;
                }
                console.log("data:", data);
                await login(data);
            }catch(error){
                console.error('Failed to log in:', error);
            }
        }
    }

    // const handleGithubSubmit = (event) => {
    //     event.preventDefault();
    // }
    // const handleGoogleSubmit = (event) => {
    //     event.preventDefault();
    // }
    return (
        <>
            <div className="login-form-container">
                <h1>Welcome back</h1>
                <p>Log in to your account to continue.</p>

                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                className={emailMessage === "" ? "" : "input-error"}
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                            />
                            <p className='input-message'>
                                {emailMessage}
                            </p>
                            <input
                                type="email"
                                id="email-confirm"
                                name="email-confirm"
                                autoComplete="off"
                                style={{visibility: 'hidden', position: 'absolute'}}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                className={passwordMessage === "" ? "" : "input-error"}
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                required
                            />
                            <p className='input-message'>
                                {passwordMessage}
                            </p>
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
                    {/* <div className="form-separator">
                        <p>Or continue with</p>
                    </div> */}
                    {/* <div className="social-login">
                        <form onSubmit={handleGithubSubmit}>
                            <button><i className='fa-brands fa-github'></i></button>
                        </form>
                        <form onSubmit={handleGoogleSubmit}>
                            <button><i className='fa-brands fa-google'></i></button>
                        </form>
                    </div> */}

                </div>
                <p>Don&apos;t have an account? <Link to="/users/signup">Sign up</Link></p>
            </div>
        </>
    )
}

export default Login;