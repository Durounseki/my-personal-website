import { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext.jsx';
import * as validators from './validators.js';
import './Profile.css';

const useUserInfo = (userId) => {
    console.log("2: fetching data");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";
    const hasFetched = useRef(false);

    useEffect(() => {
        if(userId && !hasFetched.current){
            hasFetched.current = true;
            fetch(`${apiRootUrl}/api/users/${userId}`, {mode: "cors"})
            .then((response) => {
                if (response.status >= 400) {
                    console.log("something went bad");
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                console.log("data:", data);
                setUser(data)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        }
    },[]);
    
    return {user, loading, error};
}

function Profile() {
  const { userId } = useAuth();
  console.log("1",userId);
  const {user, loading, error} = useUserInfo(userId);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [currentPasswordMessage, setCurrentPasswordMessage] = useState('');
  const [newPasswordMessage, setNewPasswordMessage] = useState('');
  const [confirmNewPasswordMessage, setConfirmNewPasswordMessage] = useState('');


  const handleUpdateInfo = async (event) => {
    event.preventDefault();
    setUsernameMessage('');
    setEmailMessage('');
    const usernameError = validators.validateUsername(username);
    const emailError = validators.validateEmail(email);
    
    if(usernameError || emailError){
        setUsernameMessage(usernameError ? usernameError : "");
        setEmailMessage(emailError ? emailError : "");
        return;
    }else{
        console.log(username, email)
    }
  }
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setCurrentPasswordMessage('');
    setNewPasswordMessage('');
    setConfirmNewPasswordMessage('');
    
    const newPasswordError = validators.validatePassword(newPassword);
    const confirmNewPasswordError = validators.validateConfirmPassword(newPassword, confirmNewPassword);
    if(newPasswordError || confirmNewPasswordError){
        setNewPasswordMessage(newPasswordError ? newPasswordError : "");
        setConfirmNewPasswordMessage(confirmNewPasswordError ? confirmNewPasswordError : "");
        return;
    }else{
        console.log(currentPassword, newPassword, confirmNewPassword)
    }
  }
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    console.log("Account deleted")
  }

  useEffect(() =>{
    if(user){
        setUsername(user.username === null ? "" : user.username);
        setEmail(user.email);
    }
  },[user]);

  if(error){
    return <p>A network error was encountered</p>
}
  
  if(loading){
    console.log("Loading")
    return <p>Loading...</p>
}else{

    // console.log("user profile", user)
    // console.log("errors: ", usernameMessage, emailMessage)
    // console.log("errors: ", newPasswordMessage, confirmNewPasswordMessage)
return (
<div className="profile-container">
    <div className="profile-form">
        <h2>General</h2>
        <form onSubmit={handleUpdateInfo}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    className={usernameMessage === "" ? "" : "input-error"}
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <p className='input-message'>
                    {usernameMessage}
                </p>
                <label htmlFor="email">Email:</label>
                <input
                    className={emailMessage === "" ? "" : "input-error"}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
            </div>
            <button type="submit" className="submit-user">Save</button>
        </form>
    </div>
    <div className="profile-form">
        <h2>Security</h2>
        <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
                <label htmlFor="current-password">Current Password:</label>
                <input
                    className={currentPasswordMessage === "" ? "" : "input-error"}
                    type="password"
                    id="`current-password"
                    name="current-password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <p className='input-message'>
                    {currentPasswordMessage}
                </p>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    autoComplete="off"
                    style={{visibility: 'hidden', position: 'absolute'}}
                />
                <label htmlFor="new-password">New Password:</label>
                <input
                    className={newPasswordMessage === "" ? "" : "input-error"}
                    type="password"
                    id="new-password"
                    name="new-password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <p className='input-message'>
                    {newPasswordMessage}
                </p>
                <label htmlFor="confirm-new-password">Confirm new password:</label>
                <input
                    className={confirmNewPasswordMessage === "" ? "" : "input-error"}
                    type="password"
                    id="confirm-new-password"
                    name="confirm-new-password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    required
                />
                <p className='input-message'>
                    {confirmNewPasswordMessage}
                </p>
            </div>
            <button type="submit" className="submit-user">Save</button>
        </form>
    </div>
    <div className="profile-form">
        <div>
            <h2>Delete your account</h2>
            <div className='warning'>
                <i className="fa-solid fa-circle-exclamation"></i><p>This operation can't be undone</p>
            </div>
        </div>
        <form onSubmit={handleDeleteAccount}>
            <input
                type="text"
                id="username-confirm"
                name="username-confirm"
                autoComplete="off"
                style={{visibility: 'hidden', position: 'absolute'}}
            />
            <button type="submit" className="submit-user">Delete</button>
        </form>
    </div>
</div>
)
}
}

export default Profile;