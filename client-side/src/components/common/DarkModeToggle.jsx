import React from "react";
import { motion } from "framer-motion";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
        isDarkMode 
          ? 'bg-blue-600' 
          : 'bg-gray-300'
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Track */}
      <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-blue-600' 
          : 'bg-gray-300'
      }`} />
      
      {/* Thumb */}
      <motion.div
        className={`absolute top-0.5 w-6 h-6 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        animate={{
          x: isDarkMode ? 28 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon */}
        <motion.i
          className={`text-sm transition-colors duration-300 ${
            isDarkMode 
              ? 'fas fa-moon text-white' 
              : 'fas fa-sun text-yellow-500'
          }`}
          animate={{
            rotate: isDarkMode ? 0 : 180,
          }}
          transition={{
            duration: 0.3
          }}
        />
      </motion.div>
      
      {/* Background gradient overlay for smooth transition */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-500 to-blue-700 opacity-100' 
          : 'bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0'
      }`} />
    </motion.button>
  );
};

export default DarkModeToggle;
