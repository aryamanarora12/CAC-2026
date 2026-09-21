
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import NavBar from "../components/components/Global/Navbar";

import Survey from "../components/collegePlanner/survey";
import Search from "../components/collegePlanner/Search";
import SearchResults from "../components/collegePlanner/searchResult";

import { db } from "../firebase";
import "./CollegePlanning.css";

export default function CollegePlanning({ user }) {

    /* =====================================================
       CURRENT PAGE / FLOW
       
       home
       = Main College Planning page

       preferenceChoice
       = User already has preferences and must choose
         whether to update them or continue searching

       survey
       = College preference questionnaire

       search
       = Tavily + Gemini search

       results
       = Newly generated college matches
       ===================================================== */

    const [currentView, setCurrentView] = useState("home");


    /* =====================================================
       SAVED COLLEGES
       ===================================================== */

    const [savedColleges, setSavedColleges] = useState([]);


    /* =====================================================
       CHECK WHETHER USER HAS SAVED PREFERENCES
       ===================================================== */

    const [hasPreferences, setHasPreferences] = useState(false);


    /* =====================================================
       LOADING
       ===================================================== */

    const [loading, setLoading] = useState(true);


    /* =====================================================
       SEARCH RESULTS
       ===================================================== */

    const [searchResults, setSearchResults] = useState([]);


    /* =====================================================
       ERROR
       ===================================================== */

    const [error, setError] = useState("");


    /* =====================================================
       LOAD USER DATA
       
       When College Planning opens:
       
       1. Check for collegeSearchPreferences
       2. Check for saved colleges
       ===================================================== */

    useEffect(() => {

        async function loadCollegeData() {

            if (!user || !user.uid) {

                setError(
                    "We could not identify your account. Please sign in again."
                );

                setLoading(false);

                return;
            }


            try {

                setLoading(true);
                setError("");


                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );


                const userSnapshot = await getDoc(userRef);


                if (!userSnapshot.exists()) {

                    throw new Error(
                        "Your student profile could not be found."
                    );

                }


                const userData = userSnapshot.data();


                /* =============================================
                   CHECK COLLEGE PREFERENCES
                   ============================================= */

                if (userData.collegeSearchPreferences) {

                    setHasPreferences(true);

                } else {

                    setHasPreferences(false);

                }


                /* =============================================
                   LOAD SAVED COLLEGES
                   
                   This assumes saved colleges are stored
                   as an array called "savedColleges" in
                   the user's Firebase document.
                   ============================================= */

                setSavedColleges(
                    userData.savedColleges || []
                );


            } catch (error) {

                console.error(
                    "Error loading college planning data:",
                    error
                );

                setError(
                    error.message ||
                    "Something went wrong while loading your college information."
                );

            } finally {

                setLoading(false);

            }

        }


        loadCollegeData();

    }, [user]);


    /* =====================================================
       FIND COLLEGES BUTTON
       
       This is the main entry point.
       
       If preferences already exist:
           → preference choice screen

       If preferences do not exist:
           → survey
       ===================================================== */

    function handleFindColleges() {

        setError("");


        if (hasPreferences) {

            setCurrentView("preferenceChoice");

        } else {

            setCurrentView("survey");

        }

    }


    /* =====================================================
       UPDATE PREFERENCES
       
       User wants to retake the questionnaire.
       ===================================================== */

    function handleUpdatePreferences() {

        setError("");

        setCurrentView("survey");

    }


    /* =====================================================
       CONTINUE WITH EXISTING PREFERENCES
       
       User does not want to retake the questionnaire.
       ===================================================== */

    function handleContinueToSearch() {

        setError("");

        setCurrentView("search");

    }


    /* =====================================================
       SURVEY COMPLETE
       
       Survey saves preferences to Firebase.
       
       After that, start the college search.
       ===================================================== */

    function handleSurveyComplete() {

        setHasPreferences(true);

        setCurrentView("search");

    }


    /* =====================================================
       SEARCH COMPLETE
       
       Search.jsx gives us the colleges returned by
       Tavily + Gemini.
       ===================================================== */

    function handleSearchComplete(colleges) {

        setSearchResults(
            colleges || []
        );

        setCurrentView("results");

    }


    /* =====================================================
       BACK TO MAIN COLLEGE PLANNING PAGE
       ===================================================== */

    function handleBackToPlanning() {

        setCurrentView("home");

    }


    /* =====================================================
       LOADING SCREEN
       ===================================================== */

    if (loading) {

        return (

            <div className="college-planning-page">

                <NavBar />

                <div className="college-planning-loading">

                    <h2>
                        Loading College Planning...
                    </h2>

                </div>

            </div>

        );

    }


    /* =====================================================
       ERROR SCREEN
       ===================================================== */

    if (error && currentView === "home") {

        return (

            <div className="college-planning-page">

                <NavBar />

                <div className="college-planning-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    /* =====================================================
       MAIN RENDER
       ===================================================== */

    return (

        <div className="college-planning-page">

            <NavBar />


            {/* =================================================
                MAIN COLLEGE PLANNING PAGE
                ================================================= */}

            {currentView === "home" && (

                <div className="college-planning-home">

                    <div className="college-planning-header">

                        <p className="college-planning-label">
                            COLLEGE PLANNING
                        </p>

                        <h1>
                            Find Your College Match
                        </h1>

                        <p>
                            Discover colleges that fit your
                            academic interests and preferences.
                        </p>

                    </div>


                    {/* =============================================
                        FIND COLLEGES BUTTON
                        ============================================= */}

                    <button
                        type="button"
                        className="find-colleges-button"
                        onClick={handleFindColleges}
                    >
                        Find Colleges →
                    </button>


                    {/* =============================================
                        SAVED COLLEGES
                        ============================================= */}

                    <div className="saved-colleges-section">

                        <div className="saved-colleges-header">

                            <h2>
                                My Saved Colleges
                            </h2>

                            <p>
                                Colleges you've saved for later.
                            </p>

                        </div>


                        {savedColleges.length === 0 ? (

                            <div className="no-saved-colleges">

                                <p>
                                    You haven't saved any colleges yet.
                                </p>

                                <p>
                                    Search for colleges and save the
                                    ones you're interested in.
                                </p>

                            </div>

                        ) : (

                            <div className="saved-colleges-grid">

                                {savedColleges.map(
                                    (college, index) => (

                                        <div
                                            className="college-card"
                                            key={`${college.name}-${index}`}
                                        >

                                            <h2 className="college-name">
                                                {college.name}
                                            </h2>


                                            {college.location && (

                                                <p className="college-location">
                                                    📍 {college.location}
                                                </p>

                                            )}


                                            {college.ranking && (

                                                <div className="college-info">

                                                    <span className="college-info-label">
                                                        Ranking
                                                    </span>

                                                    <span className="college-info-value">
                                                        {college.ranking}
                                                    </span>

                                                </div>

                                            )}


                                            {college.knownFor && (

                                                <div className="college-known-for">

                                                    <h3>
                                                        Known For
                                                    </h3>

                                                    <div className="college-tags">

                                                        {Array.isArray(
                                                            college.knownFor
                                                        ) ? (

                                                            college.knownFor.map(
                                                                (
                                                                    item,
                                                                    itemIndex
                                                                ) => (

                                                                    <span
                                                                        className="college-tag"
                                                                        key={itemIndex}
                                                                    >
                                                                        {item}
                                                                    </span>

                                                                )
                                                            )

                                                        ) : (

                                                            <span className="college-tag">
                                                                {college.knownFor}
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>

                                            )}


                                            {college.whyItFits && (

                                                <div className="college-match">

                                                    <h3>
                                                        Why It Fits You
                                                    </h3>

                                                    <p>
                                                        {college.whyItFits}
                                                    </p>

                                                </div>

                                            )}


                                            {college.website &&
                                                college.website !== "Not specified" && (

                                                    <a
                                                        className="college-learn-more"
                                                        href={college.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Visit College Website →
                                                    </a>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                </div>

            )}


            {/* =================================================
                PREFERENCE CHOICE
                ================================================= */}

            {currentView === "preferenceChoice" && (

                <div className="college-preference-choice">

                    <div className="college-preference-card">

                        <p className="college-planning-label">
                            COLLEGE SEARCH
                        </p>

                        <h1>
                            Your Preferences Are Saved
                        </h1>

                        <p>
                            You already have college search
                            preferences saved. Would you like
                            to update them or continue using
                            your current preferences?
                        </p>


                        <div className="college-preference-buttons">

                            <button
                                type="button"
                                className="update-preferences-button"
                                onClick={handleUpdatePreferences}
                            >
                                Update Preferences
                            </button>


                            <button
                                type="button"
                                className="continue-search-button"
                                onClick={handleContinueToSearch}
                            >
                                Continue to Search →
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                SURVEY
                ================================================= */}

            {currentView === "survey" && (

                <Survey
                    user={user}
                    onComplete={handleSurveyComplete}
                />

            )}


            {/* =================================================
                SEARCH
                ================================================= */}

            {currentView === "search" && (

                <Search
                    user={user}
                    onComplete={handleSearchComplete}
                />

            )}


            {/* =================================================
                SEARCH RESULTS
                ================================================= */}

            {currentView === "results" && (

                <div className="college-search-results-container">

                    <button
                        type="button"
                        className="back-to-planning-button"
                        onClick={handleBackToPlanning}
                    >
                        ← Back to College Planning
                    </button>


                    <SearchResults
                        colleges={searchResults}
                        user={user}
                    />

                </div>

            )}

        </div>

    );
}

