import { motion } from "framer-motion";
import React from "react";

const PortfolioBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 animate-pulse" 
             style={{
               animation: 'backgroundShift 15s ease-in-out infinite'
             }}>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-20 h-20 bg-white/5 rounded-full top-1/4 left-1/4 animate-bounce" 
               style={{
                 animation: 'float 20s infinite linear',
                 animationDelay: '0s'
               }}>
          </div>
          <div className="absolute w-16 h-16 bg-white/5 rounded-full top-3/4 right-1/4 animate-bounce" 
               style={{
                 animation: 'float 25s infinite linear',
                 animationDelay: '5s'
               }}>
          </div>
          <div className="absolute w-24 h-24 bg-white/5 rounded-full top-1/2 right-1/3 animate-bounce" 
               style={{
                 animation: 'float 30s infinite linear',
                 animationDelay: '10s'
               }}>
          </div>
          <div className="absolute w-12 h-12 bg-white/5 rounded-full bottom-1/4 left-1/5 animate-bounce" 
               style={{
                 animation: 'float 22s infinite linear',
                 animationDelay: '15s'
               }}>
          </div>
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               animation: 'gridMove 30s linear infinite'
             }}>
        </div>
        
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-white/2 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes backgroundShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-20px) translateY(-10px); }
          50% { transform: translateX(20px) translateY(10px); }
          75% { transform: translateX(-10px) translateY(20px); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        
        @media (max-width: 768px) {
          .absolute.w-20, .absolute.w-16, .absolute.w-24, .absolute.w-12 {
            display: none;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioBackground;