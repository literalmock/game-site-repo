import React from "react";
import { Link } from "react-router-dom";
import "./AuthPage.css";
import useAuthPageReady from "../hooks/useAuthPageReady";

const SignupPage = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [keepSignedIn, setKeepSignedIn] = React.useState(true);
  const isPageReady = useAuthPageReady();

  const signupRequest = (e) => {
    e.preventDefault();
    console.log("Signup request sent");
  };

  return (
    <div className="auth-page auth-page--signup" aria-busy={!isPageReady}>
      {!isPageReady ? (
        <div className="auth-loader" role="status" aria-live="polite">
          <div className="auth-loader-spinner" aria-hidden="true" />
          <p className="auth-loader-text">Loading sign up...</p>
        </div>
      ) : null}

      <div className="auth-login-bg auth-login-bg--signup" aria-hidden="true">
        <div className="auth-login-strip auth-signup-panel auth-signup-panel--one" />
        <div className="auth-login-strip auth-signup-panel auth-signup-panel--two" />
        <div className="auth-login-strip auth-signup-panel auth-signup-panel--three" />
        <div className="auth-login-strip auth-signup-panel auth-signup-panel--four" />
      </div>
      <img
        src="/avatars/charac4.webp"
        alt=""
        className="auth-signup-mascot"
        aria-hidden="true"
      />

      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/home">
            <img src="/logo_bigtext.webp" alt="Gameverse" className="auth-header-logo" />
          </Link>
        </div>

        <form className="auth-form auth-form--signup" onSubmit={signupRequest}>
          <div className="auth-form-brand">
            <img src="/logo_bigtext.webp" alt="Gameverse" />
          </div>

          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Create your account to save favorites and keep your profile in sync.
          </p>

          <div className="auth-signup-grid">
            <div className="auth-field">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="auth-field auth-field--full">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-checkbox-row auth-checkbox-row--signup">
            <label className="auth-checkbox-wrap" htmlFor="keepSignedIn">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>
          </div>

          <div className="auth-actions auth-actions--signup">
            <button className="auth-btn" type="submit">
              Create Account
            </button>

            <div className="auth-divider" aria-hidden="true">
              <span />
              <p>OR</p>
              <span />
            </div>

            <div className="auth-socials" aria-label="Social sign up">
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Sign up with Google"
              >
                <img className="auth-social-icon" src="/icons/google.webp" alt="" />
              </button>
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Sign up with Discord"
              >
                <img className="auth-social-icon" src="/icons/discord.webp" alt="" />
              </button>
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Sign up with Steam"
              >
                <img className="auth-social-icon" src="/icons/steam.webp" alt="" />
              </button>
            </div>

            <p className="auth-switch">
              Already have an account?{" "}
              <span className="auth-switch-link">
                <Link to="/login" replace>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
