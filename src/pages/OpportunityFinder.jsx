import OpportunityFinderComponent from "../components/OpportunityFinder/OpportunityFinder";
import NavBar from "../components/components/Global/Navbar";
import SavedOpportunities from "../components/OpportunityFinder/SavedOpportunities";
import "./OpportunityFinder.css";
import { useState } from "react";

function OpportunityFinder() {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="OpportunityFinder-page">
      <NavBar />

      <OpportunityFinderComponent />

      <div className="OpportunityHistory">
        <button onClick={() => setShowSaved(!showSaved)}>
          {showSaved
            ? "Hide Saved Opportunities"
            : "My Saved Opportunities"}
        </button>

        {showSaved && <SavedOpportunities />}
      </div>
    </div>
  );
}

export default OpportunityFinder;