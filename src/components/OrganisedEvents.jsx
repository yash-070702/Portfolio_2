"use client";

import { Description } from "@mui/icons-material";
import Carousel from "../components/ui/Carousel";
import React from "react";
import { eventsData } from "../data/events";
import { motion } from "framer-motion";
const OrganisedEvents = () => {

    const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className="!relative !overflow-hidden md:!w-9/12  !mx-auto !py-10">
 <motion.h1
             className="text-3xl sm:text-4xl md:text-5xl text-center !mb-20 font-bold text-white mb-4 sm:mb-6 leading-tight"
             variants={floatingVariants}
             animate="animate"
           >
             Organized{" "}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
               Events
             </span>
           </motion.h1>
      <motion.div 
      initial={{ opacity: 0, y: 50 }} // Start invisible and slightly lower
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 1.5 }} // Smooth transition
        viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
      >
        <Carousel slides={eventsData} />
      </motion.div>
    </div>
  );
};

export default OrganisedEvents;
