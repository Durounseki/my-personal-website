import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ResetPassword(){
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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