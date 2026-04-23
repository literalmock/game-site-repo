import React from "react";
import "./AuthPage.css";
import { Link } from "react-router-dom";
import useAuthPageReady from "../hooks/useAuthPageReady";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const isPageReady = useAuthPageReady();

  const loginRequest = (e) => {
    e.preventDefault();
    console.log("Login request sent");
  };

  return (
    <div className="auth-page auth-page--login" aria-busy={!isPageReady}>
      {!isPageReady ? (
        <div className="auth-loader" role="status" aria-live="polite">
          <div className="auth-loader-spinner" aria-hidden="true" />
          <p className="auth-loader-text">Loading sign in...</p>
        </div>
      ) : null}

      <div className="auth-login-bg" aria-hidden="true">
        <div className="auth-login-strip auth-login-strip--one" />
        <div className="auth-login-strip auth-login-strip--two" />
        <div className="auth-login-strip auth-login-strip--three" />
        <div className="auth-login-strip auth-login-strip--four" />
      </div>
      <img
        src="/avatars/charac2.webp"
        alt=""
        className="auth-login-mascot"
        aria-hidden="true"
      />

      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/home">
            <img src="/logo_bigtext.webp" alt="Gameverse" className="auth-header-logo" />
          </Link>
        </div>

        <form className="auth-form" onSubmit={loginRequest}>
          <div className="auth-form-brand">
            <img src="/logo_bigtext.webp" alt="Gameverse" />
          </div>

          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Log in to continue your adventure</p>

          <div className="auth-field">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-checkbox-row">
            <label className="auth-checkbox-wrap" htmlFor="remember">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>

            <a href="#" className="auth-forgot-link">Forgot Password?</a>
          </div>

          <div className="auth-actions">
            <button className="auth-btn" type="submit">
              Sign In
            </button>

            <div className="auth-divider" aria-hidden="true">
              <span />
              <p>OR</p>
              <span />
            </div>

            <div className="auth-socials" aria-label="Social sign in">
              <button type="button" className="auth-social-btn" aria-label="Sign in with Google"><img className="auth-social-icon" src="/icons/google.webp" alt="" /></button>
              <button type="button" className="auth-social-btn" aria-label="Sign in with Discord"><img className="auth-social-icon" src="/icons/discord.webp" alt="" /></button>
              <button type="button" className="auth-social-btn" aria-label="Sign in with Steam"><img className="auth-social-icon" src="/icons/steam.webp" alt="" /></button>
            </div>

            <p className="auth-switch">
              Don&apos;t have an account?{" "}
              <span className="auth-switch-link">
                <Link to="/signup" replace>Signup</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
