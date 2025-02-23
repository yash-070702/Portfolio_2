import React from 'react'
import ContactDetails from './ui/ContactDetails'
import ContactUsForm from './ui/ContactUsForm';
import { motion } from "framer-motion";
const ContactUs = () => {
  return (
    <div className='md:w-9/12 !mx-5 md:!mx-auto !py-10'>
    <div className="text-center md:text-5xl text-4xl font-bold text-white !mb-10">Contact Us</div>
      <div className="!mx-auto !mt-20 flex md:w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white  lg:flex-row">
        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Start from left (-100px)
                whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
                transition={{ duration: 1 }} // Smooth transition
                viewport={{ once: true }} // Animate only once
         className="lg:w-[40%]">
          <ContactDetails />
        </motion.div>

          {/* Contact Form */}
          <motion.div 
          initial={{ opacity: 0, x: 100 }} // Start from left (-100px)
                whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
                transition={{ duration: 1 }} // Smooth transition
                viewport={{ once: true }} // Animate only once
          className="lg:w-[60%]">
        <h1 className="text-white text-4xl text-center lg:text-left font-semibold ">Got a Idea ? We've Got the Skills.Let's team up</h1>
        <p className="!mx-auto font-bold text-[#838894] text-md !mb-10 !mt-5">Tell us more about yourself and what you are got in a mind</p>
          <ContactUsForm />
        </motion.div>
      </div>
    </div>
  )
}

export default ContactUs
