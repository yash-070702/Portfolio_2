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
import PortfolioBackground from "./components/PortfolioBackground";
import LeetCodeHeatmap from "./components/LeetcodeHeatMap";


const App = () => {
  return (
  //   <div className="container bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  //   <Blob />
  //     <HeroSection />
  //     <AboutMe />
  //   <Projects />
  //   <Skills/>
  //   <LeetCodeHeatmap username="y_a_s_h_07"/>
  //  <OrganisedEvents/>
  //  <ContactUs/>
   
  //  <Footer/>
  //   </div>
  <PortfolioBackground>
  <Blob />
  <HeroSection />
  <AboutMe />
  <Projects />
  <Skills/>
  <LeetCodeHeatmap username="y_a_s_h_07"/>
  <OrganisedEvents/>
  <ContactUs/>
  <Footer/>
  </PortfolioBackground>

  );
};
export default App;
