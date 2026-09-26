import { useEffect, useState } from "react";
import { CalendarTodayOutlined, Google, Mail, Person } from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  reauthenticateWithPopup,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/components/Global/Navbar";
import UserInfoForm from "../components/welcome_page/UserInfoForm";
import CareerTest from "../components/welcome_page/CareerTest";
import { auth, db, googleProvider } from "../firebase";
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
  const [googleStatus, setGoogleStatus] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    visible: false,
    password: "",
    confirmPassword: "",
    status: "",
    loading: false,
  });
  const [retakeSurveyOpen, setRetakeSurveyOpen] = useState(false);
  const [retakeSurveyStep, setRetakeSurveyStep] = useState("userinfo");
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfileName("");
        setProfileData({});
        return;
      }

      const profileSnapshot = await getDoc(doc(db, "users", currentUser.uid));
      const data = profileSnapshot.data() || {};
      setProfileName(data.name || "");
      setProfileData(data);
    });

    return unsubscribe;
  }, []);

  const name = profileName || user?.displayName || user?.email?.split("@")[0] || "Account holder";
  const email = user?.email || "Not available";
  const isGoogleConnected = user?.providerData?.some(
    (provider) => provider.providerId === "google.com"
  );
  const hasPasswordSignIn = user?.providerData?.some(
    (provider) => provider.providerId === "password"
  );
  const initial = name.charAt(0).toUpperCase();
  const parseCourseList = (courses) => {
    if (!Array.isArray(courses) || courses.length === 0) {
      return [];
    }

    return courses
      .map((course) => {
        if (typeof course === "string") return course;
        if (course && typeof course === "object") return course.name || course.courseName || "Unknown course";
        return "";
      })
      .filter(Boolean);
  };

  const surveySelections = [
    { label: "School", value: profileData.school || "Not answered yet" },
    { label: "Age", value: profileData.age ? String(profileData.age) : "Not answered yet" },
    { label: "State", value: profileData.state || "Not answered yet" },
    {
      label: "Interests",
      value: Array.isArray(profileData.interests) && profileData.interests.length
        ? profileData.interests.join(", ")
        : "Not answered yet",
    },
    { label: "Career", value: profileData.major || "Not answered yet" },
  ];

  const courseGroups = [
    { label: "Courses taken", items: parseCourseList(profileData.pastCourses) },
    { label: "Courses taking", items: parseCourseList(profileData.currentCourses) },
  ];

  async function handleGoogleConnect() {
    try {
      setGoogleLoading(true);
      setGoogleStatus("");

      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setGoogleStatus("Google account connected successfully.");
    } catch (error) {
      console.error("Google connect error:", error);
      setGoogleStatus("Google sign-in was not completed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleCreatePassword(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      setPasswordForm((current) => ({
        ...current,
        status: "You need to be signed in before creating a password.",
      }));
      return;
    }

    if (passwordForm.password.length < 6) {
      setPasswordForm((current) => ({
        ...current,
        status: "Password must be at least 6 characters long.",
      }));
      return;
    }

    if (passwordForm.password !== passwordForm.confirmPassword) {
      setPasswordForm((current) => ({
        ...current,
        status: "Passwords do not match.",
      }));
      return;
    }

    try {
      setPasswordForm((current) => ({ ...current, loading: true, status: "" }));

      await reauthenticateWithPopup(auth.currentUser, googleProvider);
      await updatePassword(auth.currentUser, passwordForm.password);

      setPasswordForm({
        visible: false,
        password: "",
        confirmPassword: "",
        status: "Password created successfully.",
        loading: false,
      });

      setGoogleStatus("Google confirmation completed. Password created successfully.");
    } catch (error) {
      console.error("Password creation error:", error);
      setPasswordForm((current) => ({
        ...current,
        loading: false,
        status: "Google confirmation is required before creating a password.",
      }));
    }
  }

  return (
    <div className="subpage">
      <Navbar />
      {retakeSurveyOpen && (
        <div className="survey-retake-overlay" onClick={() => setRetakeSurveyOpen(false)}>
          <div className="survey-retake-modal" onClick={(e) => e.stopPropagation()}>
            <div className="survey-retake-header">
              <div>
                <p className="profile-label">Profile update</p>
                <h2>Retake onboarding survey</h2>
              </div>
              <button
                type="button"
                className="survey-retake-close"
                onClick={() => setRetakeSurveyOpen(false)}
              >
                ×
              </button>
            </div>

            {retakeSurveyStep === "userinfo" ? (
              <UserInfoForm
                user={user}
                onSubmit={() => setRetakeSurveyStep("career")}
              />
            ) : (
              <CareerTest
                user={user}
                onComplete={() => {
                  setRetakeSurveyOpen(false);
                  setRetakeSurveyStep("userinfo");
                }}
              />
            )}
          </div>
        </div>
      )}

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

            <div className="profile-primary-actions">
              <button
                type="button"
                className="retake-survey-button"
                onClick={() => setRetakeSurveyOpen(true)}
              >
                Retake onboarding survey
              </button>
              <div className="profile-results-slot" aria-live="polite">
                <div className="profile-survey-results">
                  <p className="profile-label profile-results-label">Onboarding selections</p>
                  <div className="profile-survey-grid">
                    {surveySelections.map((item) => (
                      <div key={item.label} className="profile-survey-row">
                        <span className="profile-survey-label">{item.label}</span>
                        <p className="profile-survey-value">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="profile-course-groups">
                    {courseGroups.map((group) => (
                      <div key={group.label} className="profile-course-group">
                        <span className="profile-survey-label">{group.label}</span>
                        <div className="profile-course-grid">
                          {group.items.length > 0 ? (
                            group.items.map((course, index) => (
                              <div key={`${group.label}-${course}-${index}`} className="profile-course-cell">
                                {course}
                              </div>
                            ))
                          ) : (
                            <div className="profile-course-cell empty">Not answered yet</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                  ? "Your Google account is confirmed and can be used to sign in to Nex."
                  : "Your account is currently using email and password sign-in."}
              </p>

              {!isGoogleConnected && (
                <button
                  type="button"
                  className="google-connect-button"
                  onClick={handleGoogleConnect}
                  disabled={googleLoading}
                >
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>
              )}

              {googleStatus && (
                <p className="google-status-message">{googleStatus}</p>
              )}

              <div className="password-status-block">
                <div className="password-status-row">
                  <span>Password</span>
                  <span className={`password-status-pill ${hasPasswordSignIn ? "is-enabled" : "is-disabled"}`}>
                    {hasPasswordSignIn ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <div className="password-visibility-box">
                  <p>
                    {hasPasswordSignIn
                      ? "Password sign-in is enabled for this account."
                      : "This account does not currently use a password login."}
                  </p>
                  {!hasPasswordSignIn && isGoogleConnected && (
                    <button
                      type="button"
                      className="password-create-trigger"
                      onClick={() =>
                        setPasswordForm((current) => ({
                          ...current,
                          visible: !current.visible,
                          status: "",
                        }))
                      }
                    >
                      Create password
                    </button>
                  )}
                  {!hasPasswordSignIn && !isGoogleConnected && (
                    <small>
                      Connect with Google first to add a password option for this account.
                    </small>
                  )}
                  {passwordForm.visible && (
                    <form className="password-create-form" onSubmit={handleCreatePassword}>
                      <input
                        type="password"
                        placeholder="New password"
                        value={passwordForm.password}
                        onChange={(e) =>
                          setPasswordForm((current) => ({
                            ...current,
                            password: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm((current) => ({
                            ...current,
                            confirmPassword: e.target.value,
                          }))
                        }
                      />
                      <button type="submit" disabled={passwordForm.loading}>
                        {passwordForm.loading ? "Confirming..." : "Confirm with Google"}
                      </button>
                    </form>
                  )}
                  {passwordForm.status && (
                    <small className="password-form-status">{passwordForm.status}</small>
                  )}
                </div>
              </div>
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