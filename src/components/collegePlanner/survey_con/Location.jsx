const locationOptions = [
  "In-state",
  "Preferred state",
  "Out-of-state",
  "Anywhere in the U.S."
];

const regionOptions = [
  "Northeast",
  "Southeast",
  "Midwest",
  "Southwest",
  "West",
  "Pacific Northwest",
  "No preference"
];

const cityOptions = [
  "Major city",
  "Near a city",
  "Suburban area",
  "Rural area",
  "No preference"
];

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

export default function Location({ answers, onChange }) {

  return (
    <div>

      <div className="section-title">
        <span className="question-number">02</span>

        <div>
          <h3>Location</h3>

          <p>
            Where would you like to attend college?
          </p>
        </div>
      </div>


      <div className="survey-question">

        <label>
          Where are you willing to attend?
        </label>

        <div className="option-grid">

          {locationOptions.map((option) => (

            <button
              type="button"
              key={option}
              className={
                answers.preference === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({
                  preference: option
                })
              }
            >
              {answers.preference === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>


      {answers.preference === "Preferred state" && (

        <div className="survey-question">

          <label>
            Which state do you prefer?
          </label>

          <select
            value={answers.state}
            onChange={(e) =>
              onChange({
                state: e.target.value
              })
            }
          >
            <option value="">
              Select a state
            </option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}

          </select>

        </div>

      )}


      <div className="survey-question">

        <label>
          Which region interests you?
        </label>

        <div className="option-grid">

          {regionOptions.map((option) => (

            <button
              type="button"
              key={option}
              className={
                answers.region === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({
                  region: option
                })
              }
            >
              {answers.region === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>


      <div className="survey-question">

        <label>
          How close would you like to be to a city?
        </label>

        <div className="option-grid">

          {cityOptions.map((option) => (

            <button
              type="button"
              key={option}
              className={
                answers.cityProximity === option
                  ? "survey-option selected"
                  : "survey-option"
              }
              onClick={() =>
                onChange({
                  cityProximity: option
                })
              }
            >
              {answers.cityProximity === option && "✓ "}
              {option}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}