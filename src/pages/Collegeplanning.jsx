import { Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";

function CollegePlanning() {

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Plan with purpose</p>
          <Typography component="h1" className="subpage-title">College Planning</Typography>
          <p className="subpage-description">Build a clear path from your next step to your college goals.</p>
        </header>
      </main>
    </div>
  );

}

export default CollegePlanning;