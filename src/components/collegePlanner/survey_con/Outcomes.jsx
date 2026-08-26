const careerPriorities = [
  "High starting salary",
  "Strong employment opportunities",
  "Graduate school preparation",
  "Professional school preparation",
  "Entrepreneurship",
  "Research",
  "Major company opportunities",
  "Startup opportunities",
  "Public service",
  "International career opportunities",
  "I'm not sure yet"
];

const programOptions = [
  "Engineering",
  "Computer Science",
  "Business",
  "Medicine / Health",
  "Natural Sciences",
  "Social Sciences",
  "Arts & Humanities",
  "Research",
  "Technology",
  "Other"
];

export default function CareerOutcomes({ answers, onChange }) {

  function toggleItem(category, item) {

    const current = answers[category] || [];

    const updated = current.includes(item)
      ? current.filter((value) => value !== item)
      : [...current, item];

    onChange({
      [category]: updated
    });
  }

  return (
    <div>

      <div className="section-title">

        <span className="question-number">
          05
        </span>

        <div>
          <h3>Career & Outcomes</h3>

          <p>
            What do you want your college experience to help you achieve?
          </p>
        </div>

      </div>


      <div className="survey-question">

        <label>
          What matters most after college?
        </label>

        <p className="question-description">
          Select the outcomes that matter to you.
        </p>

        <div className="option-grid">

          {careerPriorities.map((option) => {

            const selected =
              answers.priorities?.includes(option);

            return (
              <button
                type="button"
                key={option}
                className={
                  selected
                    ? "survey-option selected"
                    : "survey-option"
                }
                onClick={() =>
                  toggleItem(
                    "priorities",
                    option
                  )
                }
              >
                {selected && "✓ "}
                {option}
              </button>
            );

          })}

        </div>

      </div>


      <div className="survey-question">

        <label>
          What fields or programs interest you?
        </label>

        <p className="question-description">
          Select all that apply.
        </p>

        <div className="option-grid">

          {programOptions.map((option) => {

            const selected =
              answers.programs?.includes(option);

            return (
              <button
                type="button"
                key={option}
                className={
                  selected
                    ? "survey-option selected"
                    : "survey-option"
                }
                onClick={() =>
                  toggleItem(
                    "programs",
                    option
                  )
                }
              >
                {selected && "✓ "}
                {option}
              </button>

            );

          })}

        </div>

      </div>

    </div>
  );
}