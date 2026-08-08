import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./UserInfoForm.css";

export default function UserInfoForm({ user, onSubmit }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [interests, setInterests] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name,
          school,
          age: Number(age),
          state,
          interests
        },
        {
          merge: true
        }
      );

      onSubmit();

    } catch (error) {
      console.error("Error saving user information:", error);
      setError("Could not save your information. Please try again.");
    }
  }

  return (
    <div className="userinfo-form">

      <h2>Create Your Profile</h2>

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <textarea
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />

        <button type="submit">
          Continue
        </button>

      </form>

    </div>
  );
}
