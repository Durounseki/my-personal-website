import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";
import * as validators from "../../utils/validators.js";
import DOMPurify from "dompurify";

// Import CSS Module
import styles from "../../styles/Profile.module.css";

export const Route = createFileRoute("/users/profile")({
  component: Profile,
});

function Profile() {
  // Pulling state and mutation functions directly from useAuth
  const { user, isLoading, userId, csrfToken, updateUser, deleteAccount } =
    useAuth();

  // 1. Local state for controlled inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);

  // 2. Local state for validation messages
  const [messages, setMessages] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Sync profile data from useAuth into local state on load
  useEffect(() => {
    if (user) {
      setUsername(user.username === null ? "" : user.username);
      setEmail(user.email || "");
    }
  }, [user]);

  // --- Handlers ---

  const handleUpdateInfo = async (event) => {
    event.preventDefault();
    setMessages((prev) => ({ ...prev, username: "", email: "" }));

    const emailError = validators.validateEmail(email);
    const usernameError = ""; // Keeping logic consistent with your legacy code

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

    // Call mutation directly (it is already .mutate from useAuth)
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
    <div className={styles["profile-container"]}>
      {/* General Section */}
      <div className={styles["profile-form"]}>
        <h2>General</h2>
        <form onSubmit={handleUpdateInfo}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username:</label>
            <input
              className={messages.username !== "" ? styles["input-error"] : ""}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={styles["input-message"]}>{messages.username}</p>

            <label htmlFor="email">Email:</label>
            <input
              className={messages.email !== "" ? styles["input-error"] : ""}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className={styles["input-message"]}>{messages.email}</p>

            {/* Honeypot */}
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
          <button type="submit" className={styles["submit-user"]}>
            Save
          </button>
        </form>
      </div>

      {/* Security Section */}
      <div className={styles["profile-form"]}>
        <h2>Security</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className={styles["form-group"]}>
            <label htmlFor="current-password">Current Password:</label>
            <input
              className={
                messages.currentPassword !== "" ? styles["input-error"] : ""
              }
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <p className={styles["input-message"]}>
              {messages.currentPassword}
            </p>

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
              className={
                messages.newPassword !== "" ? styles["input-error"] : ""
              }
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <p className={styles["input-message"]}>{messages.newPassword}</p>

            <label htmlFor="confirm-new-password">Confirm new password:</label>
            <input
              className={
                messages.confirmNewPassword !== "" ? styles["input-error"] : ""
              }
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <p className={styles["input-message"]}>
              {messages.confirmNewPassword}
            </p>

            <input type="hidden" name="_csrf" value={csrfToken} />
          </div>
          <button type="submit" className={styles["submit-user"]}>
            Save
          </button>
        </form>
      </div>

      {/* Delete Section */}
      <div className={styles["profile-form"]}>
        <div>
          <h2>Delete your account</h2>
          <div
            className={
              confirmDelete
                ? styles["delete-warning"]
                : `${styles["delete-warning"]} ${styles["hidden"]}`
            }
          >
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
          <div className={styles["delete-user-buttons"]}>
            {confirmDelete && (
              <a
                href="#"
                className={styles["submit-user"]}
                onClick={handleCancelDelete}
              >
                Cancel
              </a>
            )}
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button type="submit" className={styles["submit-user"]}>
              {confirmDelete ? "I am Sure" : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
