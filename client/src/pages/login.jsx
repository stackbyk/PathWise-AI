// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // =======================================================
  // EMAIL / PASSWORD LOGIN
  // =======================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login page error:", error);

      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // GOOGLE LOGIN
  // =======================================================

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await loginWithGoogle();

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Google sign-in failed. Please try again.");

        console.error("Google login error code:", result.error);
      }
    } catch (error) {
      console.error("Google login page error:", error);

      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // GO TO REGISTER
  // =======================================================

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      {/* =================================================
          BRAND
      ================================================= */}

      <div className="login-brand">PathWise AI</div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="login-header">
        <h1>Welcome Back</h1>

        <p>Continue your journey toward your dream career.</p>
      </div>

      {/* =================================================
          LOGIN CARD
      ================================================= */}

      <div className="login-card">
        {/* =================================================
            GOOGLE BUTTON
        ================================================= */}

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="google-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.79-.07-1.54-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
              />

              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.52z"
              />

              <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.21 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.52C7.31 7.85 9.46 6.13 12 6.13z"
              />
            </svg>
          </span>

          <span>{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="login-divider">
          <span></span>

          <div>OR</div>

          <span></span>
        </div>

        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form className="login-form" onSubmit={handleLogin}>
          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M4 7l8 6 8-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 3l18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M10.58 10.58A2 2 0 0 0 13.4 13.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M9.88 5.1A10.8 10.8 0 0 1 12 4.9c5.2 0 8.5 5.1 8.5 5.1a15.8 15.8 0 0 1-3.18 3.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M6.42 6.42C3.9 8.1 2.5 10 2.5 10s3.3 5.1 9.5 5.1c1.02 0 1.96-.15 2.82-.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M2.5 12s3.3-5.1 9.5-5.1S21.5 12 21.5 12 18.2 17.1 12 17.1 2.5 12 2.5 12z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && <div className="login-error">{error}</div>}

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button type="submit" className="login-button" disabled={loading}>
            <span>{loading ? "Logging in..." : "Login"}</span>

            {!loading && <span className="login-arrow">→</span>}
          </button>
        </form>

        {/* =================================================
            REGISTER
        ================================================= */}

        <div className="register-link">
          <span>Don't have an account?</span>

          <button type="button" onClick={handleRegister} disabled={loading}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
