"use client";

import { Description } from "@mui/icons-material";
import Carousel from "../components/ui/Carousel";
import React from "react";
import { eventsData } from "../data/events";
import { motion } from "framer-motion";
const OrganisedEvents = () => {
  return (
    <div className="!relative !overflow-hidden md:!w-9/12  !mx-auto !py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start invisible and slightly lower
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.8 }} // Smooth transition
        viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
        className="text-center text-4xl font-bold text-white !mb-10"
      >
        Our Events
      </motion.div>
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
