import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/welcome_page/AuthForm";
import CreateAccount from "../components/welcome_page/CreateAccount"; 
import "./Welcome.css";

export default function Welcome() {
  const [screen, setScreen] = useState("login");

  const navigate = useNavigate();

  function handleLoginSuccess(user) {
    console.log("Logged in:", user.uid);
    navigate("/home");
  }

  function handleAccountComplete() {
    navigate("/home");
  }

  return (
    <>
      {screen === "login" && (
        <div className="welcome-page">

          <div className="welcome-container">

            <div className="welcome-header">
              <h1>CAC 2026</h1>

              <p>
                Log in to continue to your profile.
              </p>
            </div>

            <div className="login-section">

              <AuthForm
                mode="login"
                onSuccess={handleLoginSuccess}
              />

              <div className="create-account-option">

                <p>
                  Don't have an account?
                </p>

                <button
                  onClick={() => setScreen("create")}
                >
                  Create an Account
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {screen === "create" && (
        <CreateAccount
          onComplete={handleAccountComplete}
        />
      )}
    </>
  );
}
