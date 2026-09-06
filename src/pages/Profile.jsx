import { Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";

function Profile() {

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Your college story</p>
          <Typography component="h1" className="subpage-title">My Profile</Typography>
          <p className="subpage-description">Keep your interests, goals, and application details in one place.</p>
        </header>
      </main>
    </div>
  );

}

export default Profile;