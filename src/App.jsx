import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import "./index.css";
import AboutMe from "./components/AboutMe";
import {Projects}  from "./components/Projects";
import OrganisedEvents from "./components/OrganisedEvents";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Blob from "./components/Blob";
import Skills from "./components/Skills";
const App = () => {
  return (
    <div className="container bg-[#000814] ">
    <Blob />
      <HeroSection />
      <AboutMe />
    <Projects />
    <Skills/>
   <OrganisedEvents/>
   <ContactUs/>
   <Footer/>
    </div>

  );
};
// bg-gradient-to-b from-[#103a79] via-[#126bfa] to-[#1c2d6c]
export default App;
