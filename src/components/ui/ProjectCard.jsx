"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconExternalLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const ProjectCard = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  // Compute delay for the explore button based on description length.
  const descriptionWords = testimonials[active].Description.split(" ");
  const exploreDelay = descriptionWords.length * 0.02 + 0.2;

  return (
    <div className="max-w-sm md:max-w-4xl lg:max-w-6xl !mx-auto antialiased font-sans !px-4 md:!px-8 lg:!px-12 !pt-10 md:!pt-0 md:!py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-8">
        
        {/* Image Section */}
        <div className="flex justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-80 w-full max-w-[280px] md:max-w-none"
          >
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute overflow-hidden inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="w-[250px] h-[250px] md:w-full md:h-full rounded-3xl object-cover object-center mx-auto md:mx-0"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-between flex-col !py-4 text-center md:text-left"
        >
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Enhanced Heading with Animation */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-200 bg-clip-text text-transparent leading-tight mb-2"
            >
              {testimonials[active].Name}
            </motion.h3>
            
            {/* Enhanced Subheading with Badge Style */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-neutral-400 font-medium tracking-wide ">
                {testimonials[active].SubHeading}
              </p>
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </motion.div>
            <motion.p className="text-base md:text-lg lg:text-xl !mt-3 md:!mt-6 text-neutral-300 leading-relaxed">
              {testimonials[active].Description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            
            {/* Enhanced Try Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                delay: exploreDelay,
              }}
              className="mt-6 md:mt-8"
            >
              <motion.a
                href={testimonials[active].url}
                target="_blank"
                rel="noreferrer"
                className="group inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <IconExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <span className="relative z-10">Try Now</span>
                </button>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Navigation & Progress Section */}
          <div className="flex flex-col gap-4 !pt-7 md:!pt-7">
            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                onClick={handlePrev}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center group/button transition-all duration-300"
                aria-label="Previous project"
              >
                <IconArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-neutral-400 group-hover/button:rotate-12 group-hover/button:text-white transition-all duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center group/button transition-all duration-300"
                aria-label="Next project"
              >
                <IconArrowRight className="h-4 w-4 md:h-5 md:w-5 text-neutral-400 group-hover/button:-rotate-12 group-hover/button:text-white transition-all duration-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;