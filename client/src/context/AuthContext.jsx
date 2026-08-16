// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { auth } from "../services/firebase";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

/*
=========================================================
API BASE URL
=========================================================

Development:
VITE_API_URL=https://pathwise-ai-backend-psug.onrender.com

Production:
VITE_API_URL=https://YOUR-RENDER-BACKEND-URL.onrender.com

If VITE_API_URL is not provided, localhost:5000 is used
so the project continues to work locally.
*/

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE LOGIN SESSION
  // =====================================================

  useEffect(() => {
    const restoreSession = () => {
      try {
        const savedUser = localStorage.getItem("pathwiseUser");
        const savedToken = localStorage.getItem("pathwiseToken");

        console.log("=================================");
        console.log("RESTORING PATHWISE SESSION");
        console.log("Saved user:", savedUser);
        console.log("Token exists:", !!savedToken);
        console.log("=================================");

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);

            if (parsedUser && parsedUser.email) {
              setUser(parsedUser);

              console.log("Session restored successfully:", parsedUser);

              return;
            }
          } catch (parseError) {
            console.error("Failed to parse saved user:", parseError);
          }
        }

        setUser(null);

        console.log("No PathWise session found.");
      } catch (error) {
        console.error("Session restore error:", error);

        localStorage.removeItem("pathwiseToken");
        localStorage.removeItem("pathwiseUser");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // =====================================================
  // EMAIL LOGIN
  // =====================================================

  const login = async (email, password) => {
    try {
      if (!email?.trim() || !password) {
        return {
          success: false,
          message: "Please enter your email and password.",
        };
      }

      console.log("Attempting backend login...");
      console.log("API URL:", `${API_BASE_URL}/api/auth/login`);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Backend login response:", data);

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Invalid email or password.",
        };
      }

      if (!data.token) {
        console.error("Backend did not return a token.");

        return {
          success: false,
          message: "Login failed: authentication token missing.",
        };
      }

      // =================================================
      // CREATE USER OBJECT
      // =================================================

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role || "student",
      };

      // =================================================
      // SAVE JWT
      // =================================================

      localStorage.setItem("pathwiseToken", data.token);

      // =================================================
      // SAVE USER
      // =================================================

      localStorage.setItem("pathwiseUser", JSON.stringify(userData));

      // =================================================
      // UPDATE AUTH STATE
      // =================================================

      setUser(userData);

      console.log("=================================");
      console.log("LOGIN SUCCESS");
      console.log("User:", userData);
      console.log("Token saved:", !!localStorage.getItem("pathwiseToken"));
      console.log("=================================");

      return {
        success: true,
        user: userData,
        token: data.token,
      };
    } catch (error) {
      console.error("EMAIL LOGIN ERROR:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Make sure the backend is running.",
      };
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const register = async (name, email, password) => {
    try {
      if (!name?.trim() || !email?.trim() || !password) {
        return {
          success: false,
          message: "Please fill in all required fields.",
        };
      }

      console.log("Attempting backend registration...");
      console.log("API URL:", `${API_BASE_URL}/api/auth/register`);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Backend registration response:", data);

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Registration failed.",
        };
      }

      if (!data.token) {
        return {
          success: false,
          message: "Registration failed: authentication token missing.",
        };
      }

      // =================================================
      // CREATE USER
      // =================================================

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role || "student",
      };

      // =================================================
      // SAVE SESSION
      // =================================================

      localStorage.setItem("pathwiseToken", data.token);

      localStorage.setItem("pathwiseUser", JSON.stringify(userData));

      // =================================================
      // UPDATE AUTH STATE
      // =================================================

      setUser(userData);

      console.log("REGISTRATION SUCCESS:", userData);

      return {
        success: true,
        user: userData,
        token: data.token,
      };
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Make sure the backend is running.",
      };
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in...");

      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      console.log("Firebase Google login successful:", firebaseUser);

      // =================================================
      // GET FIREBASE ID TOKEN
      // =================================================

      const firebaseToken = await firebaseUser.getIdToken();

      // =================================================
      // CREATE GOOGLE USER
      // =================================================

      const googleUser = {
        _id: firebaseUser.uid,

        name:
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "User",

        email: firebaseUser.email,

        role: "student",

        firebaseUid: firebaseUser.uid,
      };

      // =================================================
      // SAVE FIREBASE TOKEN
      // =================================================

      localStorage.setItem("pathwiseToken", firebaseToken);

      // =================================================
      // SAVE USER
      // =================================================

      localStorage.setItem("pathwiseUser", JSON.stringify(googleUser));

      // =================================================
      // UPDATE REACT AUTH STATE
      // =================================================

      setUser(googleUser);

      console.log("=================================");
      console.log("GOOGLE LOGIN SUCCESS");
      console.log("Google user:", googleUser);

      console.log(
        "Google token saved:",
        !!localStorage.getItem("pathwiseToken"),
      );

      console.log("=================================");

      return {
        success: true,
        user: googleUser,
        token: firebaseToken,
      };
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      return {
        success: false,
        error: error?.code,
        message: getFirebaseErrorMessage(error?.code),
      };
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      // =================================================
      // REMOVE AUTH SESSION
      // =================================================

      localStorage.removeItem("pathwiseToken");

      localStorage.removeItem("pathwiseUser");

      // =================================================
      // REMOVE PROFILE DATA
      // =================================================

      localStorage.removeItem("pathwiseProfileName");

      localStorage.removeItem("pathwiseProfileSkills");

      // =================================================
      // FIREBASE LOGOUT
      // =================================================

      try {
        await firebaseSignOut(auth);
      } catch (firebaseError) {
        console.log("Firebase logout skipped:", firebaseError);
      }

      // =================================================
      // CLEAR REACT STATE
      // =================================================

      setUser(null);

      console.log("User successfully logged out.");

      return {
        success: true,
      };
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      return {
        success: false,
        message: "Logout failed.",
      };
    }
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    user,
    loading,

    login,
    register,
    loginWithGoogle,
    logout,

    // Compatibility aliases
    signIn: login,
    signUp: register,
    googleLogin: loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =========================================================
// USE AUTH HOOK
// =========================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}

// =========================================================
// FIREBASE ERROR MESSAGES
// =========================================================

function getFirebaseErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
      return "No account exists with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/popup-blocked":
      return "Google sign-in popup was blocked by your browser.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/cancelled-popup-request":
      return "Another Google sign-in request is already running.";

    case "auth/unauthorized-domain":
      return "This website domain is not authorized in Firebase.";

    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in Firebase.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    default:
      return (
        "Authentication failed" +
        (code ? ` (${code})` : "") +
        ". Please try again."
      );
  }
}
