const settingOptions = [
  "Rural",
  "Suburban",
  "Urban",
  "No preference"
];

const housingOptions = [
  "On-campus housing",
  "Off-campus housing",
  "Commuter",
  "No preference"
];

const cultureOptions = [
  "Sports & athletics",
  "Clubs & organizations",
  "Greek life",
  "Research-focused",
  "Arts & music",
  "STEM-focused",
  "Social & active",
  "Quiet & relaxed",
  "Diverse student community"
];

export default function CampusLife({ answers, onChange }) {

  function toggleCulture(option) {

    const current = answers.culture || [];

    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    onChange({
      culture: updated
    });
  }

  return (
    <div>

      <div className="section-title">
        <span className="question-number">01</span>

        <div>
          <h3>Campus Life</h3>

          <p>
            What kind of college environment would you enjoy?
          </p>
        </div>
      </div>


      {/* SETTING */}

      <div className="survey-question">

        <label>
          What type of campus setting do you prefer?
        </label>

        <p className="question-description">
          Think about the environment you'd like around campus.
        </p>

        <div className="option-grid">

          {settingOptions.map((option) => (

            <button
              type="button"
              key={option}
              className={
                answers.setting === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({ setting: option })
              }
            >
              {answers.setting === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>


      {/* HOUSING */}

      <div className="survey-question">

        <label>
          What type of living arrangement do you prefer?
        </label>

        <p className="question-description">
          Select the option that best fits you.
        </p>

        <div className="option-grid">

          {housingOptions.map((option) => (

            <button
              type="button"
              key={option}
              className={
                answers.housing === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({ housing: option })
              }
            >
              {answers.housing === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>


      {/* CULTURE */}

      <div className="survey-question">

        <label>
          What interests you about student culture?
        </label>

        <p className="question-description">
          Select all that apply.
        </p>

        <div className="option-grid">

          {cultureOptions.map((option) => {

            const selected =
              answers.culture?.includes(option);

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
                  toggleCulture(option)
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