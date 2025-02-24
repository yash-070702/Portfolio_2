import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Blob = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveBlob = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveBlob);
    return () => window.removeEventListener("mousemove", moveBlob);
  }, []);

  return (
    <motion.div
      className="blob"
      animate={{
        x: position.x - 50, // Offset for centering
        y: position.y - 50,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    />
  );
};

export default Blob;
