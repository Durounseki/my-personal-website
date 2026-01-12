import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as validators from "../../utils/validators.js";
import { useAuth } from "../../data/auth";

// Using the same styles as Login
import styles from "../../styles/Login.module.css";

export const Route = createFileRoute("/users/signup")({
  component: SignUp,
});

function SignUp() {
  const { signup } = useAuth();

  // 1. Form state
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 2. Local validation message state
  const [errors, setErrors] = useState({
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset messages
    setErrors({
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: "",
    });

    // Run validators
    const emailError = validators.validateEmail(email);
    const confirmEmailError = validators.validateConfirmEmail(
      email,
      emailConfirm
    );
    const passwordError = validators.validatePassword(password);
    const confirmPasswordError = validators.validateConfirmPassword(
      password,
      passwordConfirm
    );

    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      confirmEmailError
    ) {
      setErrors({
        email: emailError || "",
        emailConfirm: confirmEmailError || "",
        password: passwordError || "",
        passwordConfirm: confirmPasswordError || "",
      });
      return;
    } else {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      // Call signup mutation from useAuth
      await signup(data);
    }
  };

  return (
    <div className={styles["login-form-container"]}>
      <h1>Welcome to my website</h1>
      <p>Create an account to learn more, ask a question or simply say hi.</p>

      <div className={styles["login-form"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            {/* Honeypot for simple bot protection */}
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              style={{ visibility: "hidden", position: "absolute" }}
            />

            <label htmlFor="email">Email:</label>
            <input
              className={errors.email ? "input-error" : ""}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="input-message">{errors.email}</p>

            <label htmlFor="email-confirm">Confirm Email:</label>
            <input
              className={errors.emailConfirm ? "input-error" : ""}
              type="email"
              id="email-confirm"
              name="email-confirm"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              required
            />
            <p className="input-message">{errors.emailConfirm}</p>

            <label htmlFor="password">Password:</label>
            <input
              className={errors.password ? "input-error" : ""}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="input-message">{errors.password}</p>

            <label htmlFor="password-confirm">Confirm Password:</label>
            <input
              className={errors.passwordConfirm ? "input-error" : ""}
              type="password"
              id="password-confirm"
              name="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <p className="input-message">{errors.passwordConfirm}</p>
          </div>

          <button type="submit" className={styles["submit-user"]}>
            Sign up
          </button>
        </form>
      </div>

      <p>
        Already have an account? <Link to="/users/login">Log in</Link>
      </p>
      <p>
        By continuing, you agree to the{" "}
        <a href="/terms-of-service" rel="noopener noreferrer" target="_blank">
          terms of use
        </a>
        .
      </p>
    </div>
  );
}
