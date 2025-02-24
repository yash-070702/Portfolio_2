import {ProjectCard}  from "./ui/ProjectCard";
import { projectData } from '@/data/projects';
export function Projects() {
  return(
    <div className="">
 <div className="text-center text-4xl font-bold text-white !my-20">Projects</div>
        
       <div className=""><ProjectCard testimonials={projectData} /></div> 

    </div>
  );
}
