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
      { threshold: 0.5 } // Adjust visibility threshold
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
  return (
    <div className=" md:w-9/12 !my-10  md:!my-16 md:!mx-auto">
      <div className="text-center hidden md:block text-amber-50 text-4xl md:text-6xl py-10">
        Meet Yash
      </div>

      <div className="flex flex-col-reverse md:flex-row  justify-between  md:gap-30 ">
        {/* Image section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Start from left (-100px)
          whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
          transition={{ duration: 1 }} // Smooth transition
          viewport={{ once: true }} // Animate only once
          className="flex flex-col justify-center items-center !ml-2"
        >
          <img src={MyImage} className=" w-[220px] md:w-[300px] " />

          <div
            ref={counterRef}
            className="text-center !py-3 md:w-max !px-10 !mx-12 md:!mx-0  bg-[#1e4e76] rounded-3xl"
          >
            <h2 className=" text-2xl md:text-3xl font-bold !pt-5 text-[#ffffff9c]">
              Achievements
            </h2>
            <div className="flex justify-center gap-10 !mt-5">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-50">
                  {isVisible && <CountUp start={0} end={15} duration={3} />}
                </h3>
                <p className="text-lg text-[#ffffff9c]">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-50">
                  {isVisible && <CountUp start={0} end={300} duration={3} />}+
                </h3>
                <p className="text-lg text-[#ffffff9c]">Problem Solved</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Start from right (+100px)
          whileInView={{ opacity: 1, x: 0 }} // Move to normal position
          transition={{ duration: 1 }} // Smooth transition
          viewport={{ once: true }} // Animate only once
          className="flex flex-col justify-center gap-10  whitespace-pre-line !p-5 md:!p-10"
        >
          <h2 className="text-5xl font-bold text-amber-50 py-10 text-center self-center">
            About Me
          </h2>
          <div className="text-[#ffffff9c] md:text-xl  whitespace-pre-line  text-center">
            Hi, I'm{" "}
            <p className="inline font-bold underline italic">Yash Aggarwal</p>,
            a pre-final year{" "}
            <p className="inline font-bold">
              Computer Science Engineering student at KIET Group of Institutions
            </p>
            . As the Technical Lead of Kinesis Technical Society, I have had the
            privilege of mentoring over{" "}
            <p className="inline font-bold underline"> 100+ students,</p>{" "}
            guiding them in their tech journeys. Passionate about building
            scalable solutions, I am currently working on my own platform,
            <p className="inline font-bold underline">@SYV.</p> With expertise
            as a MERN stack developer and a strong foundation in competitive
            programming, I am eager to gain industry exposure through an
            internship in the field of development. Always ready to innovate and
            solve real-world problems, I thrive on challenges that push my
            technical and problem-solving skills to the next level."
          </div>
          {/* CTA BUttons */}
          <div className="flex gap-4 self-center md:!mt-10 ">
            <a href={resume} download="YashResume.pdf">
              <button
                type="button"
                className="flex gap-2 items-center text-white text-xs md:text-base !px-3 md:!px-5 !py-2 rounded-3xl bg-gradient-to-r from-[#65a8f6] to-[#338af2] "
              >
                <p>Download CV</p>
                <MdOutlineFileDownload />
              </button>
            </a>
            <a
              href="mailto:yashaggarwal2002.ya@gmail.com"
              className="flex gap-2 items-center text-white text-xs md:text-base !px-3 md:!px-5 md:!py-2 rounded-3xl border border-[#ffffff9c]  "
            >
              <p>Contact Me</p>
              <IoMail />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
