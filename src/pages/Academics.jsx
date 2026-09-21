import { Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";

function Academics() {

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Make every class count</p>
          <Typography component="h1" className="subpage-title">Academics</Typography>
          <p className="subpage-description">Track the courses and habits that support the future you are building.</p>
        </header>
      </main>
    </div>
  );

}

export default Academics;