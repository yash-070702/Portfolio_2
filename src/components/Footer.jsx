import React from "react";
import { SocialIcon } from "react-social-icons";
import resume from "../files/Yash_Aaggarwal_Resume_enhanced.pdf";
import { MdOutlineFileDownload } from "react-icons/md";
const Footer = () => {
  return (
    <div className="flex w-9/12 border-t border-gray-600 justify-between !mx-auto !py-3">
      <div>
        {" "}
        <a href={resume} download="YashResume.pdf">
          <button
            type="button"
            className="flex gap-2 items-center text-white text-xs  !px-3 md:!px-5 !py-2 rounded-3xl bg-gradient-to-r from-[#65a8f6] to-[#338af2] "
          >
            <p>Download CV</p>
            <MdOutlineFileDownload />
          </button>
        </a>
      </div>

        <div className="flex hidden md:block gap-2 items-center text-white text-xs md:text-base !px-3 md:!px-5 md:!py-2 ">Made with ❤️ Y.Aggarwal © 2025</div>
      <div className="flex gap-2 self-center">
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
    </div>
  );
};

export default Footer;
