import {ProjectCard}  from "./ui/ProjectCard";
import { projectData } from '@/data/projects';
import { motion } from "framer-motion";
export function Projects() {
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
  return(
    <div className="">
<motion.h1
             className="text-3xl mt-20 sm:text-4xl md:text-5xl text-center !mb-20 font-bold text-white mb-4 sm:mb-6 leading-tight"
             variants={floatingVariants}
             animate="animate"
           >
            Featured{" "}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
               Projects
             </span>
           </motion.h1>
        
       <div className=""><ProjectCard testimonials={projectData} /></div> 

    </div>
  );
}
