

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./UserInfoForm.css";
import CourseAutocomplete from "./CourseAutocomplete";


const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const interestOptions = [
  "Engineering",
  "Robotics",
  "Programming",
  "Computer Science",
  "Artificial Intelligence",
  "Science",
  "Mathematics",
  "Medicine",
  "Business",
  "Entrepreneurship",
  "Finance",
  "Writing",
  "Art & Design",
  "Music",
  "Law",
  "Psychology",
  "Environmental Science",
  "Architecture",
  "Other"
];

export default function UserInfoForm({ user, onSubmit }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [interests, setInterests] = useState([]);
  const [otherInterest, setOtherInterest] = useState("");
  const [pastCourses, setPastCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [error, setError] = useState("");

  function toggleInterest(interest) {
    setInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest);
      }

      return [...current, interest];
    });
  }

  function validateForm() {
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!nameRegex.test(name.trim())) {
      setError("Please enter a valid name.");
      return false;
    }

    if (age < 10 || age > 100) {
      setError("Please enter a valid age.");
      return false;
    }

    if (school.trim().length < 2) {
      setError("Please enter a valid school name.");
      return false;
    }

    if (!state) {
      setError("Please select your state.");
      return false;
    }

    if (interests.length === 0) {
      setError("Please select at least one interest.");
      return false;
    }

    if (
      interests.includes("Other") &&
      otherInterest.trim().length === 0
    ) {
      setError("Please enter your other interest.");
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const finalInterests = [
        ...interests.filter((interest) => interest !== "Other"),
        ...(interests.includes("Other") && otherInterest.trim()
          ? [otherInterest.trim()]
          : [])
      ];

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: name.trim(),
          school: school.trim(),
          age: Number(age),
          state,
          interests: finalInterests,
          pastCourses,
          currentCourses
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
    <div className="user-info-page">

      <div className="user-info-card">

        <div className="form-header">
          <p className="form-step">PROFILE SETUP</p>

          <h2>Create Your Profile</h2>

          <p>
            Tell us a little about yourself so we can
            personalize your experience.
          </p>
        </div>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="form-section section-right">
            <span className="question-number">01</span>

            <div className="question-content">
              <label>What should we call you?</label>

              <p className="question-description">
                Enter your full name.
              </p>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>


          {/* SCHOOL */}
          <div className="form-section section-right">
            <span className="question-number">02</span>

            <div className="question-content">
              <label>What school do you attend?</label>

              <p className="question-description">
                This helps us find opportunities available to you.
              </p>

              <input
                type="text"
                placeholder="Your School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </div>
          </div> 


          {/* AGE */}
          <div className="form-section section-right">
            <span className="question-number">03</span>

            <div className="question-content">
              <label>How old are you?</label>

              <p className="question-description">
                Your age helps us recommend age-appropriate opportunities.
              </p>

              <input
                type="number"
                placeholder="Age"
                min="13"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>


          {/* STATE */}
          <div className="form-section section-right">
            <span className="question-number">04</span>

            <div className="question-content">
              <label>Where are you located?</label>

              <p className="question-description">
                Select the state you live in.
              </p>

              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select your state</option>

                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* INTERESTS */}
          <div className="form-section section-right interests-section">
            <span className="question-number">05</span>

            <div className="question-content">

              <label>
                What are you interested in?
              </label>

              <p className="question-description">
                Select all that apply.
              </p>

              <div className="interest-options">
                {interestOptions.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    className={
                      interests.includes(interest)
                        ? "interest-option selected"
                        : "interest-option"
                    }
                    onClick={() => toggleInterest(interest)}
                  >
                    {interests.includes(interest) && "✓ "}
                    {interest}
                  </button>
                ))}
              </div>

              {interests.includes("Other") && (
                <input
                  className="other-interest"
                  type="text"
                  placeholder="Tell us about another interest..."
                  value={otherInterest}
                  onChange={(e) =>
                    setOtherInterest(e.target.value)
                  }
                />
              )}

            </div>
          </div>





          {/* PAST COURSES */}
          <div className="form-section section-right">
            <span className="question-number">06</span>

            <div className="question-content">

              <label>
                What courses have you taken?
              </label>

              <p className="question-description">
                Search for courses you have completed in previous years.
              </p>

              <CourseAutocomplete
                selectedCourses={pastCourses}
                onChange={setPastCourses}
                placeholder="Search past courses..."
              />

            </div>
          </div>

          {/* CURRENT COURSES */}
          <div className="form-section section-right">
            <span className="question-number">07</span>

            <div className="question-content">

              <label>
                What courses are you currently taking?
              </label>

              <p className="question-description">
                Search for the courses you are taking this year.
              </p>

              <CourseAutocomplete
                selectedCourses={currentCourses}
                onChange={setCurrentCourses}
                placeholder="Search current courses..."
              />

            </div>
          </div>
          <button
            type="submit"
            className="continue-button"
          >
            Continue →
          </button>
        </form>

      </div>

    </div>
  );
}

