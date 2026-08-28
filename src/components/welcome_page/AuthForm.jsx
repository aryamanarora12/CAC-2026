import { useState } from "react";
import "./AuthForm.css";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
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

      onSuccess(userCred.user);
    } catch (error) {
      console.error("Login error:", error);

      // Temporary detailed error while debugging
      setError(`${error.code}: ${error.message}`);
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
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      onSuccess({
        user: userCred.user,
        username: username,
      });
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(`${error.code}: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // GOOGLE LOGIN / SIGNUP
  // ==========================================
  async function handleGoogle(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google authentication successful:", result.user);

      onSuccess(result.user);
    } catch (error) {
      console.error("Google authentication error:", error);

      // Show the actual Firebase error while debugging
      setError(`${error.code}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <form
      className="auth-form"
      onSubmit={isSignup ? handleSignup : handleLogin}
    >
      <h2>{isSignup ? "Create Your Account" : "Welcome Back"}</h2>

      {/* USERNAME - SIGNUP ONLY */}
      {isSignup && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />

      {/* ERROR */}
      {error && <p className="auth-error">{error}</p>}

      {/* EMAIL LOGIN / SIGNUP */}
      <button type="submit" disabled={loading}>
        {loading
          ? "Please wait..."
          : isSignup
          ? "Create Account"
          : "Login"}
      </button>

      {/* GOOGLE */}
      <button
        type="button"
        className="google-btn"
        onClick={handleGoogle}
        disabled={loading}
      >
        {loading ? "Please wait..." : "Continue with Google"}
      </button>
    </form>
  );
}