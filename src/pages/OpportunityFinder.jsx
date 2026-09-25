import { Typography } from "@mui/material";
import OpportunityFinderComponent from "../components/OpportunityFinder/OpportunityFinder";
import NavBar from "../components/components/Global/Navbar";
import SavedOpportunities from "../components/OpportunityFinder/SavedOpportunities";
import "./OpportunityFinder.css";
import { useState } from "react";

function OpportunityFinder() {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="subpage OpportunityFinder-page">
      <NavBar />

      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Find your fit</p>
          <Typography component="h1" className="subpage-title">
            Opportunity Finder
          </Typography>
          <p className="subpage-description">
            Explore scholarships, programs, and experiences that match your goals and interests.
          </p>
        </header>

        <OpportunityFinderComponent />

        <div className="OpportunityHistory">
          <button onClick={() => setShowSaved(!showSaved)}>
            {showSaved
              ? "Hide Saved Opportunities"
              : "My Saved Opportunities"}
          </button>

          {showSaved && <SavedOpportunities />}
        </div>
      </main>
    </div>
  );
}

export default OpportunityFinder;