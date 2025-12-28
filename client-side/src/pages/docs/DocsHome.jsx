import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DocLayout from "../../components/docs/DocLayout";
import { documentationAPI, transformDocStats } from "../../api/documentation";
import { useDarkMode } from "../../contexts/DarkModeContext";

const DocsHome = () => {
  const { isDarkMode } = useDarkMode();
  const [stats, setStats] = useState({
    apiEndpoints: 0,
    features: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await documentationAPI.getStats();
        if (response.success) {
          const transformedStats = transformDocStats(response.data);
          setStats(transformedStats);
        }
      } catch (err) {
        console.error('Error fetching documentation stats:', err);
        setError('Failed to load documentation statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      icon: "fas fa-code",
      number: stats.apiEndpoints,
      title: "API Endpoints",
      description: "RESTful endpoints documented",
      color: "blue",
      link: "/docs/api"
    },
    {
      icon: "fas fa-cogs",
      number: stats.features,
      title: "Features",
      description: "Core features available",
      color: "purple",
      link: "/docs/features"
    }
  ];

  const getColorClasses = (color, isDark) => {
    if (isDark) {
      switch (color) {
        case 'blue': return 'bg-blue-600 text-white';
        case 'purple': return 'bg-purple-600 text-white';
        case 'green': return 'bg-green-600 text-white';
        default: return 'bg-gray-600 text-white';
      }
    } else {
      switch (color) {
        case 'blue': return 'bg-blue-600 text-white';
        case 'purple': return 'bg-purple-600 text-white';
        case 'green': return 'bg-green-600 text-white';
        default: return 'bg-gray-600 text-white';
      }
    }
  };

  if (loading) {
    return (
      <DocLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <i className={`fas fa-spinner fa-spin text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Loading Documentation
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please wait while we fetch the latest documentation...
            </p>
          </div>
        </div>
      </DocLayout>
    );
  }

  if (error) {
    return (
      <DocLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? 'bg-red-900' : 'bg-red-100'
            }`}>
              <i className={`fas fa-exclamation-triangle text-2xl ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Error Loading Documentation
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </DocLayout>
    );
  }

  return (
    <DocLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            PSITS Developer Portal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Complete API documentation and integration guides for building powerful applications with our platform.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {statsData.map((stat, index) => (
            <Link key={index} to={stat.link} className={`rounded-lg shadow-sm border p-6 text-center transition-colors hover:shadow-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}>
              <div className={`w-12 h-12 ${getColorClasses(stat.color, isDarkMode)} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
              <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.number}</div>
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.description}</p>
            </Link>
          ))}
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-lg shadow-sm border p-8 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-600'
            }`}>
              <i className="fas fa-rocket text-xl"></i>
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Start Guide</h2>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get up and running with PSITS API in minutes. Our comprehensive documentation covers everything from authentication to advanced integrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/docs/api" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base text-center">
                  <i className="fas fa-code mr-2"></i>
                  Browse API Docs
                </Link>
                <Link to="/docs/features" className={`px-4 sm:px-6 py-2 sm:py-3 border rounded-lg transition-colors font-medium text-sm sm:text-base text-center ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <i className="fas fa-cogs mr-2"></i>
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* API Documentation */}
          <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                isDarkMode
                  ? 'bg-blue-900 text-blue-300'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <i className="fas fa-code text-lg"></i>
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API Documentation</h3>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Complete REST API reference with detailed endpoints, request/response examples, and authentication methods.
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                RESTful endpoints with JSON responses
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                JWT-based authentication
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Interactive examples and code snippets
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Rate limiting and error handling
              </li>
            </ul>
            <Link to="/docs/api" className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              <i className="fas fa-arrow-right mr-2"></i>
              View API Docs
            </Link>
          </div>

          {/* Features Documentation */}
          <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                isDarkMode
                  ? 'bg-purple-900 text-purple-300'
                  : 'bg-purple-100 text-purple-600'
              }`}>
                <i className="fas fa-cogs text-lg"></i>
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Features Guide</h3>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive guides for all PSITS platform features including implementation flows and best practices.
            </p>
            <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Step-by-step implementation guides
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Feature categorization and tagging
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Related API endpoint references
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Access level documentation
              </li>
            </ul>
            <Link to="/docs/features" className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}>
              <i className="fas fa-arrow-right mr-2"></i>
              Explore Features
            </Link>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode
                ? 'bg-green-900 text-green-300'
                : 'bg-green-100 text-green-600'
            }`}>
              <i className="fas fa-shield-alt text-lg"></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Authentication</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Secure JWT-based authentication with multiple verification methods and role-based access control.
            </p>
          </div>

          <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode
                ? 'bg-orange-900 text-orange-300'
                : 'bg-orange-100 text-orange-600'
            }`}>
              <i className="fas fa-bolt text-lg"></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Real-time Updates</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              WebSocket support for live data synchronization, notifications, and real-time collaboration features.
            </p>
          </div>

          <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode
                ? 'bg-red-900 text-red-300'
                : 'bg-red-100 text-red-600'
            }`}>
              <i className="fas fa-tachometer-alt text-lg"></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rate Limiting</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fair usage policies with generous limits for all API endpoints and comprehensive error handling.
            </p>
          </div>
        </motion.div>
      </div>
    </DocLayout>
  );
};

export default DocsHome;
