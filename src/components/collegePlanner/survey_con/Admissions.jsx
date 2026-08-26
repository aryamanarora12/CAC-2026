const testingOptions = [
  "SAT",
  "ACT",
  "Either SAT or ACT",
  "Prefer test-optional",
  "No preference"
];

const essayOptions = [
  "Comfortable writing essays",
  "Prefer fewer essays",
  "No preference"
];

const recommendationOptions = [
  "Comfortable getting recommendations",
  "Prefer schools that require fewer",
  "No preference"
];

const extracurricularOptions = [
  "Prefer schools that value extracurriculars",
  "Prefer schools focused more on academics",
  "No preference"
];

const interviewOptions = [
  "Comfortable with interviews",
  "Prefer no interview",
  "No preference"
];

export default function Admissions({ answers, onChange }) {

  function Question({
    title,
    description,
    options,
    value,
    field
  }) {

    return (
      <div className="survey-question">

        <label>{title}</label>

        <p className="question-description">
          {description}
        </p>

        <div className="option-grid">

          {options.map((option) => (

            <button
              type="button"
              key={option}
              className={
                value === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({
                  [field]: option
                })
              }
            >
              {value === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>
    );
  }

  return (
    <div>

      <div className="section-title">

        <span className="question-number">
          06
        </span>

        <div>
          <h3>Admissions</h3>

          <p>
            What kind of application requirements are you comfortable with?
          </p>
        </div>

      </div>


      <Question
        title="Standardized testing"
        description="What is your preference for SAT or ACT requirements?"
        options={testingOptions}
        value={answers.testing}
        field="testing"
      />


      <Question
        title="Essays"
        description="How do you feel about college application essays?"
        options={essayOptions}
        value={answers.essays}
        field="essays"
      />


      <Question
        title="Letters of recommendation"
        description="What is your preference?"
        options={recommendationOptions}
        value={answers.recommendations}
        field="recommendations"
      />


      <Question
        title="Extracurricular activities"
        description="How would you like colleges to consider extracurricular involvement?"
        options={extracurricularOptions}
        value={answers.extracurriculars}
        field="extracurriculars"
      />


      <Question
        title="Interviews"
        description="What is your preference for admissions interviews?"
        options={interviewOptions}
        value={answers.interviews}
        field="interviews"
      />

    </div>
  );
}