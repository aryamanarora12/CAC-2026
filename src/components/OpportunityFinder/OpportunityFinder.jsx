
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";

import { db } from "../../firebase";

import SelectType from "./SelectType";
import APIResult from "./APIResult";

import { searchOpportunities } from "./opportunityService";

import "./OpportunityFinder.css";

export default function OpportunityFinderComponent() {

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


            // Get user's profile
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
            const results =
                await searchOpportunities(
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


    async function handleSelectOpportunity(opportunity) {

        try {

            const auth = getAuth();

            const user = auth.currentUser;

            if (!user) {
                throw new Error(
                    "You must be signed in to save opportunities."
                );
            }


            // Reference to the current user's document
            const userRef = doc(
                db,
                "users",
                user.uid
            );


            // Save the opportunity
            await setDoc(
                userRef,
                {
                    savedOpportunities: arrayUnion(opportunity)
                },
                {
                    merge: true
                }
            );


            console.log(
                " Opportunity saved to Firebase:",
                opportunity
            );


            // Continue to selected-opportunity page
            setSelectedOpportunity(opportunity);

            setView("selected");


        } catch (error) {

            console.error(
                " Error saving opportunity:",
                error
            );

            setError(
                error.message ||
                "Could not save this opportunity."
            );

        }

    }


    function handleBack() {

        setOpportunities([]);

        setOpportunityType(null);

        setSelectedOpportunity(null);

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