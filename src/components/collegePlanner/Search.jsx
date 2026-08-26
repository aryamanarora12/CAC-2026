import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase";

import SearchResults from "./searchResult";

import "./Search.css";


export default function Search({ user }) {

  /* =====================================================
     STATE
     ===================================================== */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [colleges, setColleges] = useState([]);


  /* =====================================================
     GET DATA FROM FIREBASE
     THEN SEND IT TO BACKEND
     ===================================================== */

  useEffect(() => {

    async function findColleges() {

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


        /* =============================================
           GET USER DOCUMENT
           ============================================= */

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
           GET COLLEGE SEARCH PREFERENCES
           
           These come from Survey.jsx
           ============================================= */

        const collegeSearchPreferences =
          userData.collegeSearchPreferences;


        if (!collegeSearchPreferences) {

          throw new Error(
            "Your college search survey has not been completed yet."
          );

        }


        /* =============================================
           GET PAST COURSES
           
           These come from the student's Firebase profile.
           ============================================= */

        const pastCourses =
          userData.pastCourses || [];


        /* =============================================
           DATA THAT WILL BE SENT TO BACKEND
           ============================================= */

        const requestData = {

          collegeSearchPreferences,

          pastCourses

        };


        console.log(
          "College search request:",
          requestData
        );


        /* =============================================
           SEND DATA TO BACKEND
           ============================================= */

        const response = await fetch(
          "http://localhost:3001/api/college-search",
          {

            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(requestData)

          }
        );


        /* =============================================
           CHECK BACKEND RESPONSE
           ============================================= */

        if (!response.ok) {

          throw new Error(
            "The college search request failed."
          );

        }


        /* =============================================
           GET GEMINI RESULTS
           ============================================= */

        const data = await response.json();


        console.log(
          "College recommendations:",
          data
        );


        /* =============================================
           SAVE COLLEGES
           ============================================= */

        setColleges(
          data.colleges || []
        );


      } catch (error) {

        console.error(
          "College search error:",
          error
        );

        setError(
          error.message ||
          "Something went wrong while finding colleges."
        );

      } finally {

        setLoading(false);

      }

    }


    findColleges();

  }, [user]);


  /* =====================================================
     LOADING SCREEN
     ===================================================== */

  if (loading) {

    return (

      <div className="college-search-loading">

        <div className="college-search-loading-card">

          <div className="college-search-spinner"></div>

          <h2>
            Finding Your College Matches
          </h2>

          <p>
            We're looking for colleges that match
            your preferences and academic background.
          </p>

        </div>

      </div>

    );

  }


  /* =====================================================
     ERROR SCREEN
     ===================================================== */

  if (error) {

    return (

      <div className="college-search-error">

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

      </div>

    );

  }


  /* =====================================================
     RESULTS
     ===================================================== */

  return (

    <SearchResults
      colleges={colleges}
    />

  );

}