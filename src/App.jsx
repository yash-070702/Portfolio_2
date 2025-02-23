import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import HeroSection from "./components/HeroSection";
import "./index.css";
import AboutMe from "./components/AboutMe";
import {Projects}  from "./components/Projects";
import OrganisedEvents from "./components/OrganisedEvents";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
const App = () => {
  return (
    <div className="container bg-[#000814] ">
      <HeroSection />
      <AboutMe />
    <Projects />
   <OrganisedEvents/>
   <ContactUs/>
   <Footer/>

    </div>
  );
};
// bg-gradient-to-b from-[#103a79] via-[#126bfa] to-[#1c2d6c]
export default App;
