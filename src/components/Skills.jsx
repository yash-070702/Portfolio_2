"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills} from "../data/Skills";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const AnimatedTooltipPreview = () => {
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
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
    const { ref, inView } = useInView({
        triggerOnce: true, // Animates only once
        threshold: 0.1, // Starts animation when 10% of the element is visible
      });
  return (
    <motion.div
    ref={ref}
      initial={{ opacity: 0, y: -100 }} // Starts from above
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }} // Moves to original position
      transition={{ duration: 0.8, ease: "easeOut" }}
     className="lg:mt-10 lg:mb-30">
       <motion.h1
                   className="text-3xl sm:text-4xl md:text-5xl text-center !mb-20 font-bold text-white mb-4 sm:mb-6 leading-tight"
                   variants={floatingVariants}
                   animate="animate"
                 >
                   Tech Stack &{" "}
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                     Skills
                   </span>
                 </motion.h1>
      <div className="text-center mx-auto md:w-9/12 !mx-3 md:!mx-auto md:!px-20 text-[#ffffff9c]  md:text-xl !mb-10 ">
        <motion.p
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto px-4"
              variants={itemVariants}
            >
              With a strong foundation in{" "}
              <span className="text-cyan-400 font-semibold">full-stack development</span>, 
              I specialize in building dynamic, high-performance web applications. 
              From crafting responsive user interfaces to architecting scalable backend systems, 
              I leverage the latest technologies to deliver{" "}
              <span className="text-blue-400 font-semibold">seamless digital experiences</span>.
            </motion.p>
               <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8 px-4"
              variants={itemVariants}
            >
              {[
                "Frontend Frameworks",
                "Backend Development", 
                "Real-time Communication",
                "State Management",
                "Database Handling"
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
      </div>
      <div className="flex flex-row items-center justify-center !mb-10 w-full">
        <AnimatedTooltip items={skills} />
      </div>
    </motion.div>
  );
};
export default AnimatedTooltipPreview;

