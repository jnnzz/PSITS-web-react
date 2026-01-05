import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import DocLayout from "../../components/docs/DocLayout";
import FeatureCard from "../../components/docs/FeatureCard";
import { documentationAPI, transformFeatures } from "../../api/documentation";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Features = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [features, setFeatures] = useState([]);
  const [featureCategories, setFeatureCategories] = useState([]);
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
        
        // Fetch categories first
        const categoriesResponse = await documentationAPI.getFeatureCategories();
        if (categoriesResponse.success) {
          setFeatureCategories(categoriesResponse.data);
        }

        // Fetch first page of features
        await fetchFeatures(1, true);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load features');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchFeatures = async (page, isInitial = false) => {
    try {
      if (!isInitial) {
        setLoadingMore(true);
      }

      const params = {
        page,
        limit: 10,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery })
      };

      const response = await documentationAPI.getFeatures(params);
      
      if (response.success) {
        const transformedFeatures = transformFeatures(response.data);
        
        if (isInitial) {
          setFeatures(transformedFeatures);
        } else {
          setFeatures(prev => [...prev, ...transformedFeatures]);
        }
        
        setHasMore(response.pagination.hasNextPage);
      }
    } catch (err) {
      console.error('Error fetching features:', err);
      if (isInitial) {
        setError('Failed to load features');
      }
    } finally {
      if (!isInitial) {
        setLoadingMore(false);
      }
    }
  };

  // Handle filter changes - reset and fetch new data
  useEffect(() => {
    setFeatures([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchFeatures(1, true);
  }, [selectedCategory, searchQuery]);

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
        fetchFeatures(nextPage, false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, loading, currentPage]);

  // No client-side filtering needed - server handles it
  const filteredFeatures = features;

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
              Loading Features
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please wait while we fetch the latest features documentation...
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
              Error Loading Features
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
                ? 'bg-purple-900 text-purple-300'
                : 'bg-purple-100 text-purple-600'
            }`}>
              <i className="fas fa-layer-group text-lg"></i>
            </div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Features & Modules
            </h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore the core features and modules available in our platform.
            Each feature includes detailed documentation, implementation flows,
            and related API endpoints.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-3 pl-12 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <i className={`fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}></i>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <i className={`${category.icon} text-xs sm:text-sm`}></i>
                <span className="text-xs sm:text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredFeatures.length} feature{filteredFeatures.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-300'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="default">Default Order</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="category">By Category</option>
              </select>

            </div>
          </div>
        </div>

        {/* Features List */}
        {filteredFeatures.length > 0 ? (
          <>
            <div className="space-y-6">
              {filteredFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FeatureCard feature={feature} />
                </motion.div>
              ))}
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
                  Loading more features...
                </span>
              </div>
            )}

            {/* End of content indicator */}
            {!hasMore && features.length > 0 && (
              <div className="text-center py-8">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  You've reached the end of the features list
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <i className={`fas fa-search text-2xl ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No features found
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-lg p-6 transition-colors ${
            isDarkMode
              ? 'bg-blue-900/20 border border-blue-800'
              : 'bg-blue-50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-600'
            }`}>
              <i className="fas fa-info-circle text-lg"></i>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Implementation Notes
              </h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start space-x-2">
                  <i className={`fas fa-check mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}></i>
                  <span>All endpoints require proper authentication headers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className={`fas fa-check mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}></i>
                  <span>Rate limiting is applied to prevent abuse</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className={`fas fa-check mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}></i>
                  <span>Error responses follow standard HTTP status codes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className={`fas fa-check mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}></i>
                  <span>All timestamps are in ISO 8601 format</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </DocLayout>
  );
};

export default Features;
