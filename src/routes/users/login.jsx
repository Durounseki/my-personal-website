import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";
import styles from "../../styles/Login.module.css";

export const Route = createFileRoute("/users/login")({
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // login is the mutation.mutate function from your useAuth hook
    login(data);
  };

  return (
    <div className={styles["login-form-container"]}>
      <h1>Welcome back</h1>
      <p>Log in to your account to continue.</p>

      <div className={styles["login-form"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Honeypot for simple bot protection */}
            <input
              type="email"
              name="email-confirm"
              autoComplete="off"
              className={styles.honeypot}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className={styles["forgot-or-remember"]}>
              <label>
                <input
                  type="checkbox"
                  name="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/users/reset-password">Forgot password</Link>
            </div>
          </div>
          <button type="submit" className={styles["submit-user"]}>
            Log in
          </button>
        </form>
      </div>
      <p>
        Don&apos;t have an account? <Link to="/users/signup">Sign up</Link>
      </p>
    </div>
  );
}
