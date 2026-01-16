import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";
import * as validators from "../../utils/validators.js";
import DOMPurify from "dompurify";
import { userQueryOptions, useUser } from "../../data/users.js";

export const Route = createFileRoute("/users/profile")({
  loader: ({ context: { queryClient, userId } }) => {
    if (!userId) return null;
    return queryClient.ensureQueryData(userQueryOptions(userId));
  },
  component: Profile,
});

function Profile() {
  const { userId, csrfToken, updateUser, deleteAccount } = useAuth();

  const { data: user, isLoading } = useUser(userId);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);

  const [messages, setMessages] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUsername(user.username === null ? "" : user.username);
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateInfo = async (event) => {
    event.preventDefault();
    setMessages((prev) => ({ ...prev, username: "", email: "" }));

    const emailError = validators.validateEmail(email);
    const usernameError = "";

    if (usernameError || emailError) {
      setMessages((prev) => ({
        ...prev,
        username: usernameError || "",
        email: emailError || "",
      }));
      return;
    }

    const data = {};
    for (const [key, value] of new FormData(event.target)) {
      data[key] = DOMPurify.sanitize(value);
    }

    updateUser({ userId, data });
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setMessages({
      username: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    const newPasswordError = validators.validatePassword(newPassword);
    const confirmNewPasswordError = validators.validateConfirmPassword(
      newPassword,
      confirmNewPassword
    );

    if (newPasswordError || confirmNewPasswordError) {
      setMessages((prev) => ({
        ...prev,
        newPassword: newPasswordError || "",
        confirmNewPassword: confirmNewPasswordError || "",
      }));
      return;
    }

    const data = {};
    for (const [key, value] of new FormData(event.target)) {
      data[key] = value;
    }

    updateUser({ userId, data });
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    const data = {};
    for (const [key, value] of new FormData(event.target)) {
      data[key] = value;
    }

    deleteAccount({ userId, data });
  };

  const handleCancelDelete = (event) => {
    event.preventDefault();
    setConfirmDelete(false);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>General</h2>
        <form onSubmit={handleUpdateInfo}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className={messages.username !== "" ? "input-error" : ""}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="input-message">{messages.username}</p>

            <label htmlFor="email">Email:</label>
            <input
              className={messages.email !== "" ? "input-error" : ""}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="input-message">{messages.email}</p>

            <input
              type="email"
              id="email-confirm"
              name="email-confirm"
              autoComplete="off"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              style={{ visibility: "hidden", position: "absolute" }}
            />
            <input type="hidden" name="_csrf" value={csrfToken} />
          </div>
          <button type="submit" className="submit-user">
            Save
          </button>
        </form>
      </div>

      <div className="profile-form">
        <h2>Security</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input
              className={messages.currentPassword !== "" ? "input-error" : ""}
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <p className="input-message">{messages.currentPassword}</p>

            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              autoComplete="off"
              value={currentPasswordConfirm}
              onChange={(e) => setCurrentPasswordConfirm(e.target.value)}
              style={{ visibility: "hidden", position: "absolute" }}
            />

            <label htmlFor="new-password">New Password:</label>
            <input
              className={messages.newPassword !== "" ? "input-error" : ""}
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <p className="input-message">{messages.newPassword}</p>

            <label htmlFor="confirm-new-password">Confirm new password:</label>
            <input
              className={
                messages.confirmNewPassword !== "" ? "input-error" : ""
              }
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <p className="input-message">{messages.confirmNewPassword}</p>

            <input type="hidden" name="_csrf" value={csrfToken} />
          </div>
          <button type="submit" className="submit-user">
            Save
          </button>
        </form>
      </div>

      <div className="profile-form">
        <div>
          <h2>Delete your account</h2>
          <div className={`delete-warning ${confirmDelete ? "" : "hidden"}`}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>Are you sure you want to delete your account?</p>
          </div>
        </div>
        <form onSubmit={handleDeleteAccount}>
          <input
            type="checkbox"
            id="delete-account"
            name="delete-account"
            checked={isDeleteChecked}
            onChange={(e) => setIsDeleteChecked(e.target.checked)}
            style={{ visibility: "hidden", position: "absolute" }}
          />
          <div className="delete-user-buttons">
            {confirmDelete && (
              <a href="#" className="submit-user" onClick={handleCancelDelete}>
                Cancel
              </a>
            )}
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button type="submit" className="submit-user">
              {confirmDelete ? "I am Sure" : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
