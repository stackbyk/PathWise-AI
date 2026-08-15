import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await register(
        formData.name,
        formData.email,
        formData.password,
      );

      if (!result?.success) {
        setError(result?.message || "Registration failed. Please try again.");

        return;
      }

      /* ================================================
         SAVE PROFILE NAME LOCALLY
      ================================================= */

      localStorage.setItem("pathwiseProfileName", formData.name.trim());

      /* ================================================
         INITIAL PROFILE DATA
      ================================================= */

      if (!localStorage.getItem("pathwiseProfileSkills")) {
        localStorage.setItem("pathwiseProfileSkills", JSON.stringify([]));
      }

      /* ================================================
         INITIAL GAMIFICATION DATA
      ================================================= */

      if (!localStorage.getItem("pathwiseXP")) {
        localStorage.setItem("pathwiseXP", "0");
      }

      if (!localStorage.getItem("pathwiseCompletedSkills")) {
        localStorage.setItem("pathwiseCompletedSkills", "0");
      }

      if (!localStorage.getItem("pathwiseStreak")) {
        localStorage.setItem("pathwiseStreak", "1");
      }

      /* ================================================
         UPDATE OTHER COMPONENTS
      ================================================= */

      window.dispatchEvent(new Event("pathwiseProfileUpdated"));

      /* ================================================
         GO TO DASHBOARD
      ================================================= */

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);

      setError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">
            PathWise AI
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Create Your Account
          </h1>

          <p className="text-slate-600 mt-2">
            Start building your personalized career roadmap.
          </p>
        </div>

        {/* =================================================
            REGISTER CARD
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* =================================================
                NAME
            ================================================= */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

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
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

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
                  placeholder="Create a password"
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3">
                {error}
              </div>
            )}

            {/* =================================================
                CREATE ACCOUNT
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              LOGIN LINK
          ================================================= */}

          <div className="text-center mt-6 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
