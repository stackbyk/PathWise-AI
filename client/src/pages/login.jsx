import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  // Firebase authentication functions
  const { signInWithGoogle, signInWithEmail } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // =========================================================
  // HANDLE INPUT CHANGES
  // =========================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================================
  // EMAIL + PASSWORD LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoginLoading(true);

      await signInWithEmail(formData.email, formData.password);

      // Login successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/user-disabled") {
        setError("This account has been disabled. Please contact support.");
      } else {
        setError("Login failed. Please check your details and try again.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      await signInWithGoogle();

      // Google login successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Google sign-in popup was blocked. Please allow popups.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setError(
          "An account already exists with this email using another sign-in method.",
        );
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        {/* =================================================
            LOGO / HEADING
        ================================================= */}

        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">
            PathWise AI
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Welcome Back
          </h1>

          <p className="text-slate-600 mt-2">
            Continue your journey toward your dream career.
          </p>
        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* =================================================
              GOOGLE LOGIN
          ================================================= */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loginLoading}
            className="w-full border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="text-lg font-bold">G</span>

            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />

            <span className="text-sm text-slate-400">OR</span>

            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* =================================================
              EMAIL/PASSWORD FORM
          ================================================= */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loginLoading || googleLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="text-center mt-6 text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
