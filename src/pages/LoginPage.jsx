import React from "react";
import "./AuthPage.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const loginRequest = (e) => {
    e.preventDefault();
    console.log("Login request sent");
  };

  return (
    <div className="auth-page auth-page--login">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/">
          <h1>Gameverse</h1>
          </Link>
        </div>
        <form className="auth-form" onSubmit={loginRequest}>
          <h2>Login</h2>
          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-checkbox-row">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="auth-actions">
            <button className="auth-btn" type="submit">
              Login
            </button>
            <p className="auth-switch">
              New user?{" "}
              <span className="auth-switch-link">
                {" "}
                <Link to="/signup">Signup</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
