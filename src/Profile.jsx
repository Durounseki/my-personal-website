import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

function Profile() {
  const { userId } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`); // Fetch user data
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username);
          setEmail(userData.email);
          console.log(username);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleGeneralSubmit = (event) => {
    event.preventDefault();
    // Handle saving general information (username, email)
    console.log('General form submitted:', { username, email });
  };

  const handleSecuritySubmit = (event) => {
    event.preventDefault();
    // Handle saving security information (password)
    console.log('Security form submitted:', { currentPassword, newPassword, confirmNewPassword });
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Delete account clicked');
  };

  return (
    <div>
      <h1>Profile</h1>

      {/* General Information */}
      <form onSubmit={handleGeneralSubmit}>
        <h2>General</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <span id="username">{username}</span> {/* Display username */}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <span id="email">{email}</span> {/* Display email */}
        </div>
        <button type="submit">Save</button>
      </form>

      {/* Security Information */}
      <form onSubmit={handleSecuritySubmit}>
        <h2>Security</h2>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {/* Danger Zone */}
      <h2>Danger Zone</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Profile;