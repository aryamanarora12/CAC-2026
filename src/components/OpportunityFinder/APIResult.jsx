import "./APIResult.css";


export default function APIResult({
  opportunities,
  opportunityType,
  onSelectOpportunity,
  onBack
}) {
  const safeOpportunities = Array.isArray(opportunities)
    ? opportunities
    : [];

  console.log("APIResult opportunities:", opportunities);
  console.log("Safe opportunities:", safeOpportunities);

  return (
    <div className="api-results">


      <div className="results-header">

        <h1>
          {opportunityType
            ? opportunityType.charAt(0).toUpperCase() + opportunityType.slice(1)
            : ""}{" "}
          Opportunities
        </h1>

        <p>
          Here are opportunities that match what you're looking for.
        </p>

      </div>


      {safeOpportunities.length === 0 ? (

        <div className="no-results">
          <h2>No opportunities found</h2>

          <p>
            Try searching for a different type of opportunity.
          </p>
        </div>

      ) : (

        <div className="results-grid">

          {safeOpportunities.map((opportunity) => (

            <div
              className="opportunity-card"
              key={opportunity.id}
            >

              <div className="opportunity-card-top">

                <span className="opportunity-type">
                  {opportunity.type}
                </span>

                <span className="match-score">
                  {opportunity.matchScore}% Match
                </span>

              </div>


              <h2>
                {opportunity.title}
              </h2>


              <h3>
                {opportunity.organization}
              </h3>


              <p className="opportunity-description">
                {opportunity.description}
              </p>


              <div className="opportunity-details">

                <span>
                  📍 {opportunity.location}
                </span>

                <span>
                  📅 {opportunity.deadline}
                </span>

              </div>


              <button
                className="select-opportunity-button"
                onClick={() =>
                  onSelectOpportunity(opportunity)
                }
              >
                Confirm Opportunity
              </button>

            </div>

          ))}

        </div>

      )}
      <button
        className="results-back-button"
        onClick={onBack}
      >
        ← Back
      </button>
    </div>
  );
}