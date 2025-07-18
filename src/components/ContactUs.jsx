import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageCircle, Linkedin, Github, Instagram } from "lucide-react";

// Mock country codes data
const CountryCode = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+61", country: "Australia" },
  { code: "+55", country: "Brazil" },
  { code: "+7", country: "Russia" },
];

const WEB3FORMS_ACCESS_KEY = "dea0856d-01cb-4314-803c-a914a8061abc";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    countrycode: '+1',
    phoneNo: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, 20]);

  // Mock toast function
  const toast = {
    success: (message) => {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      console.log("Success:", message);
    },
    error: (message) => {
      console.error("Error:", message);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (formData.phoneNo.length < 10 || formData.phoneNo.length > 12) {
      newErrors.phoneNo = "Invalid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const submitContactForm = async () => {
    console.log("Form Data - ", formData);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);

      const submitData = new FormData();
      
      // Required Web3Forms fields
      submitData.append("access_key", WEB3FORMS_ACCESS_KEY);
      
      // Standard form fields that Web3Forms expects
      submitData.append("name", `${formData.firstname} ${formData.lastname}`);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("phone", `${formData.countrycode} ${formData.phoneNo}`);
      
      // Optional fields
      submitData.append("subject", "New Contact Us Submission");
      submitData.append("from_name", `${formData.firstname} ${formData.lastname}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          countrycode: '+1',
          phoneNo: '',
          message: ''
        });
      } else {
        console.error("Web3Forms Error:", result);
        toast.error(result.message || "Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message);
      toast.error("Failed to send message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

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

  return (
    <div className="min-h-screen  py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y: y1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl !mt-10 font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={floatingVariants}
            animate="animate"
          >
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Touch
            </span>
          </motion.h1>
          <motion.p
            className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to start your next project? Let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-8 items-start">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: y2 }}
          >
            {/* Contact Information and Quick Connect - Horizontal on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 md:gap-4 lg:gap-8">
              <motion.div
                className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10"
                variants={itemVariants}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Information</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Email</p>
                      <p className="text-xs sm:text-sm break-all">yashaggarwal2002.ya@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Phone</p>
                      <p className="text-xs sm:text-sm">+91 8273 230 778</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Location</p>
                      <p className="text-xs sm:text-sm">GZB, Uttar Pradesh, India</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

       
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Form Header */}
              <motion.div
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Send a Message</h3>
                <p className="text-white/70 text-sm sm:text-base">Fill out the form below and I'll get back to you as soon as possible.</p>
              </motion.div>

              {/* Success Message */}
              {formSubmitted && (
                <motion.div
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-green-400">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">Message sent successfully!</span>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                  variants={itemVariants}
                >
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-base">
                      <User className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                      First Name
                    </label>
                    <motion.input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.firstname && (
                      <motion.span
                        className="text-red-400 text-xs sm:text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.firstname}
                      </motion.span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-base">
                      <User className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                      Last Name
                    </label>
                    <motion.input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                >
                  <label className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-base">
                    <Mail className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.email && (
                    <motion.span
                      className="text-red-400 text-xs sm:text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                >
                  <label className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-base">
                    <Phone className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                    Phone Number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <motion.select
                      name="countrycode"
                      value={formData.countrycode}
                      onChange={handleInputChange}
                      className="w-full sm:w-auto sm:min-w-0 sm:flex-shrink-0 px-3 py-2 sm:px-3 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                    >
                      {CountryCode.map((country, i) => (
                        <option key={i} value={country.code} className="bg-slate-800">
                          {country.code} - {country.country}
                        </option>
                      ))}
                    </motion.select>
                    <motion.input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      placeholder="12345 67890"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  {errors.phoneNo && (
                    <motion.span
                      className="text-red-400 text-xs sm:text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.phoneNo}
                    </motion.span>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                >
                  <label className="flex items-center gap-2 text-white/90 font-medium text-sm sm:text-base">
                    <MessageCircle className="text-cyan-400 w-4 h-4 flex-shrink-0" />
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell me about your project or just say hello..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none text-sm sm:text-base"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.message && (
                    <motion.span
                      className="text-red-400 text-xs sm:text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                >
                  <motion.button
                    type="button"
                    disabled={loading}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={submitContactForm}
                  >
                    {loading ? (
                      <motion.div
                        className="flex items-center gap-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;