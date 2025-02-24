"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "HTML",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    id: 2,
    name: "CSS",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    id: 3,
    name: "JavaScript",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    id: 4,
    name: "React",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    id: 5,
    name: "Node.js",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    id: 6,
    name: "Next.js",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    id: 7,
    name: "TypeScript",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    id: 10,
    name: "Tailwind CSS",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    id: 11,
    name: "Redux",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    id: 12,
    name: "MongoDB",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    id: 13,
    name: "Git",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

const AnimatedTooltipPreview = () => {
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
     className="">
      <div className="text-center text-4xl font-bold text-white !my-10 md:!my-20">
        Tech Stack & Skills
      </div>
      <div className="text-center mx-auto md:w-9/12 !mx-3 md:!mx-auto md:!px-20 text-[#ffffff9c]  md:text-xl !mb-10 ">
        With a strong foundation in full-stack development, I specialize in
        building dynamic, high-performance web applications. From crafting
        responsive user interfaces to architecting scalable backend systems, I
        leverage the latest technologies to deliver seamless digital
        experiences. I am proficient in frontend frameworks, backend
        development, real-time communication, state management, and database
        handling. Whether it's creating RESTful APIs, implementing
        authentication, or optimizing performance, I continuously refine my
        skills to stay ahead in the ever-evolving tech landscape. Here are some
        of the technologies I work with:
      </div>
      <div className="flex flex-row items-center justify-center !mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>
    </motion.div>
  );
};
export default AnimatedTooltipPreview;
