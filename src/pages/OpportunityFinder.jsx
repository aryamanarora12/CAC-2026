import { Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";

function OpportunityFinder() {

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Find your next opening</p>
          <Typography component="h1" className="subpage-title">Opportunity Finder</Typography>
          <p className="subpage-description">Discover programs, scholarships, and experiences that fit your ambitions.</p>
        </header>
      </main>
    </div>
  );

}

export default OpportunityFinder;