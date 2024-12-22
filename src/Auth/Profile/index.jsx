import { useState, useEffect, useRef } from 'react';
import useAuth from '../AuthContext/useAuth';
import * as validators from '../utils/validators.js';
import DOMPurify from "dompurify";
import './style.css';

const useUserInfo = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;
    const hasFetched = useRef(false);

    useEffect(() => {
        if(userId && !hasFetched.current){
            hasFetched.current = true;
            const fetchData = async () => {
                try{
                    const response = await fetch(`${apiRootUrl}/api/users/${userId}`, {mode: "cors"});
                    const data = await response.json();
                    setUser(data);
                }finally{
                    setLoading(false);
                }
            }
            fetchData();
        }
    },[userId]);
    
    return {user, loading};
}

function Profile() {
    const { userId, updateUser, deleteAccount, csrfToken } = useAuth();
    const {user, loading} = useUserInfo(userId);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isDeleteChecked, setIsDeleteChecked] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [currentPasswordMessage, setCurrentPasswordMessage] = useState('');
    const [newPasswordMessage, setNewPasswordMessage] = useState('');
    const [confirmNewPasswordMessage, setConfirmNewPasswordMessage] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);


    const handleUpdateInfo = async (event) => {
        event.preventDefault();
        setUsernameMessage('');
        setEmailMessage('');
        const usernameError = '';
        const emailError = validators.validateEmail(email);

        if(usernameError || emailError){
            setUsernameMessage(usernameError ? usernameError : "");
            setEmailMessage(emailError ? emailError : "");
            return;
        }else{
            const data = {}
            for(const [key, value] of new FormData(event.target)){
                data[key] = DOMPurify.sanitize(value);
            }
            await updateUser(userId, data);
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
            const data = {}
            for(const [key, value] of new FormData(event.target)){
                data[key] = value;
            }
            
            await updateUser(userId,data);
        }
    }
    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        if(!confirmDelete){
            setConfirmDelete(true);
            return;
        }
        const data = {}
        for(const [key, value] of new FormData(event.target)){
            data[key] = value;
        }

        await deleteAccount(userId,data);
    }
    
    const handleCancelDelete = (event) => {
        event.preventDefault();
        setConfirmDelete(false);
    }

    useEffect(() =>{
        if(user){
            setUsername(user.username === null ? "" : user.username);
            setEmail(user.email);
        }
    },[user]);

    if(loading){
        return <p>Loading...</p>
    }else{
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
                            value={emailConfirm}
                            onChange={e => setEmailConfirm(e.target.value)}
                            style={{visibility: 'hidden', position: 'absolute'}}
                        />
                        <input
                            type='hidden'
                            name="_csrf"
                            value={csrfToken}
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
                            value={currentPasswordConfirm}
                            onChange={e => setCurrentPasswordConfirm(e.target.value)}
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
                        <input
                            type='hidden'
                            name="_csrf"
                            value={csrfToken}
                        />
                    </div>
                    <button type="submit" className="submit-user">Save</button>
                </form>
            </div>
            <div className="profile-form">
                <div>
                    <h2>Delete your account</h2>
                    <div className={confirmDelete ? "delete-warning" : "delete-warning hidden"}>
                        <i className="fa-solid fa-circle-exclamation"></i><p>Are you sure you want to delete your account?</p>
                    </div>
                </div>
                <form onSubmit={handleDeleteAccount}>
                    <input
                        type="checkbox"
                        id="delete-account"
                        name="delete-account"
                        checked={isDeleteChecked}
                        onChange={(e) => setIsDeleteChecked(e.target.checked)}
                        style={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <div className='delete-user-buttons'>
                        { confirmDelete &&
                            <a href="#" className="submit-user" onClick={handleCancelDelete}>{"Cancel"}</a>
                        }
                        <input
                            type='hidden'
                            name="_csrf"
                            value={csrfToken}
                        />
                        <button type="submit" className="submit-user">{confirmDelete ? "I am Sure" : "Delete"}</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

export default Profile;