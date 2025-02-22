"use client";

import { Description } from "@mui/icons-material";
import Carousel from "../components/ui/Carousel";
import React from 'react'
import {eventsData} from "../data/events";
import { motion } from "framer-motion";
const OrganisedEvents = () => {
    
      return (
        (<div className="!relative !overflow-hidden md:!w-9/12  !mx-auto !py-10">
        <motion.div
        initial={{ opacity: 0 }}         // Start fully transparent
      animate={{ opacity: 1 }}         // Animate to fully visible
      transition={{ duration: 1 }}
         className="text-center text-4xl font-bold text-white !mb-10">Our   Events</motion.div>
          <Carousel slides={eventsData} />
        </div>)
      );
}

export default OrganisedEvents

