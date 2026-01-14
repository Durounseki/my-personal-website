import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as validators from "../../../utils/validators.js";
import { useAuth } from "../../../data/auth";

export const Route = createFileRoute("/users/reset-password/$tokenId")({
  component: ResetForm,
});

function ResetForm() {
  const { resetPassword } = useAuth();
  const { tokenId } = Route.useParams();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordMessage("");
    setConfirmPasswordMessage("");

    const passwordError = validators.validatePassword(password);
    const confirmPasswordError = validators.validateConfirmPassword(
      password,
      passwordConfirm
    );

    if (passwordError || confirmPasswordError) {
      setPasswordMessage(passwordError || "");
      setConfirmPasswordMessage(confirmPasswordError || "");
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    await resetPassword({ tokenId, data });
  };

  return (
    <div className="login-form-container">
      <h1>Reset your password</h1>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              style={{ visibility: "hidden", position: "absolute" }}
            />

            <label htmlFor="password">Password:</label>
            <input
              className={passwordMessage !== "" ? "input-error" : ""}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <p className="input-message">{passwordMessage}</p>

            <label htmlFor="password-confirm">Confirm Password:</label>
            <input
              className={confirmPasswordMessage !== "" ? "input-error" : ""}
              type="password"
              id="password-confirm"
              name="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <p className="input-message">{confirmPasswordMessage}</p>
          </div>
          <button type="submit" className="submit-user">
            Reset password
          </button>
        </form>
      </div>
      <p>
        Here by mistake? <Link to="/users/login">Back</Link>
      </p>
    </div>
  );
}
