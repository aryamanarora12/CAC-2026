import { useEffect, useState } from "react";
import { CalendarTodayOutlined, Google, Mail, Person } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/components/Global/Navbar";
import { auth, db } from "../firebase";
import "./Profile.css";

function formatDate(dateString) {
  if (!dateString) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getAccountAge(dateString) {
  if (!dateString) return "Not available";

  const createdAt = new Date(dateString);
  const now = new Date();
  let years = now.getFullYear() - createdAt.getFullYear();
  let months = now.getMonth() - createdAt.getMonth();

  if (now.getDate() < createdAt.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0 && months === 0) return "Less than a month";

  const yearLabel = years === 1 ? "year" : "years";
  const monthLabel = months === 1 ? "month" : "months";

  return [years > 0 && `${years} ${yearLabel}`, months > 0 && `${months} ${monthLabel}`]
    .filter(Boolean)
    .join(", ");
}

function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfileName("");
        return;
      }

      const profileSnapshot = await getDoc(doc(db, "users", currentUser.uid));
      setProfileName(profileSnapshot.data()?.name || "");
    });

    return unsubscribe;
  }, []);

  const name = profileName || user?.displayName || user?.email?.split("@")[0] || "Account holder";
  const email = user?.email || "Not available";
  const isGoogleConnected = user?.providerData?.some(
    (provider) => provider.providerId === "google.com"
  );
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="subpage">
      <Navbar />
      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Your college story</p>
          <Typography component="h1" className="subpage-title">My Profile</Typography>
          <p className="subpage-description">Your account details and connected sign-in methods.</p>
        </header>

        <section className="profile-layout" aria-label="Profile details">
          <article className="profile-card profile-card-primary">
            <div className="profile-identity">
              <div className="profile-avatar" aria-hidden="true">{initial}</div>
              <div>
                <p className="profile-label">Account name</p>
                <h2 className="profile-name">{name}</h2>
                <p className="profile-email">{email}</p>
              </div>
            </div>

            <div className="profile-detail-list">
              <div className="profile-detail">
                <span className="profile-detail-icon"><Person /></span>
                <div>
                  <p className="profile-label">Name</p>
                  <p className="profile-value">{name}</p>
                </div>
              </div>
              <div className="profile-detail">
                <span className="profile-detail-icon"><Mail /></span>
                <div>
                  <p className="profile-label">Email address</p>
                  <p className="profile-value">{email}</p>
                </div>
              </div>
            </div>
          </article>

          <div className="profile-side-column">
            <article className="profile-card connection-card">
              <div className="card-heading">
                <div>
                  <p className="profile-label">Sign-in method</p>
                  <h2>Google connection</h2>
                </div>
                <Google className="google-mark" aria-hidden="true" />
              </div>
              <div className={`connection-status ${isGoogleConnected ? "is-connected" : ""}`}>
                <span className="status-dot" aria-hidden="true" />
                {isGoogleConnected ? "Connected" : "Not connected"}
              </div>
              <p className="card-supporting-text">
                {isGoogleConnected
                  ? "Your Google account can be used to sign in to Nex."
                  : "Your account is currently using email and password sign-in."}
              </p>
            </article>

            <article className="profile-card account-age-card">
              <div className="card-heading">
                <div>
                  <p className="profile-label">Account history</p>
                  <h2>Account age</h2>
                </div>
                <CalendarTodayOutlined className="calendar-mark" aria-hidden="true" />
              </div>
              <p className="account-age">{getAccountAge(user?.metadata?.creationTime)}</p>
              <p className="card-supporting-text">
                Created {formatDate(user?.metadata?.creationTime)}
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );

}

export default Profile;