import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./AuthPage.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const data = await apiRequest(`/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify({ password, confirmPassword }),
      });

      setMessage(data.message || "Password reset successful.");
      window.setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(err.message || "Unable to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page auth-page--login">
      <div className="auth-login-bg" aria-hidden="true">
        <div className="auth-login-strip auth-login-strip--one" />
        <div className="auth-login-strip auth-login-strip--two" />
        <div className="auth-login-strip auth-login-strip--three" />
        <div className="auth-login-strip auth-login-strip--four" />
      </div>

      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/home">
            <img src="/logo_bigtext.webp" alt="Gameverse" className="auth-header-logo" />
          </Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-brand">
            <img src="/logo_bigtext.webp" alt="Gameverse" />
          </div>

          <h2>New Password</h2>
          <p className="auth-subtitle">Choose a fresh password for your Gameverse account.</p>

          <div className="auth-field">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {message ? (
            <p className="auth-message auth-message--success" role="status">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="auth-message auth-message--error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="auth-actions">
            <button className="auth-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Reset Password"}
            </button>

            <p className="auth-switch">
              Back to{" "}
              <span className="auth-switch-link">
                <Link to="/login" replace>sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
