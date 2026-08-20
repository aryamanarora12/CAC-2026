import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../firebase";

import "./SavedOpportunities.css";

export default function SavedOpportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            console.log("Current Firebase user:", user);

            if (!user) {
                console.log("No user logged in.");
                setOpportunities([]);
                setLoading(false);
                return;
            }

            try {

                console.log("User UID:", user.uid);

                // Get the user's document
                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const userSnapshot = await getDoc(userRef);

                if (!userSnapshot.exists()) {
                    console.log("User document does not exist.");
                    setOpportunities([]);
                    setLoading(false);
                    return;
                }

                // Get the user's data
                const userData = userSnapshot.data();

                console.log("User data:", userData);

                // Get saved opportunities array
                const saved = userData.savedOpportunities || [];

                console.log(
                    "Saved opportunities:",
                    saved
                );

                setOpportunities(saved);

            } catch (error) {

                console.error(
                    "Error fetching saved opportunities:",
                    error
                );

            } finally {

                setLoading(false);

            }

        });

        return () => unsubscribe();

    }, []);


    if (loading) {
        return (
            <div>
                Loading saved opportunities...
            </div>
        );
    }


    if (opportunities.length === 0) {
        return (
            <div>
                <h2>No Saved Opportunities</h2>
                <p>
                    You haven't saved any opportunities yet.
                </p>
            </div>
        );
    }


    return (
        <div className="saved-opportunities">

            <h2>My Saved Opportunities</h2>

            <div className="opportunity-grid">

                {opportunities.map((opportunity, index) => (

                    <div
                        className="opportunity-card"
                        key={index}
                    >

                        <h3>
                            {opportunity.title}
                        </h3>

                        <p className="organization">
                            {opportunity.organization}
                        </p>

                        <p>
                            <strong>Location:</strong>{" "}
                            {opportunity.location || "Not specified"}
                        </p>

                        <p>
                            <strong>Deadline:</strong>{" "}
                            {opportunity.deadline || "Not specified"}
                        </p>

                        <p className="description">
                            {opportunity.description}
                        </p>

                        <div className="opportunity-links">

                            {opportunity.opportunityUrl &&
                             opportunity.opportunityUrl !== "Not specified" && (

                                <a
                                    href={opportunity.opportunityUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="learn-more-button"
                                >
                                    View Opportunity →
                                </a>

                            )}

                            {opportunity.sourceUrl &&
                             opportunity.sourceUrl !== "Not specified" && (

                                <a
                                    href={opportunity.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="source-button"
                                >
                                    View Source
                                </a>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}