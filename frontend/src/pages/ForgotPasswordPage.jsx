import React from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./AuthPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [resetUrl, setResetUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const resetPath = React.useMemo(() => {
    if (!resetUrl) return "";

    try {
      return new URL(resetUrl).pathname;
    } catch {
      return resetUrl;
    }
  }, [resetUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setResetUrl("");
    setError("");
    setIsSubmitting(true);

    try {
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setMessage(data.message || "Password reset link generated.");
      setResetUrl(data.resetUrl || "");
    } catch (err) {
      setError(err.message || "Unable to generate reset link");
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

          <h2>Reset Password</h2>
          <p className="auth-subtitle">Enter your account email to generate a reset link.</p>

          <div className="auth-field">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {message ? (
            <p className="auth-message auth-message--success" role="status">
              {message}
            </p>
          ) : null}

          {resetPath ? (
            <Link className="auth-reset-link" to={resetPath}>
              Open reset form
            </Link>
          ) : null}

          {error ? (
            <p className="auth-message auth-message--error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="auth-actions">
            <button className="auth-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Generating..." : "Send Reset Link"}
            </button>

            <p className="auth-switch">
              Remembered it?{" "}
              <span className="auth-switch-link">
                <Link to="/login" replace>Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
