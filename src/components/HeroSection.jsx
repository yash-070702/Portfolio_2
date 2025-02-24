import { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import logo1 from "../assets/mineImages/logo1.png";
import mainImage from "../assets/mineImages/heroImage.png";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import AOS from "aos";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import resume from "../files/Yash_Aaggarwal_Resume.pdf";
import Arrow from "../assets/up-arrow.png";
import { Link } from "react-router-dom";
import { Projects } from "./Projects";
const HeroSection = () => {
  const text = "Yash Aggarwal";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 100);
    } else if (isDeleting && index > 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, 50);
    } else {
      // Pause before deleting or retyping
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div id="herosection" className="flex flex-col items-center">
      {/* NavBar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className=" w-9/12 flex flex-row items-center text-[#ffffff9c] !mt-4  justify-between "
      >
        <div className="flex flex-row items-center !mt-2">
          <img src={logo1} className="md:w-[120px]" alt="icon" />
        </div>
        <div className="hidden lg:flex lg:flex-row items-center gap-4 text-[1.2rem]">
          <a href=<Projects />>
            <button type="button">Home</button>
          </a>
          <button type="button">About</button>
          <button type="button">Projects</button>
          <button type="button">Events</button>
          <button type="button">Contact</button>
        </div>
      </motion.nav>

      {/* Main Profile Section */}
      <div className="flex flex-col md:flex-row items-center justify-between  md:w-9/12 !mt-10 md:!mt-20 ">
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }} // Start off-screen (left)
          animate={{ x: 0, opacity: 1 }} // Move to normal position
          transition={{ duration: 1, ease: "easeOut" }} // Smooth effect
          className="  h-full md:w-[45%]"
        >
          {" "}
          <div>
            <h1 className="text-[#76a4d9] font-semibold text-center md:text-start text-2xl  md:text-xl !mb-5">
              Welcome To My Portfolio !
            </h1>
            <div className="text-center md:text-start text-4xl h-17 md:h-27  md:text-6xl  text-white !mb-7">
              Hello! My Name's <br />
              <p className="text-[#3fd5f3]">{displayedText}</p>
            </div>
            <div className="text-[#ffffff9c] !mx-5 text-center md:!mx-0 md:text-start text-[1.2rem]">
            A passionate MERN stack developer, innovator, and problem solver, constantly pushing the boundaries of web development.{" "}
            </div>
          </div>
          <div className="flex gap-4 justify-center md:justify-start !mt-10 ">
            <a href={resume} download="YashResume.pdf">
              <button
                type="button"
                className="flex gap-2 items-center text-white text-xs md:text-base !px-3 md:!px-5 !py-2 rounded-3xl bg-gradient-to-r from-[#65a8f6] to-[#338af2] "
              >
                <p>Download CV</p>
                <MdOutlineFileDownload />
              </button>
            </a>
            <a href="mailto:yashaggarwal2002.ya@gmail.com" className="flex gap-2 items-center text-white text-xs md:text-base !px-3 md:!px-5 md:!py-2 rounded-3xl border border-[#ffffff9c]  ">

              <p>Contact Me</p>
              <IoMail />
            </a>
            
          </div>
        </motion.div>

        <motion.img
          initial={{ x: "100vw", opacity: 0 }} // Start off-screen (right)
          animate={{ x: 0, opacity: 1 }} // Move to normal position
          transition={{ duration: 1, ease: "easeOut" }}
          src={mainImage}
          alt="mainImage"
          className=" w-[250px] !mt-7 md:!mt-0 relative -right-3 md:block md:w-[390px]"
        />

        <motion.div
          initial={{ x: "100vw", opacity: 0 }} // Start off-screen (right)
          animate={{ x: 0, opacity: 1 }} // Move to normal position
          transition={{ duration: 1, ease: "easeOut" }}
          className=" md:absolute right-[0px] !mt-5 gap-7 md:gap-20  flex md:flex-col"
        >
          <div className=" flex items-center  md:rotate-90  text-[#ffffff9c]">
            {" "}
            <p className="text-[#ffffff9c] !mr-2">FOLLOW ME ON</p>{" "}
            <FaArrowRight />
          </div>
          <div className="flex md:flex-col gap-2 self-center">
            {" "}
            <SocialIcon
              url="https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/"
              target="_blank"
              style={{ width: 30, height: 30 }} // Adjust the size
            />
            <SocialIcon
              url="https://www.instagram.com/y_a_s_h_07"
              target="_blank"
              style={{ width: 30, height: 30 }} // Adjust the size
            />
            <SocialIcon
              url="https://github.com/yash_070702"
              target="_blank"
              style={{ width: 30, height: 30 }} // Adjust the size
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.div
        className=" hidden md:absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDownIcon className="w-10 h-10 text-white" />
      </motion.div>

      <div className=" fixed bottom-10 right-7 transform -translate-x-1/2">
        <a href="#herosection">
          {" "}
          <img src={Arrow} className="w-[20px] md:w-[50px] !z-1000" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
