import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CollegePlanning from "./pages/CollegePlanning";
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