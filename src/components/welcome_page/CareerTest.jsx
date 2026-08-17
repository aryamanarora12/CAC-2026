
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CAREER_DATABASE from "../../data/careerDatabase";
import "./CareerTest.css";

// =====================================================
// 30 RIASEC QUESTIONS
//
// R = Realistic
// I = Investigative
// A = Artistic
// S = Social
// E = Enterprising
// C = Conventional
// =====================================================

const QUESTIONS = [
  // REALISTIC
  {
    q: "I enjoy working with tools or machinery.",
    score: "R"
  },
  {
    q: "I like fixing things when they break.",
    score: "R"
  },
  {
    q: "I prefer hands-on tasks over purely theoretical tasks.",
    score: "R"
  },
  {
    q: "I enjoy building or assembling things.",
    score: "R"
  },
  {
    q: "I enjoy working with technology, equipment, or physical objects.",
    score: "R"
  },

  // INVESTIGATIVE
  {
    q: "I enjoy solving complex problems.",
    score: "I"
  },
  {
    q: "I like analyzing data to find patterns.",
    score: "I"
  },
  {
    q: "I enjoy scientific or mathematical tasks.",
    score: "I"
  },
  {
    q: "I like conducting research to understand how things work.",
    score: "I"
  },
  {
    q: "I enjoy solving puzzles that require logical thinking.",
    score: "I"
  },

  // ARTISTIC
  {
    q: "I enjoy creating art or designs.",
    score: "A"
  },
  {
    q: "I like expressing myself creatively.",
    score: "A"
  },
  {
    q: "I enjoy writing, drawing, music, or other creative activities.",
    score: "A"
  },
  {
    q: "I enjoy designing things in my own style.",
    score: "A"
  },
  {
    q: "I like finding creative solutions to problems.",
    score: "A"
  },

  // SOCIAL
  {
    q: "I enjoy helping people solve problems.",
    score: "S"
  },
  {
    q: "I like teaching or mentoring others.",
    score: "S"
  },
  {
    q: "I enjoy working with groups.",
    score: "S"
  },
  {
    q: "I like volunteering or helping my community.",
    score: "S"
  },
  {
    q: "I enjoy helping classmates or teammates succeed.",
    score: "S"
  },

  // ENTERPRISING
  {
    q: "I enjoy leading or persuading others.",
    score: "E"
  },
  {
    q: "I like starting projects or businesses.",
    score: "E"
  },
  {
    q: "I enjoy taking initiative when working toward a goal.",
    score: "E"
  },
  {
    q: "I enjoy leading group discussions or projects.",
    score: "E"
  },
  {
    q: "I enjoy planning events or organizing people toward a goal.",
    score: "E"
  },

  // CONVENTIONAL
  {
    q: "I enjoy organizing information.",
    score: "C"
  },
  {
    q: "I like working with numbers, records, or spreadsheets.",
    score: "C"
  },
  {
    q: "I prefer structured tasks with clear instructions.",
    score: "C"
  },
  {
    q: "I enjoy organizing schedules and keeping things on track.",
    score: "C"
  },
  {
    q: "I like keeping records and information neat and organized.",
    score: "C"
  }
];

// =====================================================
// MANUAL CAREER OPTIONS
// =====================================================

const CAREERS = [
  "Computer Science",
  "Engineering",
  "Medicine",
  "Business",
  "Graphic Design",
  "Psychology",
  "Finance",
  "Biology",
  "Marketing",
  "Law"
];

// =====================================================
// RIASEC SCORING
//
// Strongly Agree = +2
// Agree          = +1
// Neutral        = 0
// Disagree       = -1
// Strongly Agree = -2
// =====================================================

function scoreRIASEC(answers) {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0
  };

  answers.forEach((answer) => {
    scores[answer.code] += answer.value;
  });

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);

  const riasecCode = sorted.slice(0, 3).join("");

  return {
    scores,
    riasecCode
  };
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function CareerTest({ user, onComplete }) {
  const [mode, setMode] = useState("menu");
  const [manualCareer, setManualCareer] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);
  const [recommendedCareers, setRecommendedCareers] = useState([]);

  // ===================================================
  // SAVE CAREER TO FIREBASE
  // ===================================================

    async function saveCareer(career) {
        try {
            await setDoc(
            doc(db, "users", user.uid),
            {
                major: career
            },
            {
                merge: true
            }
            );

            if (onComplete) {
            onComplete();
            }

        } catch (error) {
            console.error("Error saving career:", error);
            alert("There was an error saving your career.");
        }
    }

  // ===================================================
  // START TEST
  // ===================================================

  function startTest() {
    setIndex(0);
    setAnswers([]);
    setTestResult(null);
    setRecommendedCareers([]);
    setMode("test");
  }

  // ===================================================
  // ANSWER QUESTION
  // ===================================================

  function answerQuestion(value) {
    const currentQuestion = QUESTIONS[index];

    const newAnswer = {
      code: currentQuestion.score,
      value: value
    };

    // Create the complete answer list.
    // This guarantees the final answer is included.
    const updatedAnswers = [...answers, newAnswer];

    setAnswers(updatedAnswers);

    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      finishTest(updatedAnswers);
    }
  }

  // ===================================================
  // FINISH TEST
  // SCORE -> CAREER DATABASE
  // ===================================================

  function finishTest(finalAnswers) {
    const result = scoreRIASEC(finalAnswers);

    setTestResult(result);
    setMode("loading");

    // Compare the student's RIASEC scores
    // against every career in the database.
    const rankedCareers = CAREER_DATABASE
      .map((career) => {
        let distance = 0;

        Object.keys(result.scores).forEach((letter) => {
          distance += Math.abs(
            result.scores[letter] - career.riasec[letter]
          );
        });

        return {
          ...career,
          distance
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setRecommendedCareers(rankedCareers);
    setMode("results");
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <div className="career-test-container">
      <h1>Ready to find a career that suits you?</h1>
      <h3>Take a quick test to find a career that suits you best or select one of your liking.</h3>
      
      {/* MENU */}
      {mode === "menu" && (
        <div className="menu">
          

          <button onClick={() => setMode("manual")}>
            Select a Career Manually
          </button>

          <button onClick={startTest}>
            Take a Career Test
          </button>
        </div>
      )}

      {/* MANUAL CAREER SELECT */}
      {mode === "manual" && (
        <div className="manual-select">
          <h2>Select a Career</h2>

          <select
            value={manualCareer}
            onChange={(e) => setManualCareer(e.target.value)}
          >
            <option value="">
              Choose a career
            </option>

            {CAREERS.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>

          <button
            disabled={!manualCareer}
            onClick={() => saveCareer(manualCareer)}
          >
            Continue
          </button>
        </div>
      )}

      {/* CAREER TEST */}
      {mode === "test" && (
        <div className="test">
          <h2>Career Assessment</h2>

          <p>
            Question {index + 1} of {QUESTIONS.length}
          </p>

          <h3>
            {QUESTIONS[index].q}
          </h3>

          <div className="answer-buttons">

            <button onClick={() => answerQuestion(2)}>
              Strongly Agree
            </button>

            <button onClick={() => answerQuestion(1)}>
              Agree
            </button>

            <button onClick={() => answerQuestion(0)}>
              Neutral
            </button>

            <button onClick={() => answerQuestion(-1)}>
              Disagree
            </button>

            <button onClick={() => answerQuestion(-2)}>
              Strongly Disagree
            </button>

          </div>
        </div>
      )}

      {/* LOADING */}
      {mode === "loading" && (
        <div className="loading">
          <h2>
            Analyzing your interests...
          </h2>

          <p>
            Finding career recommendations...
          </p>
        </div>
      )}

      {/* RESULTS */}
      {mode === "results" && testResult && (
        <div className="results">

          <h2>Your RIASEC Code</h2>

          <h1>
            {testResult.riasecCode}
          </h1>

          <h3>Your Interest Scores</h3>

          <div className="riasec-scores">

            <p>
              <strong>R — Realistic:</strong>{" "}
              {testResult.scores.R}
            </p>

            <p>
              <strong>I — Investigative:</strong>{" "}
              {testResult.scores.I}
            </p>

            <p>
              <strong>A — Artistic:</strong>{" "}
              {testResult.scores.A}
            </p>

            <p>
              <strong>S — Social:</strong>{" "}
              {testResult.scores.S}
            </p>

            <p>
              <strong>E — Enterprising:</strong>{" "}
              {testResult.scores.E}
            </p>

            <p>
              <strong>C — Conventional:</strong>{" "}
              {testResult.scores.C}
            </p>

          </div>

          <h3>Your Top Career Matches</h3>

          <p>
            Select a career to add to your profile.
          </p>

          {recommendedCareers.map((career) => (
            <div
              className="career-result"
              key={career.name}
            >
              <h4>{career.name}</h4>

              <p>
                <strong>{career.category}</strong>
              </p>

              <p>
                {career.description}
              </p>

              <button
                onClick={() => saveCareer(career.name)}
              >
                Choose This Career
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

