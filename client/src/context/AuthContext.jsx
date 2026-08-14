// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

// =========================================================
// AUTH CONTEXT
// =========================================================

const AuthContext = createContext(null);

// =========================================================
// GOOGLE PROVIDER
// =========================================================

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// =========================================================
// AUTH PROVIDER
// =========================================================

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // LISTEN TO FIREBASE AUTH STATE
  // =======================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log("Firebase auth state:", currentUser);

        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase auth state error:", error);

        setUser(null);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  // =======================================================
  // EMAIL LOGIN
  // =======================================================

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        return {
          success: false,
          error: "missing-fields",
          message: "Please enter your email and password.",
        };
      }

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      console.log("Email login successful:", result.user);

      setUser(result.user);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("EMAIL LOGIN ERROR:", error);

      return {
        success: false,
        error: error?.code,
        message: getFirebaseErrorMessage(error?.code),
      };
    }
  };

  // =======================================================
  // REGISTER
  // =======================================================

  const register = async (name, email, password) => {
    try {
      if (!email || !password) {
        return {
          success: false,
          error: "missing-fields",
          message: "Please enter your email and password.",
        };
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      // Save user's display name
      if (name && name.trim()) {
        await updateProfile(result.user, {
          displayName: name.trim(),
        });
      }

      console.log("Registration successful:", result.user);

      setUser(result.user);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      return {
        success: false,
        error: error?.code,
        message: getFirebaseErrorMessage(error?.code),
      };
    }
  };

  // =======================================================
  // GOOGLE LOGIN
  // =======================================================

  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in...");

      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google sign-in successful:", result.user);

      setUser(result.user);

      return {
        success: true,
        user: result.user,
      };
    } catch (error) {
      console.error("================================");

      console.error("GOOGLE LOGIN ERROR");

      console.error("Error code:", error?.code);

      console.error("Error message:", error?.message);

      console.error("Full Firebase error:", error);

      console.error("================================");

      return {
        success: false,
        error: error?.code || "unknown-error",
        message: getFirebaseErrorMessage(error?.code),
      };
    }
  };

  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);

      console.log("User successfully logged out.");

      return {
        success: true,
      };
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      return {
        success: false,
        error: error?.code,
        message: getFirebaseErrorMessage(error?.code),
      };
    }
  };

  // =======================================================
  // CONTEXT VALUE
  // =======================================================

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
    // -----------------------------------------------------
    // EMAIL / PASSWORD
    // -----------------------------------------------------

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

    case "auth/missing-password":
      return "Please enter your password.";

    case "auth/missing-email":
      return "Please enter your email address.";

    // -----------------------------------------------------
    // GOOGLE
    // -----------------------------------------------------

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

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using another sign-in method.";

    // -----------------------------------------------------
    // NETWORK
    // -----------------------------------------------------

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    // -----------------------------------------------------
    // OTHER
    // -----------------------------------------------------

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "missing-fields":
      return "Please fill in all required fields.";

    default:
      return (
        "Authentication failed" +
        (code ? ` (${code})` : "") +
        ". Please try again."
      );
  }
}
