import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { copyCurlCommand, copyJavaScriptCode, copyJsonResponse } from "../../utils/copysnippet";

const EndpointCard = ({ endpoint }) => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');

  const getMethodColor = (method) => {
    if (isDarkMode) {
      switch (method) {
        case 'GET': return 'bg-green-900 text-green-300';
        case 'POST': return 'bg-blue-900 text-blue-300';
        case 'PUT': return 'bg-yellow-900 text-yellow-300';
        case 'PATCH': return 'bg-purple-900 text-purple-300';
        case 'DELETE': return 'bg-red-900 text-red-300';
        default: return 'bg-gray-700 text-gray-300';
      }
    } else {
      switch (method) {
        case 'GET': return 'bg-green-100 text-green-800';
        case 'POST': return 'bg-blue-100 text-blue-800';
        case 'PUT': return 'bg-yellow-100 text-yellow-800';
        case 'PATCH': return 'bg-purple-100 text-purple-800';
        case 'DELETE': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getAccessColor = (access) => {
    if (isDarkMode) {
      switch (access) {
        case 'Public': return 'bg-green-900 text-green-300';
        case 'Student': return 'bg-blue-900 text-blue-300';
        case 'Admin': return 'bg-purple-900 text-purple-300';
        default: return 'bg-gray-700 text-gray-300';
      }
    } else {
      switch (access) {
        case 'Public': return 'bg-green-100 text-green-800';
        case 'Student': return 'bg-blue-100 text-blue-800';
        case 'Admin': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <motion.div
      className={`rounded-lg shadow-sm border overflow-hidden transition-colors ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div
        className={`p-4 cursor-pointer transition-colors ${
          isDarkMode
            ? 'hover:bg-gray-700'
            : 'hover:bg-gray-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
              {endpoint.method}
            </span>
            <code className={`text-xs sm:text-sm font-mono break-all ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{endpoint.url}</code>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getAccessColor(endpoint.access)}`}>
              {endpoint.access}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {endpoint.category}
            </span>
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}></i>
          </div>
        </div>
        <h3 className={`mt-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{endpoint.title}</h3>
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{endpoint.description}</p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="p-4 space-y-6">
            {/* Parameters */}
            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Request Parameters</h4>
                <div className="overflow-x-auto">
                  <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-3 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Field
                        </th>
                        <th className={`px-3 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Type
                        </th>
                        <th className={`px-3 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Required
                        </th>
                        <th className={`px-3 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                      {endpoint.parameters.map((param, index) => (
                        <tr key={index}>
                          <td className={`px-3 py-2 text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {param.field}
                          </td>
                          <td className={`px-3 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {param.type}
                          </td>
                          <td className="px-3 py-2 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              param.required 
                                ? isDarkMode
                                  ? 'bg-red-900 text-red-300'
                                  : 'bg-red-100 text-red-800'
                                : isDarkMode
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {param.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                          <td className={`px-3 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Example Request */}
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Example Request</h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('curl')}
                    className={`px-2 sm:px-3 py-1 text-xs font-medium rounded transition-colors ${
                      activeTab === 'curl' 
                        ? isDarkMode
                          ? 'bg-blue-800 text-blue-200'
                          : 'bg-blue-100 text-blue-700'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    onClick={() => setActiveTab('javascript')}
                    className={`px-2 sm:px-3 py-1 text-xs font-medium rounded transition-colors ${
                      activeTab === 'javascript' 
                        ? isDarkMode
                          ? 'bg-blue-800 text-blue-200'
                          : 'bg-blue-100 text-blue-700'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
                <div className="relative bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <button
                    onClick={() => {
                      if (activeTab === 'curl') {
                        copyCurlCommand(endpoint.exampleRequest.curl);
                      } else if (activeTab === 'javascript') {
                        copyJavaScriptCode(endpoint.exampleRequest.javascript);
                      }
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                    }`}
                    title={`Copy ${activeTab === 'curl' ? 'cURL' : 'JavaScript'} code`}
                  >
                    <i className="fas fa-copy text-sm"></i>
                  </button>
                  <pre className="text-sm text-gray-100 pr-10">
                    <code>{endpoint.exampleRequest[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Example Response */}
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Example Response</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    isDarkMode
                      ? 'bg-green-900 text-green-300'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {endpoint.exampleResponse.status}
                  </span>
                </div>
                <div className="relative bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <button
                    onClick={() => copyJsonResponse(endpoint.exampleResponse.body)}
                    className={`absolute top-2 right-2 p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                    }`}
                    title="Copy JSON response"
                  >
                    <i className="fas fa-copy text-sm"></i>
                  </button>
                  <pre className="text-sm text-gray-100 pr-10">
                    <code>{endpoint.exampleResponse.body}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EndpointCard;
