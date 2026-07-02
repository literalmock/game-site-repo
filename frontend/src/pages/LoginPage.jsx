import React from "react";
import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthPageReady from "../hooks/useAuthPageReady";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isPageReady = useAuthPageReady();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginRequest = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
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
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

            <Link to="/forgot-password" className="auth-forgot-link">Forgot Password?</Link>
          </div>

          {error ? (
            <p className="auth-message auth-message--error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="auth-actions">
            <button className="auth-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
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
