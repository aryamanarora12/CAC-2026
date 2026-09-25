import { NavLink } from "react-router-dom";
import NavBar from "../components/components/Global/Navbar";
import "./Home.css";
import { useState, useEffect } from "react";

import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  MessageSquare,
  PenLine
} from "lucide-react";

function Home() {
  const greetings = [
    "Welcome back!",
    "Hello there!",
    "Good to see you!",
    "Hey! What's Up?",
    "Glad you're here!",
    "How's your day going?",
    "Good to see you"
  ];

  const [currentGreeting, setCurrentGreeting] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setCurrentGreeting(greetings[randomIndex]);
  }, []);

  return (
    <div className="home-page">
      <NavBar />

      <header className="hero-section">
        <div className="hero-content">
          {/* <span className="hero-greeting">{currentGreeting}</span> */}
          <h1 className="hero-title">
            Welcome to your all-in-one AI Academic Advisor
          </h1>

          <div className="mission-card">
            <h2 className="mission-heading">Our Goal</h2>
            <p className="mission-text">
              Potential is nothing without a plan. We empower high school
              students by bridging the gap between raw talent and AI-driven
              productivity to build clear, actionable paths to success.
            </p>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2 className="tools-heading">Explore Our Core Tools</h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <GraduationCap size={24} />
            </div>
            <h3>College Finder</h3>
            <p>
              Match with your ideal universities based on your interests.
            </p>
            <NavLink to="/college" className="card-link">
              Launch Tool →
            </NavLink>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Briefcase size={24} />
            </div>
            <h3>Opportunity Finder</h3>
            <p>
              Discover opportunities that help you add to your resume.
            </p>
            <NavLink to="/opportunities" className="card-link">
              Search Openings →
            </NavLink>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <PenLine size={24} />
            </div>
            <h3>Academics Assistant</h3>
            <p>
              Find exam study tools and optimize your overall GPA.
            </p>
            <NavLink to="/Academics" className="card-link">
              Get Help →
            </NavLink>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquare size={24} />
            </div>
            <h3>Student Forum</h3>
            <p>
              Share advice, ask questions, and communicate with like minded
              students.
            </p>
            <NavLink to="/Forum" className="card-link">
              Join a Discussion →
            </NavLink>
          </div>

        </div>

        <div className="Logout">
          <NavLink
            to="/"
            className="card-link"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Logout →
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Home;
