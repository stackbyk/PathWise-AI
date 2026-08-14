// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// =========================================================
// FIREBASE CONFIGURATION
// =========================================================

const firebaseConfig = {
  apiKey: "AIzaSyD6GaYqQGkZWKfp55FOuyf2xWolxCei8mA",
  authDomain: "pathwise-ai-85e68.firebaseapp.com",
  projectId: "pathwise-ai-85e68",
  storageBucket: "pathwise-ai-85e68.firebasestorage.app",
  messagingSenderId: "653446986168",
  appId: "1:653446986168:web:02e074c843f635e1c0f74d",
  measurementId: "G-C15X29Z57D",
};

// =========================================================
// INITIALIZE FIREBASE
// =========================================================

const app = initializeApp(firebaseConfig);

// =========================================================
// FIREBASE AUTHENTICATION
// =========================================================

export const auth = getAuth(app);

export default app;
