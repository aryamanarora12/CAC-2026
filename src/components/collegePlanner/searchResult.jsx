import "./searchResult.css";

export default function SearchResults({ colleges }) {

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

            </div>


            {/* =============================================
                COLLEGE CARDS
                ============================================= */}

            <div className="college-results-grid">

                {colleges.map((college, index) => (

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

                ))}

            </div>

        </div>

    );

}