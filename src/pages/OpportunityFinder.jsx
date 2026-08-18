import OpportunityFinderComponent from "../components/OpportunityFinder/OpportunityFinder";
import { NavLink } from "react-router-dom";
import NavBar from "../components/components/Global/Navbar";
import "./Home.css"
import { useState, useEffect } from 'react';

function OpportunityFinder() {

  return (
    <div className = "OpportunityFinder-page">
      <NavBar/>
      <OpportunityFinderComponent />
    </div>
  );

}

export default OpportunityFinder;