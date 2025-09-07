import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import MyImage from "../assets/mineImages/about.png";
import { IoMail } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { motion } from "framer-motion";
import resume from "../files/Yash_Aaggarwal_Resume.pdf";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

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
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Enhanced Title */}
      <motion.h1
                   className="text-3xl sm:text-4xl md:text-5xl text-center !mb-20 font-bold text-white mb-4 sm:mb-6 leading-tight"
                   variants={floatingVariants}
                   animate="animate"
                 >
                   Meet{" "}
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                     Yash
                   </span>
                 </motion.h1>

        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Enhanced Image Section */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center order-2 lg:order-1"
            variants={itemVariants}
          >
            <motion.div
              className="relative mb-8"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Interactive 3D Avatar */}
              <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-30 scale-110"></div>
                
                {/* 3D Avatar Container */}
                <div className="relative z-10 w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full border-4 border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-cyan-400/40 rounded-full animate-ping"></div>
                    <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-blue-500/40 rounded-full animate-ping animation-delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-purple-500/40 rounded-full animate-ping animation-delay-2000"></div>
                  </div>
                  
                  {/* Developer Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* Code Symbol */}
                      <motion.div
                        className="text-6xl md:text-7xl lg:text-8xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                        animate={{ 
                          rotateY: [0, 360],
                          scale: [1, 1.1, 1] 
                        }}
                        transition={{ 
                          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {'< />'}
                      </motion.div>
                      
                      {/* Animated Tech Stack Icons */}
                      <div className="flex justify-center gap-2 mb-2">
                        {['React', 'Node', 'JS', 'CSS'].map((tech, index) => (
                          <motion.div
                            key={tech}
                            className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg"
                            animate={{ 
                              y: [0, -10, 0],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                              ease: "easeInOut"
                            }}
                          >
                            {tech.slice(0, 2)}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm">
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-medium">Coding...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Code Elements */}
                  <motion.div
                    className="absolute top-4 right-4 text-cyan-400/60 text-xs font-mono"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    console.log('Hello World');
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 text-blue-400/60 text-xs font-mono"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    {'{ success: true }'}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Achievements Card */}
            <motion.div
              ref={counterRef}
              className="w-full max-w-sm bg-gradient-to-br from-[#1e4e76] to-[#2a5f8a] rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white/90">
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <motion.h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {isVisible && <CountUp start={0} end={15} duration={3} />}
                  </motion.h3>
                  <p className="text-sm md:text-base text-white/70 mt-2">Projects Completed</p>
                </div>
                <div className="text-center">
                  <motion.h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {isVisible && <CountUp start={0} end={750} duration={3} />}+
                  </motion.h3>
                  <p className="text-sm md:text-base text-white/70 mt-2">Problems Solved</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced About Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-4xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8"
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            
            <motion.div 
              className="text-white/80 text-base md:text-lg lg:text-md leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              <p className="mb-4">
                Hi, I'm{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Yash Aggarwal
                </span>
                , a pre-final year{" "}
                <span className="font-bold text-white">
                  Computer Science Engineering student at KIET Group of Institutions
                </span>
                .
              </p>
              
              <p className="mb-4">
                As the Technical Lead of Kinesis Technical Society, I have had the
                privilege of mentoring over{" "}
                <span className="font-bold text-white">100+ students</span>,
                guiding them in their tech journeys.
              </p>
              
              <p className="mb-4">
                Passionate about building scalable solutions, I am currently working on my own platform,{" "}
                <span className="font-bold text-white">@SYV</span>. With expertise
                as a MERN stack developer and a strong foundation in competitive
                programming, I am eager to gain industry exposure through an
                internship in the field of development.
              </p>
              
              <p>
                Always ready to innovate and solve real-world problems, I thrive on
                challenges that push my technical and problem-solving skills to the next level.
              </p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
                  className="flex items-center justify-center gap-2 text-white text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-medium min-w-[160px] w-full sm:w-auto"
                >
                  <span>Download CV</span>
                  <MdOutlineFileDownload className="text-lg group-hover:translate-y-0.5 transition-transform" />
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
                  className="flex items-center justify-center gap-2 text-white text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm font-medium min-w-[160px] w-full sm:w-auto"
                >
                  <span>Contact Me</span>
                  <IoMail className="text-lg group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;