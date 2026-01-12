import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as validators from "../../../utils/validators.js";
import { useAuth } from "../../../data/auth";
import styles from "../../../styles/Login.module.css";

export const Route = createFileRoute("/users/reset-password/")({
  component: ResetRequestForm,
});

function ResetRequestForm() {
  const { requestResetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailMessage("");

    const emailError = validators.validateEmail(email);
    if (emailError) {
      setEmailMessage(emailError);
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Call the mutation from useAuth
    await requestResetPassword(data);
  };

  return (
    <div className={styles["login-form-container"]}>
      <h1>Forgot your password?</h1>

      <div className={styles["login-form"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            {/* Honeypot */}
            <input
              type="text"
              name="username"
              autoComplete="off"
              style={{ visibility: "hidden", position: "absolute" }}
            />

            <label htmlFor="email">Email:</label>
            <input
              className={emailMessage !== "" ? "input-error" : ""}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="input-message">{emailMessage}</p>
          </div>
          <button type="submit" className={styles["submit-user"]}>
            Send reset link
          </button>
        </form>
      </div>
      <p>
        Here by mistake? <Link to="/users/login">Back</Link>
      </p>
    </div>
  );
}
