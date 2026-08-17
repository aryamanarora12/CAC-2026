/*import { NavLink } from "react-router-dom";
import NavBar from "../components/components/Global/Navbar";
import "./OpportunityFinder.css"
import { useState, useEffect } from 'react';


function OpportunityFinder() {

  return (
    <div>
      <h1>Opportunity Finder Page</h1>
    </div>
  );

}

export default OpportunityFinder;

*/

import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "../firebase";

import SelectType from "../components/OpportunityFinder/SelectType";
import APIResult from "../components/OpportunityFinder/APIResult";

import { searchOpportunities } from "../components/OpportunityFinder/opportunityService";

import "./OpportunityFinder.css";

import { NavLink } from "react-router-dom";
import NavBar from "../components/components/Global/Navbar";
import "./Home.css"
import { useState, useEffect } from 'react';


export default function OpportunityFinder() {

  const [view, setView] = useState("select");

  const [opportunityType, setOpportunityType] =
    useState(null);

  const [opportunities, setOpportunities] =
    useState([]);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSelectType(type) {

    setOpportunityType(type);

    setLoading(true);

    setError("");


    try {

      // Get currently logged-in user
      const auth = getAuth();

      const user = auth.currentUser;


      if (!user) {
        throw new Error(
          "You must be signed in to search for opportunities."
        );
      }


      // Fetch user profile from Firestore
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnapshot =
        await getDoc(userRef);


      if (!userSnapshot.exists()) {

        throw new Error(
          "Your user profile could not be found."
        );

      }


      const userProfile =
        userSnapshot.data();


      console.log(
        "Fetched user profile:",
        userProfile
      );


      // Search for opportunities
      const results = await searchOpportunities(
        userProfile,
        type
      );

      console.log(
        "🔥 OPPORTUNITIES RECEIVED BY FRONTEND:",
        results
      );

      setOpportunities(results);
      setView("results");


    } catch (error) {

      console.error(
        "Opportunity search error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong while searching."
      );

    } finally {

      setLoading(false);

    }

  }


  function handleSelectOpportunity(opportunity) {

    console.log(
      "Selected opportunity:",
      opportunity
    );

    setSelectedOpportunity(
      opportunity
    );

    setView("selected");

  }


  function handleBack() {

    setOpportunities([]);

    setOpportunityType(null);

    setView("select");

  }


  return (

    <div className="opportunity-finder">

      {error && (

        <div className="opportunity-error">
          {error}
        </div>

      )}


      {loading ? (

        <div className="opportunity-loading">

          <div className="loading-spinner"></div>

          <h2>
            Finding opportunities...
          </h2>

          <p>
            We're looking for opportunities
            that match your profile.
          </p>

        </div>

      ) : (

        <>

          {view === "select" && (

            <SelectType
              onSelectType={
                handleSelectType
              }
            />

          )}


          {view === "results" && (

            <APIResult
              opportunities={
                opportunities
              }

              opportunityType={
                opportunityType
              }

              onSelectOpportunity={
                handleSelectOpportunity
              }

              onBack={
                handleBack
              }
            />

          )}


          {view === "selected" && (

            <div className="selected-opportunity">

              <button
                className="results-back-button"
                onClick={() =>
                  setView("results")
                }
              >
                ← Back to Results
              </button>


              <h1>
                Opportunity Selected
              </h1>


              {selectedOpportunity && (

                <div className="selected-opportunity-card">

                  <h2>
                    {selectedOpportunity.title}
                  </h2>

                  <h3>
                    {selectedOpportunity.organization}
                  </h3>

                  <p>
                    {selectedOpportunity.description}
                  </p>

                </div>

              )}

            </div>

          )}

        </>

      )}

    </div>

  );
}