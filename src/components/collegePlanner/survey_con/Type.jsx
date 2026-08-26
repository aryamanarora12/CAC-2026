const collegeTypes = [
  "Community college",
  "Public university",
  "Private university",
  "Liberal arts college",
  "Research university",
  "Technical / specialized college",
  "No preference"
];

export default function CollegeType({ answers, onChange }) {

  function toggleOption(option) {

    if (option === "No preference") {
      onChange(["No preference"]);
      return;
    }

    let updated = answers.filter(
      (item) => item !== "No preference"
    );

    if (updated.includes(option)) {
      updated = updated.filter(
        (item) => item !== option
      );
    } else {
      updated = [...updated, option];
    }

    onChange(updated);
  }

  return (
    <div>

      <div className="section-title">

        <span className="question-number">
          04
        </span>

        <div>
          <h3>College Type</h3>

          <p>
            What types of colleges are you interested in?
          </p>
        </div>

      </div>


      <div className="survey-question">

        <label>
          Select all that interest you.
        </label>

        <p className="question-description">
          You can choose multiple options.
        </p>

        <div className="option-grid">

          {collegeTypes.map((option) => {

            const selected =
              answers.includes(option);

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
                  toggleOption(option)
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