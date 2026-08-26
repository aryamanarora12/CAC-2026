import "dotenv/config";

import express from "express";
import cors from "cors";
import { tavily } from "@tavily/core";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/search-opportunities", async (req, res) => {
    try {
        const { userProfile, opportunityType } = req.body;

        console.log("Opportunity type:", opportunityType);
        console.log("User profile:", userProfile);

        const searchQuery = `
      ${opportunityType} opportunities for high school students
      interested in ${userProfile.interests?.join(", ") || "various subjects"}
      in ${userProfile.state || "the United States"}
      2026
    `;

        console.log("Searching for:", searchQuery);

        const searchResponse = await tvly.search(searchQuery, {
            search_depth: "basic",
            max_results: 10
        });
        const searchResults = searchResponse.results.map((result, index) => ({
            id: index + 1,
            title: result.title,
            tavilyUrl: result.url,
            content: result.content
        }));
        console.log("Search results received:", searchResponse.results.length);
        console.log("Number of results being analyzed:", searchResults.length);
        console.log("Sending results to Gemini...");

        /*const aiResponse = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `
            You are an opportunity-matching assistant for high school students.

            The student is looking for:

            Opportunity type:
            ${opportunityType}

                Student profile:
                ${JSON.stringify({
                state: userProfile.state,
                interests: userProfile.interests,
                school: userProfile.school,
                currentCourses: userProfile.currentCourses,
                pastCourses: userProfile.pastCourses,
                major: userProfile.major,
                age: userProfile.age
            }, null, 2)}

            Below are web search results. These are source webpages and may contain multiple individual opportunities.

            ${JSON.stringify(searchResults, null, 2)}

            Your job is to identify the individual opportunities contained within these webpages.

            For each genuine opportunity, provide:

            - title
            - organization
            - location
            - deadline
            - description
            - url
            - matchScore from 0 to 100
            - whyItMatches

            Important rules:

            1. Do not invent opportunities.
            2. Do not invent deadlines, organizations, locations, or requirements.
            3. Only use information contained in the supplied search results.
            4. If information is unavailable, use "Not specified".
            5. A single webpage may contain many different opportunities. Extract them individually.
            6. Preserve the source URL for each opportunity.
            7. Only return opportunities relevant to the requested opportunity type.
            8. Consider the student's interests, past courses taken, current ocurses that the student is taking, major, age, and location when determining matchScore.
            `,
            config: {
                responseMimeType: "application/json"
            }
        });*/


        const aiResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: `
            You are an intelligent opportunity-matching assistant for high school students.

            Your goal is NOT simply to determine whether an opportunity is related to the student's interests.

            Your goal is to determine how strongly each opportunity fits THIS SPECIFIC STUDENT based on their academic background, interests, intended major, age, location, and requested opportunity type.

            STUDENT'S REQUEST:

            Opportunity type:
            ${opportunityType}

            STUDENT PROFILE:
            ${JSON.stringify({
                state: userProfile.state,
                interests: userProfile.interests,
                school: userProfile.school,
                currentCourses: userProfile.currentCourses,
                pastCourses: userProfile.pastCourses,
                major: userProfile.major,
                age: userProfile.age
            }, null, 2)}

                WEB SEARCH RESULTS:
                These are source webpages. They may contain multiple individual opportunities.

                ${JSON.stringify(searchResults, null, 2)}


                MATCHING PROCESS:

                For every opportunity you identify, evaluate it against the student's profile.

                Consider the following factors:

                1. ELIGIBILITY
                - Does the student's age satisfy the stated age requirement?
                - Does the student's school/grade level satisfy the stated requirement?
                - Does the student's location satisfy geographic requirements?
                - Does the student satisfy any stated academic or prerequisite requirements?
                - If an important requirement is explicitly not satisfied, the opportunity should receive a low match score or be excluded.

                2. ACADEMIC ALIGNMENT
                - Compare the opportunity's subject matter with the student's current courses.
                - Consider both current and past courses.
                - Current courses demonstrate what the student is studying now.
                - Past courses demonstrate previous preparation.

                3. INTEREST ALIGNMENT
                - Compare the opportunity with the student's stated interests.
                - Strongly prioritize opportunities that directly involve those interests.

                4. CAREER / MAJOR ALIGNMENT
                - Compare the opportunity with the student's intended major.
                - Give additional weight when the opportunity provides experience directly related to that major or career path.

                5. OPPORTUNITY TYPE
                - The opportunity must actually match the requested opportunity type.
                - For example, if the student requests internships, do not return scholarships, competitions, or general programs unless the source clearly indicates that it is also an internship.

                6. OVERALL PERSONAL RELEVANCE
                - Determine whether this opportunity would genuinely make sense for THIS student.
                - Avoid giving a high score simply because the opportunity is broadly related to a student's interests.


                MATCH SCORE:

                Calculate a matchScore from 0 to 100.

                Use this general framework:

                90-100:
                Exceptional match. The opportunity strongly aligns with the student's eligibility, interests, academics, and intended major.

                75-89:
                Strong match. The opportunity fits the student well but may have one weaker area or less direct alignment.

                60-74:
                Moderate match. The opportunity is relevant but has limited personalization or alignment.

                40-59:
                Weak match. The opportunity has some relevance but is not particularly suited to this student.

                0-39:
                Poor match. The opportunity is mostly unrelated, has significant eligibility conflicts, or does not fit the requested opportunity type.

                IMPORTANT:
                Do NOT inflate scores simply because an opportunity mentions the student's general field of interest.


                WHY IT MATCHES:

                For each opportunity, explain WHY it matches this specific student.

                The explanation should:
                - Mention specific information from the student's profile.
                - Connect that information directly to the opportunity.
                - Prefer multiple relevant profile factors when supported.
                - Never invent facts about the student or opportunity.

                GOOD EXAMPLE:

                "The student is currently taking AP Physics 1 and intends to study Systems Engineering. Because this program focuses on engineering design, it directly connects the student's current physics coursework with their intended field of study."

                BAD EXAMPLE:

                "This is a great opportunity for the student because they like engineering."


                EXTRACTION RULES:

                1. Do not invent opportunities.
                2. Do not invent deadlines, organizations, locations, requirements, or eligibility information.
                3. Only use information contained in the supplied search results.
                4. If information is unavailable, use "Not specified".
                5. A single webpage may contain multiple individual opportunities. Extract them individually.
                6. Preserve the Tavily source URL as sourceUrl.
                7. Extract the actual official opportunity/application URL as opportunityUrl whenever it is explicitly available in the supplied webpage content.
                8. Never invent an opportunityUrl.
                9. Only return opportunities relevant to the requested opportunity type.
                10. Do not assume that an opportunity is available to the student if eligibility is not stated.
                11. Do not claim that the student qualifies unless the source provides enough information to support that conclusion.


                FOR EACH OPPORTUNITY RETURN:

                - title
                - organization
                - location
                - deadline
                - description
                -opportunityUrl
                - sourceUrl
                - matchScore
                - whyItMatches

                URL RULES:

                There are TWO different URLs:

                1. sourceUrl
                - This is the Tavily webpage where you found the information.
                - Use the provided "tavilyUrl" for this field.

                2. opportunityUrl
                - This should be the actual official webpage for the specific opportunity.
                - Prefer the official organization, university, company, or program website.
                - If the Tavily page's content contains a direct link to the actual opportunity, application page, or official program page, extract that URL and use it.
                - Do NOT automatically use the Tavily source URL as opportunityUrl.
                - Do NOT invent or guess URLs.
                - Do NOT modify a URL to create a URL that was not present in the supplied search results.
                - If an actual opportunity URL cannot be confidently identified from the supplied information, use "Not specified".

                The opportunityUrl is the link that should be shown to the student when they click "Learn More".

                The sourceUrl is only for tracking where the information came from.

                Return ONLY valid JSON.
                `,
            config: {
                responseMimeType: "application/json"
            }
        });
        const aiText = aiResponse.text;

        console.log("\n========== RAW GEMINI RESPONSE ==========");
        console.log(aiText);
        console.log("=========================================\n");

        const parsedAI = JSON.parse(aiText);

        console.log("\n========== PARSED OPPORTUNITIES ==========");
        console.log(JSON.stringify(parsedAI, null, 2));
        console.log("==========================================\n");

        res.json({
            opportunities: parsedAI
        });

    } catch (error) {
        console.error("Search error:", error);

        res.status(500).json({
            error: "Something went wrong while searching for opportunities."
        });
    }
});

/* =====================================================
   COLLEGE SEARCH
   ===================================================== */

app.post("/college-search", async (req, res) => {

    try {

        const {
            collegeSearchPreferences,
            pastCourses
        } = req.body;


        /* =============================================
           VALIDATE REQUEST
           ============================================= */

        if (!collegeSearchPreferences) {

            return res.status(400).json({
                error: "College search preferences are required."
            });

        }


        if (!pastCourses) {

            return res.status(400).json({
                error: "Past course information is required."
            });

        }


        console.log(
            "\n========== COLLEGE SEARCH REQUEST =========="
        );

        console.log(
            "College preferences:",
            JSON.stringify(
                collegeSearchPreferences,
                null,
                2
            )
        );

        console.log(
            "Past courses:",
            JSON.stringify(
                pastCourses,
                null,
                2
            )
        );


        /* =============================================
           GEMINI COLLEGE SEARCH
           ============================================= */

        console.log(
            "Sending college search request to Gemini..."
        );


        const aiResponse = await ai.models.generateContent({

            /*
             * Use a Gemini model that supports
             * Google Search grounding.
             */
            model: "gemini-3.7-flash",

            contents: `

            You are a college matching assistant that has an end goal of helping students by bridging the gap between education and Artificial intelligence.

            Your job is to find colleges that are strong matches
            for a specific student.

            The student has completed a college preference survey.
            Use ALL of the provided preferences when determining
            which colleges are good matches.

            You also have access to the student's past courses.
            Use those courses to understand the student's academic
            background and preparation.

            You MUST use Google Search to research current
            information about colleges before recommending them.

            =====================================================
            STUDENT COLLEGE PREFERENCES
            =====================================================

                ${JSON.stringify(
                collegeSearchPreferences,
                null,
                2
            )}


            =====================================================
            STUDENT PAST COURSES
            =====================================================

            ${JSON.stringify(
                pastCourses,
                null,
                2
            )}


            =====================================================
            WHAT YOU SHOULD DO
            =====================================================

            Search for colleges that match students preferences across different aspects related to looking for a college.

            Consider:

            1. CAMPUS LIFE

            Use:
            - campus setting
            - housing preference
            - campus/student culture

            2. LOCATION

            Use:
            - location preference
            - preferred state
            - preferred region
            - city proximity

            3. COST

            Use:
            - minimum acceptable cost
            - maximum acceptable cost

            4. COLLEGE TYPE

            Consider the student's preferred college types.

            5. CAREER OUTCOMES

            Consider:
            - career priorities
            - desired programs or fields

            6. ADMISSIONS

            Consider:
            - testing preferences
            - essay preferences
            - recommendation preferences
            - extracurricular preferences
            - interview preferences

            7. ACADEMIC BACKGROUND

            Use the student's past courses to determine
            whether the college's programs are academically
            relevant to the student's background.

            =====================================================
            COLLEGE MATCHING
            =====================================================

            Do not simply return famous colleges.

            Prioritize colleges that actually fit the student's
            specific preferences.

            A college can be a strong recommendation even if it
            is not one of the highest-ranked schools.

            Location, programs, cost, college type, campus life,
            and the student's academic interests should all be
            considered.

            Try to find several strong matches rather than
            returning only one college.

            =====================================================
            INFORMATION TO FIND
            =====================================================

            For each recommended college, find:

            - College name
            - Location
            - Current/relevant ranking information
            - Major programs or areas the college is well known for
            - Why the college fits this particular student's criteria
            -Find the official link of the college so a user is able to look for more information if they select a college of their liking

            Use current web information whenever possible.

            Do not invent information.

            If a particular piece of information cannot be
            verified, use "Not specified".

            =====================================================
            WHY IT FITS
            =====================================================

            The "whyItFits" explanation should be personalized.

            Connect the college to specific information from
            the student's preferences and course history.

            For example, if the student is interested in
            engineering and has taken physics-related courses,
            and the college has a strong engineering program,
            explain that connection.

            Do not simply say:

            "This college is a good fit because it has engineering."

            Instead explain the connection between the student's
            criteria and the college.

            =====================================================
            OUTPUT
            =====================================================

            Return ONLY valid JSON.

            The response must follow this structure:

            {
                "colleges": [
                    {
                    "name": "College Name",
                    "location": "City, State",
                    "ranking": "Ranking information",
                    "knownFor": [
                        "Area or program"
                    ],
                    "whyItFits": "Short personalized explanation.",
                    "website": "Official college website URL"
                }
                ]
            }

            Do not include markdown.

            Do not include commentary outside the JSON.

            `,

            config: {

                /*
                 * Allow Gemini to search the web
                 * for current college information.
                 */
                tools: [
                    {
                        googleSearch: {}
                    }
                ],

                /*
                 * Ask Gemini to return JSON.
                 */
                responseMimeType: "application/json"

            }

        });


        /* =============================================
           GET GEMINI RESPONSE
           ============================================= */

        const aiText = aiResponse.text;


        console.log(
            "\n========== RAW COLLEGE GEMINI RESPONSE =========="
        );

        console.log(aiText);

        console.log(
            "==================================================\n"
        );


        /* =============================================
           PARSE JSON
           ============================================= */

        const parsedAI = JSON.parse(aiText);


        console.log(
            "\n========== PARSED COLLEGE RESULTS =========="
        );

        console.log(
            JSON.stringify(
                parsedAI,
                null,
                2
            )
        );

        console.log(
            "============================================\n"
        );


        /* =============================================
           SEND RESULTS TO SEARCH.JSX
           ============================================= */

        res.json({

            colleges: parsedAI.colleges || []

        });


    } catch (error) {

        console.error(
            "College search error:",
            error
        );


        res.status(500).json({

            error:
                "Something went wrong while searching for colleges."

        });

    }

});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Website backend running on port ${PORT}`);
});