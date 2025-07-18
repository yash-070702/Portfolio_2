import { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import logo1 from "../assets/mineImages/logo1.png";
import mainImage from "../assets/mineImages/heroImage.png";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import resume from "../files/Yash_Aaggarwal_Resume.pdf";
import Arrow from "../assets/up-arrow.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const text = "Yash Aggarwal";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Enhanced typing effect with cursor
  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 150);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside and manage body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent/enable body scroll when mobile menu is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
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
    <div id="herosection" className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Enhanced NavBar */}
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-7xl flex flex-row items-center text-white/70 mt-6 justify-between backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10"
          style={{ y: y1, opacity }}
        >
          <motion.div 
            className="flex flex-row items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={logo1} className="w-16 md:w-24 lg:w-32" alt="logo" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-row items-center gap-6 text-sm font-medium">
            {["home", "about", "projects", "events", "contact"].map((item) => (
              <motion.button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className={`relative capitalize transition-all duration-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-white/5 ${
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
              onClick={toggleMobileMenu}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-current block transition-all origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                    {["home", "about", "projects", "events", "contact"].map((item, index) => (
                      <motion.button
                        key={item}
                        variants={menuItemVariants}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(item)}
                        className={`w-full text-left capitalize text-lg py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-cyan-400 ${
                          activeSection === item ? "text-cyan-400 bg-white/5" : "text-white/70"
                        }`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-center gap-4">
                    {[
                      { url: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/", network: "linkedin" },
                      { url: "https://www.instagram.com/y_a_s_h_07", network: "instagram" },
                      { url: "https://github.com/yash_070702", network: "github" },
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

        {/* Enhanced Main Profile Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mt-5 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            variants={itemVariants}
            style={{ y: y2 }}
          >
            <motion.h1
              className="text-cyan-400 font-semibold text-2xl md:text-base lg:text-3xl mb-4 px-2"
              variants={itemVariants}
            >
              Welcome To My Portfolio!
            </motion.h1>

            <motion.div
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 font-bold leading-tight px-2"
              variants={itemVariants}
            >
              Hello! My Name's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {displayedText}
                <span className="animate-pulse text-cyan-400">|</span>
              </span>
            </motion.div>

            <motion.p
              className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 px-4 lg:px-2"
              variants={itemVariants}
            >
              A passionate MERN stack developer, innovator, and problem solver, constantly pushing the boundaries of web development.
            </motion.p>

            <motion.div
              className="flex sm:flex-row gap-3 justify-center lg:justify-start px-4 lg:px-2"
              variants={itemVariants}
            >
              <motion.a
                href={resume}
                download="YashResume.pdf"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-white text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium min-w-[140px]"
                >
                  <span>Download CV</span>
                  <MdOutlineFileDownload className="text-base group-hover:translate-y-0.5 transition-transform" />
                </button>
              </motion.a>

              <motion.a
                href="mailto:yashaggarwal2002.ya@gmail.com"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-white text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full border-2 border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm font-medium min-w-[140px]"
                >
                  <span>Contact Me</span>
                  <IoMail className="text-base group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end lg:pr-20 relative"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-30 scale-110"></div>
              <img
                src={mainImage}
                alt="Yash Aggarwal"
                className="relative top-7 z-10 w-52 md:w-60 xl:w-[370px] rounded-full border-4 border-white/10 shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            className="lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-10 flex lg:flex-col items-center gap-6 lg:gap-8"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center -translate-x-3 gap-3 text-white/60 text-sm font-medium"
              variants={itemVariants}
            >
              <span className="lg:rotate-90 lg:whitespace-nowrap">FOLLOW ME ON</span>
            </motion.div>

            <motion.div
              className="flex mt-10 mb-10 -translate-x-3 lg:flex-col gap-4"
              variants={itemVariants}
            >
              {[
                { url: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/", network: "linkedin" },
                { url: "https://www.instagram.com/y_a_s_h_07", network: "instagram" },
                { url: "https://github.com/yash_070702", network: "github" },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  variants={pulseVariants}
                  animate="animate"
                >
                  <SocialIcon
                    url={social.url}
                    target="_blank"
                    style={{ 
                      width: 40, 
                      height: 40,
                      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
                    }}
                    className="hover:shadow-lg transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Down Indicator */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Enhanced Scroll to Top Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showScrollButton ? 1 : 0,
            scale: showScrollButton ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => scrollToSection("herosection")}
            className="group p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img 
              src={Arrow} 
              alt="scroll to top"
              className="w-5 h-5 md:w-6 md:h-6 filter brightness-0 invert group-hover:scale-110 transition-transform"
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;