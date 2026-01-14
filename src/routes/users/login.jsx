import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";

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
    login(data);
  };

  return (
    <div className="login-form-container">
      <h1>Welcome back</h1>
      <p>Log in to your account to continue.</p>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="email"
              id="email-confirm"
              name="email-confirm"
              autoComplete="off"
              style={{ visibility: "hidden", position: "absolute" }}
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

            <div className="forgot-or-remember">
              <label htmlFor="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/users/reset-password">Forgot password</Link>
            </div>
          </div>
          <button type="submit" className="submit-user">
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

export default Login;
