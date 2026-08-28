/*
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CollegePlanning from "./pages/Collegeplanning";
import OpportunityFinder from "./pages/OpportunityFinder";
import Academics from "./pages/Academics";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/home" element={<Home />} />

        <Route 
          path="/college" 
          element={<CollegePlanning />} 
        />

        <Route 
          path="/opportunities" 
          element={<OpportunityFinder />} 
        />

        <Route 
          path="/academics" 
          element={<Academics />} 
        />

        <Route 
          path="/forum" 
          element={<Forum />} 
        />

        <Route 
          path="/profile" 
          element={<Profile />} 
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CollegePlanning from "./pages/Collegeplanning";
import OpportunityFinder from "./pages/OpportunityFinder";
import Academics from "./pages/Academics";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";


function App() {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);


  /* =====================================================
     LISTEN FOR FIREBASE AUTH STATE
     ===================================================== */

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        console.log(
          "Auth state changed:",
          currentUser
            ? currentUser.uid
            : "No user logged in"
        );

        setUser(currentUser);
        setAuthLoading(false);

      }
    );

    return unsubscribe;

  }, []);


  /* =====================================================
     WAIT FOR FIREBASE TO CHECK LOGIN
     ===================================================== */

  if (authLoading) {

    return (
      <div>
        Loading...
      </div>
    );

  }


  /* =====================================================
     ROUTES
     ===================================================== */

  return (

    <BrowserRouter>

      <Routes>

        {/* =============================================
            WELCOME / LOGIN
            ============================================= */}

        <Route
          path="/"
          element={<Welcome />}
        />


        {/* =============================================
            HOME
            ============================================= */}

        <Route
          path="/home"
          element={<Home />}
        />


        {/* =============================================
            COLLEGE PLANNING
            ============================================= */}

        <Route
          path="/college"
          element={
            <CollegePlanning user={user} />
          }
        />


        {/* =============================================
            OPPORTUNITY FINDER
            ============================================= */}

        <Route
          path="/opportunities"
          element={
            <OpportunityFinder />
          }
        />


        {/* =============================================
            ACADEMICS
            ============================================= */}

        <Route
          path="/academics"
          element={
            <Academics />
          }
        />


        {/* =============================================
            FORUM
            ============================================= */}

        <Route
          path="/forum"
          element={
            <Forum />
          }
        />


        {/* =============================================
            PROFILE
            ============================================= */}

        <Route
          path="/profile"
          element={
            <Profile />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;