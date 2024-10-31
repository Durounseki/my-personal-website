import { useState, useEffect } from 'react';
import './Login.css'
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleGithubSubmit = (event) => {
        event.preventDefault();
    }
    const handleGoogleSubmit = (event) => {
        event.preventDefault();
    }
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
                                required
                            />
                            <a href="/community/forgot-password">Forgot password</a>
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

                </div>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
                <p>By continuing, you agree to the <a href="/terms-of-service" rel="noopener noreferrer" target="_blank">terms of use</a>.</p>
            </div>
        </>
    )
}

export default Login;