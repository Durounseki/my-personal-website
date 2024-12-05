import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as validators from './validators.js';
import {useAuth} from './AuthContext';

function ResetPassword(){
    const {resetPassword} = useAuth();
    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailMessage('');
        const emailError = validators.validateEmail(email);
        if(emailError){
            setEmailMessage(emailError ? emailError : "");
        }else{
            try{
                const data = {}
                for(const [key, value] of new FormData(event.target)){
                    data[key] = value;
                }
                await resetPassword(data);
            }catch(error){
                console.error("Failed to send password reset email:",error);
            }
        }
    }

    return (
        <>
            <div className="login-form-container">
                <h1>Forgot your password?</h1>

                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                autoComplete="off"
                                style={{visibility: 'hidden', position: 'absolute'}}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-user">Send reset link</button>
                    </form>
                </div>
                <p>Here by mistake? <Link to="/users/login">Back</Link></p>
            </div>
        </>
    )
}

export default ResetPassword;