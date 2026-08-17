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
            url: result.url,
            content: result.content
        }));
        console.log("Search results received:", searchResponse.results.length);
        console.log("Number of results being analyzed:", searchResults.length);
        console.log("Sending results to Gemini...");

        const aiResponse = await ai.models.generateContent({
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
            8. Consider the student's interests, courses, major, age, and location when determining matchScore.
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



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Opportunity backend running on port ${PORT}`);
});