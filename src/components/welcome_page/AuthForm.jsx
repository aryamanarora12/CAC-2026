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
          <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z" />
          <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z" />
          <path fill="#FBBC05" d="M6.54 13.84a5.86 5.86 0 0 1 0-3.68V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.53Z" />
          <path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.22 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.63l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z" />
        </svg>

        {loading ? "Please wait..." : "Continue with Google"}

      </button>
    </form>
  );
}