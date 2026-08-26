const MIN_COST = 0;
const MAX_COST = 80000;
const STEP = 1000;

export default function Cost({ answers, onChange }) {

  const minimum = answers.minimum;
  const maximum = answers.maximum;

  return (
    <div>

      <div className="section-title">
        <span className="question-number">03</span>

        <div>
          <h3>College Cost</h3>

          <p>
            What annual college cost range are you comfortable considering?
          </p>
        </div>
      </div>


      <div className="survey-question">

        <label>
          Estimated yearly cost of attendance
        </label>

        <p className="question-description">
          Set the minimum and maximum yearly cost you'd like us to consider.
        </p>


        <div className="cost-values">

          <div>
            <span>Minimum</span>
            <strong>
              ${minimum.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Maximum</span>
            <strong>
              ${maximum.toLocaleString()}
            </strong>
          </div>

        </div>


        <div className="slider-container">

          <label>
            Minimum cost
          </label>

          <input
            type="range"
            min={MIN_COST}
            max={MAX_COST}
            step={STEP}
            value={minimum}
            onChange={(e) => {

              const value = Number(e.target.value);

              if (value <= maximum) {
                onChange({
                  minimum: value
                });
              }

            }}
          />

        </div>


        <div className="slider-container">

          <label>
            Maximum cost
          </label>

          <input
            type="range"
            min={MIN_COST}
            max={MAX_COST}
            step={STEP}
            value={maximum}
            onChange={(e) => {

              const value = Number(e.target.value);

              if (value >= minimum) {
                onChange({
                  maximum: value
                });
              }

            }}
          />

        </div>

      </div>

    </div>
  );
}