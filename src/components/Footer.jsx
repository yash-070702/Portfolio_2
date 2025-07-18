import React from "react";
import { SocialIcon } from "react-social-icons";
import resume from "../files/Yash_Aaggarwal_Resume.pdf";
import { MdOutlineFileDownload } from "react-icons/md";
import { motion } from "framer-motion";
import { FaArrowUp, FaHeart } from "react-icons/fa6";

const Footer = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Top Border */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
            variants={itemVariants}
          />

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Section - Download CV */}
            <motion.div
              className="flex justify-center md:justify-start"
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
                  className="flex items-center justify-center gap-2 text-white text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium min-w-[140px] backdrop-blur-sm"
                >
                  <span>Download CV</span>
                  <MdOutlineFileDownload className="text-base group-hover:translate-y-0.5 transition-transform" />
                </button>
              </motion.a>
            </motion.div>

            {/* Center Section - Copyright */}
            <motion.div
              className="flex justify-center items-center order-3 md:order-2"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm font-medium text-center">
                <span>Made with</span>
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="text-red-400"
                >
                  <FaHeart className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
                <span>by Y.Aggarwal © 2025</span>
              </div>
            </motion.div>

            {/* Right Section - Social Links + Scroll Top */}
            <motion.div
              className="flex justify-center md:justify-end items-center gap-4 order-2 md:order-3"
              variants={itemVariants}
            >
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  { url: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/", network: "linkedin" },
                  { url: "https://www.instagram.com/y_a_s_h_07", network: "instagram" },
                  { url: "https://github.com/yash_070702", network: "github" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <SocialIcon
                      url={social.url}
                      target="_blank"
                      style={{ 
                        width: 32, 
                        height: 32,
                        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="group p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={itemVariants}
              >
                <FaArrowUp className="w-3 h-3 md:w-4 md:h-4 text-white/70 group-hover:text-cyan-400 transition-colors" />
              </motion.button>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;