import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DocLayout from "../../components/docs/DocLayout";
import EndpointCard from "../../components/docs/EndpointCard";
import { documentationAPI, transformApiEndpoints } from "../../api/documentation";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ApiEndpoints = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedMethod, setSelectedMethod] = useState("ALL");
  const [apiEndpoints, setApiEndpoints] = useState([]);
  const [methods, setMethods] = useState(["ALL"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Infinite scroll state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch methods first
        const methodsResponse = await documentationAPI.getApiMethods();
        if (methodsResponse.success) {
          setMethods(methodsResponse.data);
        }

        // Fetch first page of endpoints
        await fetchEndpoints(1, true);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load API endpoints');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchEndpoints = async (page, isInitial = false) => {
    try {
      if (!isInitial) {
        setLoadingMore(true);
      }

      const params = {
        page,
        limit: 10,
        ...(selectedMethod !== 'ALL' && { method: selectedMethod })
      };

      const response = await documentationAPI.getApiEndpoints(params);
      
      if (response.success) {
        const transformedEndpoints = transformApiEndpoints(response.data);
        
        if (isInitial) {
          setApiEndpoints(transformedEndpoints);
        } else {
          setApiEndpoints(prev => [...prev, ...transformedEndpoints]);
        }
        
        setHasMore(response.pagination.hasNextPage);
      }
    } catch (err) {
      console.error('Error fetching API endpoints:', err);
      if (isInitial) {
        setError('Failed to load API endpoints');
      }
    } finally {
      if (!isInitial) {
        setLoadingMore(false);
      }
    }
  };

  // Handle method filter changes - reset and fetch new data
  useEffect(() => {
    setApiEndpoints([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchEndpoints(1, true);
  }, [selectedMethod]);

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore &&
        !loadingMore &&
        !loading
      ) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchEndpoints(nextPage, false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, loading, currentPage]);

  // No client-side filtering needed - server handles it
  const filteredEndpoints = apiEndpoints;

  // Group endpoints by category dynamically
  const endpointsByCategory = filteredEndpoints.reduce((acc, endpoint) => {
    const category = endpoint.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(endpoint);
    return acc;
  }, {});

  // Define category descriptions
  const categoryDescriptions = {
    'authentication': 'Secure user authentication and authorization endpoints',
    'student': 'Endpoints for student-specific operations',
    'admin': 'Endpoints for administrative operations',
    'merchandise': 'Endpoints for merchandise and product management',
    'events': 'Endpoints for event management and operations',
    'orders': 'Endpoints for order processing and management',
    'other': 'Other API endpoints'
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
              Loading API Endpoints
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please wait while we fetch the latest API documentation...
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
              Error Loading API Endpoints
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
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-600'
            }`}>
              <i className="fas fa-book text-lg"></i>
            </div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API Endpoints</h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Complete reference documentation for all available API endpoints. Click any endpoint to view detailed information, request/response examples, and error codes.
          </p>
        </div>

        {/* Filters */}
        <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <i className={`fas fa-filter ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
          </div>
          
          <div className="space-y-4">
            {/* Method Filters */}
            <div className={`rounded-lg p-4 border transition-colors ${
              isDarkMode
                ? 'bg-blue-900/20 border-blue-800'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h4 className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>HTTP Methods</h4>
              <div className="flex flex-wrap gap-2">
                {methods.map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                      selectedMethod === method
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          {Object.keys(endpointsByCategory).length === 0 ? (
            <div className="text-center py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <i className={`fas fa-search text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No endpoints found
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your filters or check back later for new endpoints.
              </p>
            </div>
          ) : (
            Object.entries(endpointsByCategory).map(([category, endpoints]) => (
              <div key={category}>
                <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)} Endpoints
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {categoryDescriptions[category.toLowerCase()] || `Endpoints for ${category} operations`}
                </p>
                
                <div className="space-y-4">
                  {endpoints.map((endpoint) => (
                    <EndpointCard key={endpoint.id} endpoint={endpoint} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Infinite scroll loading indicator */}
        {loadingMore && (
          <div className="flex items-center justify-center py-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <i className={`fas fa-spinner fa-spin text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
            </div>
            <span className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading more endpoints...
            </span>
          </div>
        )}

        {/* End of content indicator */}
        {!hasMore && apiEndpoints.length > 0 && (
          <div className="text-center py-8">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You've reached the end of the API endpoints list
            </p>
          </div>
        )}
      </div>
    </DocLayout>
  );
};

export default ApiEndpoints;
