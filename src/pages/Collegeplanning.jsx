


import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/components/Global/Navbar";



import Survey from "../components/collegePlanner/survey";
import Search from "../components/collegePlanner/Search";
import SearchResults from "../components/collegePlanner/searchResult";

export default function CollegePlanning({ user }) {

    const [currentStep, setCurrentStep] = useState("survey");

    const [searchResults, setSearchResults] = useState([]);


    /* =====================================================
       SURVEY FINISHED
       ===================================================== */

    function handleSurveyComplete() {

        setCurrentStep("search");

    }


    /* =====================================================
       SEARCH FINISHED
       ===================================================== */

    function handleSearchComplete(colleges) {

        setSearchResults(colleges);

        setCurrentStep("results");

    }


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div className="college-planning-page">
          <NavBar />

            {/* =============================================
                SURVEY
                ============================================= */}

            {currentStep === "survey" && (

                <Survey
                    user={user}
                    onComplete={handleSurveyComplete}
                />

            )}


            {/* =============================================
                SEARCH / LOADING
                ============================================= */}

            {currentStep === "search" && (

                <Search
                    user={user}
                    onComplete={handleSearchComplete}
                />

            )}


            {/* =============================================
                RESULTS
                ============================================= */}

            {currentStep === "results" && (

                <SearchResults
                    colleges={searchResults}
                />

            )}

        </div>

    );

}