import { useState } from "react";
import "./AuthForm.css";

import { auth, googleProvider } from "../../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

export default function AuthForm({ mode = "login", onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  // ==========================================
  // EMAIL LOGIN
  // ==========================================

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send Firebase user back to Welcome.jsx
      onSuccess(userCred.user);

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // EMAIL SIGNUP
  // ==========================================

  async function handleSignup(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const userCred =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // Send Firebase user + username back
      onSuccess({
        user: userCred.user,
        username: username
      });

    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        setError(
          "An account with this email already exists."
        );
      } else if (error.code === "auth/weak-password") {
        setError(
          "Password must be at least 6 characters."
        );
      } else if (error.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      } else {
        setError(
          "Account creation failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // GOOGLE LOGIN / SIGNUP
  // ==========================================

  async function handleGoogle() {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      onSuccess(result.user);

    } catch (error) {
      console.error("Google authentication error:", error);

      setError(
        "Google authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="auth-form">

      <h2>
        {isSignup
          ? "Create Your Account"
          : "Welcome Back"}
      </h2>

      {isSignup && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      <button
        onClick={isSignup ? handleSignup : handleLogin}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : isSignup
            ? "Create Account"
            : "Login"}
      </button>

      <button
        className="google-btn"
        onClick={handleGoogle}
        disabled={loading}
      >
        Continue with Google
      </button>

    </div>
  );
}