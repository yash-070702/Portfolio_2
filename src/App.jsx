import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { SocialIcon } from "react-social-icons";
import HeroSection from "./components/HeroSection";
import "./index.css";
import logo1 from "./assets/mineImages/logo1.png";
import AboutMe from "./components/AboutMe";
import { Projects } from "./components/Projects";
import OrganisedEvents from "./components/OrganisedEvents";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Blob from "./components/Blob";
import Skills from "./components/Skills";
import PortfolioBackground from "./components/PortfolioBackground";
import LeetCodeHeatmap from "./components/LeetcodeHeatMap";

const App = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Enhanced scroll tracking to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "events", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Enhanced scroll function with better error handling
  const scrollToSection = (sectionId) => {
    console.log(`Attempting to scroll to: ${sectionId}`); // Debug log
    
    const element = document.getElementById(sectionId);
    if (element) {
      console.log(`Found element for ${sectionId}`); // Debug log
      
      // Close mobile menu first
      setIsMobileMenuOpen(false);
      
      // Small delay to ensure menu closes before scrolling
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
        setActiveSection(sectionId);
      }, 100);
    } else {
      console.error(`Element with id "${sectionId}" not found`); // Debug log
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <PortfolioBackground>
      <Blob />
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full mx-auto max-w-7xl flex flex-row items-center text-white/70 mt-6 justify-between backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10"
          style={{ y: y1, opacity }}
        >
          <motion.div
            className="flex flex-row items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollToSection("home")}
          >
            <img src={logo1} className="w-16 md:w-24 lg:w-32" alt="logo" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-row items-center gap-6 text-sm font-medium">
            {["home", "about", "projects", "events", "contact"].map((item) => (
              <motion.button
                key={item}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToSection(item);
                }}
                className={`relative capitalize transition-all duration-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer ${
                  activeSection === item ? "text-cyan-400" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden mobile-menu-container">
            <motion.button
              className="text-white/70 hover:text-white transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
              }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex  flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  className="w-6 h-0.5 bg-current block transition-all origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all origin-center"
                />
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-md z-50 lg:hidden border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-white text-lg font-semibold">Menu</h2>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/70 hover:text-white transition-colors p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 px-6 py-8">
                  <motion.div
                    initial="closed"
                    animate="open"
                    className="space-y-4"
                  >
                    {["home", "about", "projects", "events", "contact"].map(
                      (item, index) => (
                        <motion.button
                          key={item}
                          variants={menuItemVariants}
                          transition={{ delay: index * 0.1 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection(item);
                          }}
                          className={`w-full text-left capitalize text-lg py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-cyan-400 cursor-pointer ${
                            activeSection === item
                              ? "text-cyan-400 bg-white/5"
                              : "text-white/70"
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item}
                        </motion.button>
                      )
                    )}
                  </motion.div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-center gap-4">
                    {[
                      {
                        url: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/",
                        network: "linkedin",
                      },
                      {
                        url: "https://www.instagram.com/y_a_s_h_07",
                        network: "instagram",
                      },
                      {
                        url: "https://github.com/yash_070702",
                        network: "github",
                      },
                    ].map((social, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        variants={menuItemVariants}
                        transition={{ delay: (index + 5) * 0.1 }}
                      >
                        <SocialIcon
                          url={social.url}
                          target="_blank"
                          style={{ width: 35, height: 35 }}
                          className="hover:shadow-lg transition-all duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Make sure all sections have the correct IDs */}
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <Skills />
      {/* <LeetCodeHeatmap username="y_a_s_h_07" /> */}
      <section id="events">
        <OrganisedEvents />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />
    </PortfolioBackground>
  );
};

export default App;