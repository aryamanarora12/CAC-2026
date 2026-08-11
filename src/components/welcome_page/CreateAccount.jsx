import { useState } from "react";

import AuthForm from "./AuthForm";
import UserInfoForm from "./UserInfoForm";
import CareerTest from "./CareerTest";
import "./CreateAccount.css";


export default function CreateAccount({ onComplete }) {
  const [step, setStep] = useState("auth");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  function handleAuthSuccess(authData) {
    if (authData.user) {
      setUser(authData.user);
      setUsername(authData.username);
    } else {
      setUser(authData);
    }

    setStep("userinfo");
  }


  function handleUserInfoComplete() {
    setStep("career");
  }

  function handleCareerComplete() {
    onComplete();
  }

  return (
    <div className="create-account">

      {step === "auth" && (
        <AuthForm mode="signup" onSuccess={handleAuthSuccess} />
      )}


      {step === "userinfo" && (
        <UserInfoForm
          user={user}
          onSubmit={handleUserInfoComplete}
        />
      )}

      {step === "career" && (
        <CareerTest
          user={user}
          onComplete={handleCareerComplete}
        />
      )}

    </div>
  );
}
