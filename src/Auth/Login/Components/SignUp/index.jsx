import { useState} from 'react';
import { Link } from 'react-router-dom';
import * as validators from '../../../utils/validators.js';
import useAuth from '../../../AuthContext/useAuth/index.jsx';

function SignUp(){
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [confirmEmailMessage, setConfirmEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailMessage('');
        setConfirmEmailMessage('');
        setPasswordMessage('');
        setConfirmPasswordMessage('');
        const emailError = validators.validateEmail(email);
        const confirmEmailError = validators.validateConfirmEmail(email,emailConfirm);
        const passwordError = validators.validatePassword(password);
        const confirmPasswordError = validators.validateConfirmPassword(password,passwordConfirm);

        if(emailError || passwordError || confirmPasswordError || confirmEmailError){
            setEmailMessage(emailError ? emailError : "");
            setConfirmEmailMessage(confirmEmailError ? confirmEmailError : "");
            setPasswordMessage(passwordError ? passwordError : "");
            setConfirmPasswordMessage(confirmPasswordError ? confirmPasswordError : "");
            return;
        }else{
            const data = {}
            for(const [key, value] of new FormData(event.target)){
                data[key] = value;
            }
            await signup(data);
        }
    }

    return (
        <>
            <div className="login-form-container">
                <h1>Welcome to my website</h1>
                <p>Create an account to learn more, ask a question or simply say hi.</p>

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
                            <label htmlFor="email-confirm">Confirm Email:</label>
                            <input
                                className={confirmEmailMessage === "" ? "" : "input-error"}
                                type="email"
                                id="email-confirm"
                                name="email-confirm"
                                value={emailConfirm}
                                onChange={(e)=> setEmailConfirm(e.target.value)}
                                required
                            />
                            <p className='input-message'>
                                {confirmEmailMessage}
                            </p>
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
                            <label htmlFor="password-confirm">Confirm Password:</label>
                            <input
                                className={confirmPasswordMessage === "" ? "" : "input-error"}
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                value={passwordConfirm}
                                onChange={(e)=> setPasswordConfirm(e.target.value)}
                                required
                            />
                            <p className='input-message'>
                                {confirmPasswordMessage}
                            </p>

                        </div>
                        <button type="submit" className="submit-user">Sign up</button>
                    </form>
                </div>
                <p>Already have an account? <Link to="/users/login">Log in</Link></p>
                <p>By continuing, you agree to the <a href="/terms-of-service" rel="noopener noreferrer" target="_blank">terms of use</a>.</p>
            </div>
        </>
    )
}

export default SignUp;