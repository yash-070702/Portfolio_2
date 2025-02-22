"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="max-w-sm md:max-w-4xl lg:max-w-6xl !mx-auto antialiased font-sans !px-4 md:!px-8 lg:!px-12  !pt-10 md:!pt-0  md:!py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-20">
        <div>
           <motion.div
           initial={{ opacity: 0, x: -100 }} // Start from left (-100px)
                whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
                transition={{ duration: 1 }} // Smooth transition
                viewport={{ once: true }} // Animate only once
                 className="relative md:block h-80 w-full">
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
                    className=" w-[250px] h-[250px] md:w-full md:h-full   rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>


        <motion.div
        initial={{ opacity: 0, x: 100 }} // Start from right (+100px)
              whileInView={{ opacity: 1, x: 0 }} // Move to normal position
              transition={{ duration: 1 }} // Smooth transition
              viewport={{ once: true }} // Animate only once
         className="flex justify-between flex-col !py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-white">
              {testimonials[active].Name}
            </h3>
            <p className="text-sm text-neutral-500">
              {testimonials[active].SubHeading}
            </p>
            <motion.p className="md:text-lg !mt-5 md:!mt-8 text-neutral-300">
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
            {/* Explore Button: Appears after the description finishes animating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                delay: exploreDelay,
              }}
              className="!mt-2 md:!mt-0"
            >
              <a href={testimonials[active].url} target="_blank" rel="noreferrer">
                <button className="!px-4 !py-2 rounded-xl !mt-4  bg-white text-black  text-xs font-bold">
                Try now →
                </button>
              </a>
            </motion.div>
          </motion.div>
          <div className="flex gap-4 !pt-7 md:!pt-7">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;
