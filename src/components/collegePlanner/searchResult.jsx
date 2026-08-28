
import { useEffect, useState } from "react";

import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { db } from "../../firebase";

import "./searchResult.css";


export default function SearchResults({
    colleges,
    user,
    onCollegeSaved
}) {
    console.log("========== SEARCH RESULTS USER ==========");
    console.log("user:", user);
    console.log("user.uid:", user?.uid);
    console.log("=========================================");

    const [savedColleges, setSavedColleges] = useState([]);

    const [savingCollege, setSavingCollege] = useState(null);

    const [error, setError] = useState("");


    /* =====================================================
       LOAD SAVED COLLEGES
       ===================================================== */

    useEffect(() => {

        async function loadSavedColleges() {

            if (!user || !user.uid) {
                return;
            }


            try {

                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const userSnapshot = await getDoc(userRef);


                if (!userSnapshot.exists()) {
                    return;
                }


                const userData = userSnapshot.data();


                setSavedColleges(
                    userData.savedColleges || []
                );


            } catch (error) {

                console.error(
                    "Error loading saved colleges:",
                    error
                );

            }

        }


        loadSavedColleges();

    }, [user]);


    /* =====================================================
       CHECK IF COLLEGE IS ALREADY SAVED
       ===================================================== */

    function isCollegeSaved(college) {

        return savedColleges.some(
            (savedCollege) =>
                savedCollege.name === college.name
        );

    }


    /* =====================================================
       SAVE COLLEGE
       ===================================================== */

    async function saveCollege(college) {

        if (!user || !user.uid) {

            setError(
                "You must be signed in to save a college."
            );

            return;

        }


        if (isCollegeSaved(college)) {
            return;
        }


        try {

            setSavingCollege(college.name);

            setError("");


            const userRef = doc(
                db,
                "users",
                user.uid
            );


            const userSnapshot = await getDoc(
                userRef
            );


            const userData =
                userSnapshot.exists()
                    ? userSnapshot.data()
                    : {};


            const currentSavedColleges =
                userData.savedColleges || [];


            /* =============================================
               PREVENT DUPLICATES
               ============================================= */

            const alreadySaved =
                currentSavedColleges.some(
                    (savedCollege) =>
                        savedCollege.name === college.name
                );


            if (alreadySaved) {

                setSavedColleges(
                    currentSavedColleges
                );

                return;

            }


            /* =============================================
               COLLEGE OBJECT
               ============================================= */

            const collegeToSave = {

                name:
                    college.name || "Unknown College",

                location:
                    college.location || "Not specified",

                ranking:
                    college.ranking || "Not specified",

                knownFor:
                    Array.isArray(college.knownFor)
                        ? college.knownFor
                        : [],

                whyItFits:
                    college.whyItFits || "Not specified",

                matchScore:
                    college.matchScore ?? null,

                website:
                    college.website || "Not specified"

            };


            const updatedSavedColleges = [

                ...currentSavedColleges,

                collegeToSave

            ];


            /* =============================================
               SAVE TO FIREBASE
               ============================================= */

            await setDoc(

                userRef,

                {
                    savedColleges:
                        updatedSavedColleges
                },

                {
                    merge: true
                }

            );


            /* =============================================
               UPDATE LOCAL STATE
               ============================================= */

            setSavedColleges(
                updatedSavedColleges
            );


            /* =============================================
               INFORM COLLEGE PLANNING PAGE
               ============================================= */

            if (onCollegeSaved) {

                onCollegeSaved(
                    collegeToSave
                );

            }


        } catch (error) {

            console.error(
                "Error saving college:",
                error
            );

            setError(
                "Could not save this college. Please try again."
            );

        } finally {

            setSavingCollege(null);

        }

    }


    /* =====================================================
       NO RESULTS
       ===================================================== */

    if (!colleges || colleges.length === 0) {

        return (

            <div className="college-results-page">

                <div className="college-results-header">

                    <h1>
                        Your College Matches
                    </h1>

                    <p>
                        We couldn't find any colleges matching
                        your preferences.
                    </p>

                </div>

            </div>

        );

    }


    /* =====================================================
       RESULTS
       ===================================================== */

    return (

        <div className="college-results-page">


            {/* =============================================
                HEADER
                ============================================= */}

            <div className="college-results-header">

                <p className="college-results-label">
                    YOUR RESULTS
                </p>

                <h1>
                    Your College Matches
                </h1>

                <p>
                    Here are colleges that match your
                    preferences and academic background.
                </p>

                {error && (

                    <p className="auth-error">
                        {error}
                    </p>

                )}

            </div>


            {/* =============================================
                COLLEGE CARDS
                ============================================= */}

            <div className="college-results-grid">

                {colleges.map((college, index) => {

                    const saved =
                        isCollegeSaved(college);


                    return (

                        <div
                            className="college-card"
                            key={`${college.name}-${index}`}
                        >


                            {/* COLLEGE NAME */}

                            <h2 className="college-name">
                                {college.name}
                            </h2>


                            {/* LOCATION */}

                            <p className="college-location">
                                📍 {college.location}
                            </p>


                            {/* MATCH SCORE */}

                            {college.matchScore != null && (

                                <div className="college-match-score">

                                    <span>
                                        Match
                                    </span>

                                    <strong>
                                        {college.matchScore}%
                                    </strong>

                                </div>

                            )}


                            {/* RANKING */}

                            <div className="college-info">

                                <span className="college-info-label">
                                    Ranking
                                </span>

                                <span className="college-info-value">
                                    {college.ranking}
                                </span>

                            </div>


                            {/* KNOWN FOR */}

                            <div className="college-known-for">

                                <h3>
                                    Known For
                                </h3>

                                <div className="college-tags">

                                    {Array.isArray(
                                        college.knownFor
                                    ) ? (

                                        college.knownFor.map(
                                            (item, itemIndex) => (

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


                            {/* WHY IT FITS */}

                            <div className="college-match">

                                <h3>
                                    Why It Fits You
                                </h3>

                                <p>
                                    {college.whyItFits}
                                </p>

                            </div>


                            {/* BUTTONS */}

                            <div className="college-card-actions">


                                {/* SAVE */}

                                <button
                                    className="save-college-button"
                                    onClick={() =>
                                        saveCollege(college)
                                    }
                                    disabled={
                                        saved ||
                                        savingCollege === college.name
                                    }
                                >

                                    {savingCollege === college.name
                                        ? "Saving..."
                                        : saved
                                            ? "✓ Saved"
                                            : "+ Save College"}

                                </button>


                                {/* WEBSITE */}

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


                        </div>

                    );

                })}

            </div>

        </div>

    );

}

