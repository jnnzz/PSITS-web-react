import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeAuthentication } from "../../authentication/Authentication";
import { showToast } from "../../utils/alertHelper";
import { useDarkMode } from "../../contexts/DarkModeContext";
import DarkModeToggle from "../common/DarkModeToggle";

const DocLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const sidebarItems = [
    { name: "Home", path: "/docs", icon: "fas fa-home" },
    { name: "API Endpoints", path: "/docs/api", icon: "fas fa-code" },
    { name: "Features", path: "/docs/features", icon: "fas fa-layer-group" }
  ];

  const handleBackToPSITS = () => {
    try {
      // Clear authentication and logout
      removeAuthentication();
      showToast("success", "Logged out from Developer Portal");

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      showToast("error", "Error logging out");
      navigate("/");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex justify-between items-center h-16 px-6">
          <div className="flex items-center">
            <Link to="/docs" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <i className="fas fa-code text-white text-lg"></i>
              </div>
              <div className="flex flex-col">
                <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  PSITS
                </h1>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Developer Portal v2.0
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 xl:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search documentation..."
                className={`w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <i className={`fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}></i>
              <kbd className={`hidden xl:inline-block absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-semibold border rounded ${
                isDarkMode
                  ? 'text-gray-400 bg-gray-800 border-gray-600'
                  : 'text-gray-500 bg-gray-100 border-gray-300'
              }`}>
                Ctrl K
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <DarkModeToggle 
              isDarkMode={isDarkMode} 
              onToggle={toggleDarkMode} 
            />
            <button
              onClick={handleBackToPSITS}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
            >
              <span className="hidden sm:inline">Back to PSITS</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Fixed Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] border-r transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <button className={`flex items-center transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? isDarkMode
                            ? 'bg-blue-900 text-blue-300 font-medium'
                            : 'bg-blue-50 text-blue-700 font-medium'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <i className={`${item.icon} w-5 text-center`}></i>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 min-h-[calc(100vh-4rem)] transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DocLayout;