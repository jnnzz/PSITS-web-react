import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../contexts/DarkModeContext";

const FeatureCard = ({ feature }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <motion.div
      className={`rounded-lg shadow-sm border p-6 transition-colors ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {feature.title}
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          isDarkMode
            ? 'bg-blue-900 text-blue-300'
            : 'bg-blue-100 text-blue-800'
        }`}>
          Feature
        </span>
      </div>

      <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {feature.description}
      </p>

      {/* Implementation Flow */}
      <div className="mb-4">
        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Implementation Flow
        </h4>
        <div className={`rounded-lg p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {feature.implementationFlow}
          </p>
        </div>
      </div>

      {/* Related Endpoints */}
      <div>
        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Related Endpoints
        </h4>
        <div className="space-y-1">
          {feature.relatedEndpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center space-x-2">
              <i className={`fas fa-arrow-right text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
              <code className={`text-sm font-mono cursor-pointer ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-800'
              }`}>
                {endpoint}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      {feature.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {feature.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard;
