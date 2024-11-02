import { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext.jsx';
import './Profile.css';

const useUserInfo = (userId) => {
    console.log("fetching data");
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
                console.log("something went bad");
                if (response.status >= 400) {
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
    },[userId]);
    
    return {user, loading, error};
}

function Profile() {
  const { userId } = useAuth();
  console.log(userId);
  const {user, loading, error} = useUserInfo(userId);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleGeneralSubmit = async (event) => {
    event.preventDefault();
    console.log("Info saved")
  }
  const handleSecuritySubmit = async (event) => {
    event.preventDefault();
    console.log("Password changed")
  }
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    console.log("Account deleted")
  }

  useEffect(() =>{
    if(user){
        setUsername(user.username);
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

    console.log("user profile", user)
return (
<div className="profile-container">
    <div className="profile-form">
        <div className="general-info">
            <h2>General</h2>
            <form onSubmit={handleGeneralSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
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
        <div className="security">
            <h2>Security</h2>
            <form onSubmit={handleSecuritySubmit}>
                <div className="form-group">
                    <label htmlFor="current-password">Current Password:</label>
                    <input
                        type="password"
                        id="`current-password"
                        name="current-password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        autoComplete="off"
                        style={{visibility: 'hidden', position: 'absolute'}}
                    />
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="confirm-new-password">Confirm new password:</label>
                    <input
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-user">Save</button>
            </form>
        </div>
        <div className="danger-zone">
            <h2>Delete your account</h2>
            <p>This operation can't be undone</p>
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
</div>
)
}
}

export default Profile;