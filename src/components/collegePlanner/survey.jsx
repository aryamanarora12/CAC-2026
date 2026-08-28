import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";

import Admissions from "./survey_con/Admissions";
import Campus from "./survey_con/Campus";
import Cost from "./survey_con/Cost";
import Location from "./survey_con/Location";
import CareerOutcomes from "./survey_con/Outcomes";
import CollegeType from "./survey_con/Type";

import "./Survey.css";


export default function Survey({ user, onComplete }) {

  /* =====================================================
     CURRENT SURVEY SECTION
     ===================================================== */

  const [currentSection, setCurrentSection] = useState(0);


  /* =====================================================
     ALL SURVEY ANSWERS
     ===================================================== */

  const [answers, setAnswers] = useState({

    campusLife: {
      setting: "",
      housing: "",
      culture: []
    },

    location: {
      preference: "",
      state: "",
      region: "",
      cityProximity: ""
    },

    cost: {
      minimum: 10000,
      maximum: 150000
    },

    collegeType: [],

    careerOutcomes: {
      priorities: [],
      programs: []
    },

    admissions: {
      testing: "",
      essays: "",
      recommendations: "",
      extracurriculars: "",
      interviews: ""
    }

  });


  /* =====================================================
     ERROR / LOADING STATE
     ===================================================== */

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);


  /* =====================================================
     UPDATE OBJECT-BASED SECTIONS
     
     Used for:
     - Campus Life
     - Location
     - Cost
     - Career Outcomes
     - Admissions
     ===================================================== */

  function updateSection(section, data) {

    setAnswers((current) => ({

      ...current,

      [section]: {
        ...current[section],
        ...data
      }

    }));

  }


  /* =====================================================
     UPDATE ARRAY-BASED SECTIONS
     
     Used for:
     - College Type
     ===================================================== */

  function updateArraySection(section, data) {

    setAnswers((current) => ({

      ...current,

      [section]: data

    }));

  }


  /* =====================================================
     VALIDATE CURRENT SECTION
     ===================================================== */

  function validateCurrentSection() {

    setError("");

    /* CAMPUS LIFE */

    if (currentSection === 0) {

      if (!answers.campusLife.setting) {

        setError(
          "Please select a campus setting."
        );

        return false;
      }

      if (!answers.campusLife.housing) {

        setError(
          "Please select a housing preference."
        );

        return false;
      }

      if (
        !answers.campusLife.culture ||
        answers.campusLife.culture.length === 0
      ) {

        setError(
          "Please select at least one student culture preference."
        );

        return false;
      }

    }


    /* LOCATION */

    if (currentSection === 1) {

      if (!answers.location.preference) {

        setError(
          "Please select a location preference."
        );

        return false;
      }

      if (
        answers.location.preference === "Preferred state" &&
        !answers.location.state
      ) {

        setError(
          "Please select your preferred state."
        );

        return false;
      }

      if (!answers.location.region) {

        setError(
          "Please select a preferred region."
        );

        return false;
      }

      if (!answers.location.cityProximity) {

        setError(
          "Please select your preferred city proximity."
        );

        return false;
      }

    }


    /* COST */

    if (currentSection === 2) {

      if (
        answers.cost.minimum >
        answers.cost.maximum
      ) {

        setError(
          "Your minimum cost cannot be greater than your maximum cost."
        );

        return false;
      }

    }


    /* COLLEGE TYPE */

    if (currentSection === 3) {

      if (
        !answers.collegeType ||
        answers.collegeType.length === 0
      ) {

        setError(
          "Please select at least one college type."
        );

        return false;
      }

    }


    /* CAREER OUTCOMES */

    if (currentSection === 4) {

      if (
        !answers.careerOutcomes.priorities ||
        answers.careerOutcomes.priorities.length === 0
      ) {

        setError(
          "Please select at least one career priority."
        );

        return false;
      }

      if (
        !answers.careerOutcomes.programs ||
        answers.careerOutcomes.programs.length === 0
      ) {

        setError(
          "Please select at least one program or field."
        );

        return false;
      }

    }


    /* ADMISSIONS */

    if (currentSection === 5) {

      if (!answers.admissions.testing) {

        setError(
          "Please select your testing preference."
        );

        return false;
      }

      if (!answers.admissions.essays) {

        setError(
          "Please select your essay preference."
        );

        return false;
      }

      if (!answers.admissions.recommendations) {

        setError(
          "Please select your recommendation preference."
        );

        return false;
      }

      if (!answers.admissions.extracurriculars) {

        setError(
          "Please select your extracurricular preference."
        );

        return false;
      }

      if (!answers.admissions.interviews) {

        setError(
          "Please select your interview preference."
        );

        return false;
      }

    }

    return true;
  }


  /* =====================================================
     SAVE SURVEY TO FIREBASE
     ===================================================== */

  async function saveSurvey() {

    if (!user || !user.uid) {

      setError(
        "We could not identify your account. Please sign in again."
      );

      return;

    }

    setSaving(true);
    setError("");

    try {

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {
          collegeSearchPreferences: answers
        },

        {
          merge: true
        }

      );

      console.log(
        "College search preferences saved:",
        answers
      );

      /*
        Tell Search.jsx that the survey is finished.

        Search.jsx can then switch from:

        Survey → SearchResult
      */

      if (onComplete) {
        onComplete(answers);
      }

    } catch (error) {

      console.error(
        "Error saving college search preferences:",
        error
      );

      setError(
        "Could not save your college search preferences. Please try again."
      );

    } finally {

      setSaving(false);

    }

  }


  /* =====================================================
     NEXT SECTION
     ===================================================== */

  async function nextSection() {

    if (!validateCurrentSection()) {
      return;
    }

    /*
      There are 6 sections:

      0 = Campus Life
      1 = Location
      2 = Cost
      3 = College Type
      4 = Career & Outcomes
      5 = Admissions
    */

    if (currentSection < 5) {

      setCurrentSection(
        (current) => current + 1
      );

      return;
    }

    /*
      If we're on section 5,
      the survey is finished.
    */

    await saveSurvey();

  }


  /* =====================================================
     PREVIOUS SECTION
     ===================================================== */

  function previousSection() {

    setError("");

    if (currentSection > 0) {

      setCurrentSection(
        (current) => current - 1
      );

    }

  }


  /* =====================================================
     PROGRESS
     ===================================================== */

  const totalSections = 6;

  const progress =
    ((currentSection + 1) / totalSections) * 100;


  /* =====================================================
     RENDER
     ===================================================== */

  return (

    <div className="college-survey-page">

      <div className="college-survey-card">


        {/* =============================================
            HEADER
            ============================================= */}

        <div className="survey-header">

          <p className="survey-step">
            STEP {currentSection + 1} OF {totalSections}
          </p>

          <h2>
            Find Your College Match
          </h2>

          <p>
            Tell us what you're looking for in a college.
          </p>

        </div>


        {/* =============================================
            PROGRESS BAR
            ============================================= */}

        <div className="survey-progress-container">

          <div className="survey-progress-bar">

            <div
              className="survey-progress"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>


        {/* =============================================
            ERROR
            ============================================= */}

        {error && (

          <p className="auth-error">
            {error}
          </p>

        )}


        {/* =============================================
            CURRENT SECTION
            ============================================= */}

        <div className="survey-section">


          {/* CAMPUS LIFE */}

          {currentSection === 0 && (

            <Campus
              answers={answers.campusLife}
              onChange={(data) =>
                updateSection(
                  "campusLife",
                  data
                )
              }
            />

          )}


          {/* LOCATION */}

          {currentSection === 1 && (

            <Location
              answers={answers.location}
              onChange={(data) =>
                updateSection(
                  "location",
                  data
                )
              }
            />

          )}


          {/* COST */}

          {currentSection === 2 && (

            <Cost
              answers={answers.cost}
              onChange={(data) =>
                updateSection(
                  "cost",
                  data
                )
              }
            />

          )}

          
          {/* COLLEGE TYPE */}
          
          {currentSection === 3 && (

            <CollegeType
              answers={answers.collegeType}
              onChange={(data) =>
                updateArraySection(
                  "collegeType",
                  data
                )
              }
            />

          )}
          

          {/* CAREER & OUTCOMES */}

          {currentSection === 4 && (

            <CareerOutcomes
              answers={answers.careerOutcomes}
              onChange={(data) =>
                updateSection(
                  "careerOutcomes",
                  data
                )
              }
            />

          )}


          {/* ADMISSIONS */}

          {currentSection === 5 && (

            <Admissions
              answers={answers.admissions}
              onChange={(data) =>
                updateSection(
                  "admissions",
                  data
                )
              }
            />

          )}

        </div>


        {/* =============================================
            NAVIGATION
            ============================================= */}

        <div className="survey-navigation">


          {/* BACK */}

          {currentSection > 0 && (

            <button
              type="button"
              className="back-button"
              onClick={previousSection}
              disabled={saving}
            >
              ← Back
            </button>

          )}


          {/* NEXT / FINISH */}

          <button
            type="button"
            className="continue-button"
            onClick={nextSection}
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : currentSection === 5
                ? "Find My Colleges →"
                : "Continue →"
            }

          </button>

        </div>


      </div>

    </div>

  );
}