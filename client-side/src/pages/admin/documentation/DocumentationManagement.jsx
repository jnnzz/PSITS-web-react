import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { documentationAPI, transformApiEndpoints, transformFeatures } from "../../../api/documentation";
import { showToast } from "../../../utils/alertHelper";
import AddEndpointModal from "./AddEndpointModal";
import EditEndpointModal from "./EditEndpointModal";
import DeleteEndpointModal from "./DeleteEndpointModal";
import ViewEndpointModal from "./ViewEndpointModal";
import AddFeatureModal from "./AddFeatureModal";
import EditFeatureModal from "./EditFeatureModal";
import DeleteFeatureModal from "./DeleteFeatureModal";
import ViewFeatureModal from "./ViewFeatureModal";

const DocumentationManagement = () => {
  const [activeTab, setActiveTab] = useState("endpoints");
  const [apiEndpoints, setApiEndpoints] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPageEndpoints, setCurrentPageEndpoints] = useState(1);
  const [currentPageFeatures, setCurrentPageFeatures] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginationEndpoints, setPaginationEndpoints] = useState({});
  const [paginationFeatures, setPaginationFeatures] = useState({});

  // Modal states
  const [showAddEndpointModal, setShowAddEndpointModal] = useState(false);
  const [showEditEndpointModal, setShowEditEndpointModal] = useState(false);
  const [showDeleteEndpointModal, setShowDeleteEndpointModal] = useState(false);
  const [showViewEndpointModal, setShowViewEndpointModal] = useState(false);
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [showEditFeatureModal, setShowEditFeatureModal] = useState(false);
  const [showDeleteFeatureModal, setShowDeleteFeatureModal] = useState(false);
  const [showViewFeatureModal, setShowViewFeatureModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchEndpoints = async () => {
    try {
      const params = {
        page: currentPageEndpoints,
        limit: itemsPerPage,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await documentationAPI.getApiEndpoints(params);
      
      if (response.success) {
        const transformedEndpoints = transformApiEndpoints(response.data);
        setApiEndpoints(transformedEndpoints);
        setPaginationEndpoints(response.pagination);
      }
    } catch (err) {
      console.error('Error fetching endpoints:', err);
      showToast('error', 'Failed to load API endpoints');
    }
  };

  const fetchFeatures = async () => {
    try {
      const params = {
        page: currentPageFeatures,
        limit: itemsPerPage,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await documentationAPI.getFeatures(params);
      
      if (response.success) {
        const transformedFeatures = transformFeatures(response.data);
        setFeatures(transformedFeatures);
        setPaginationFeatures(response.pagination);
      }
    } catch (err) {
      console.error('Error fetching features:', err);
      showToast('error', 'Failed to load features');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchEndpoints(), fetchFeatures()]);
    } catch (err) {
      console.error('Error fetching documentation data:', err);
      setError('Failed to load documentation data');
      showToast('error', 'Failed to load documentation data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEndpoint = async () => {
    try {
      const response = await documentationAPI.deleteApiEndpoint(selectedItem.endpointId);
      if (response.success) {
        showToast('success', 'API endpoint deleted successfully');
        setShowDeleteEndpointModal(false);
        setSelectedItem(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting endpoint:', error);
      showToast('error', 'Failed to delete API endpoint');
    }
  };

  const handleDeleteFeature = async () => {
    try {
      const response = await documentationAPI.deleteFeature(selectedItem.featureId);
      if (response.success) {
        showToast('success', 'Feature deleted successfully');
        setShowDeleteFeatureModal(false);
        setSelectedItem(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting feature:', error);
      showToast('error', 'Failed to delete feature');
    }
  };

  const handleToggleEndpointStatus = async (endpoint) => {
    try {
      const response = await documentationAPI.toggleEndpointStatus(endpoint.endpointId);
      if (response.success) {
        showToast('success', response.message);
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling endpoint status:', error);
      showToast('error', 'Failed to toggle endpoint status');
    }
  };

  const handleToggleFeatureStatus = async (feature) => {
    try {
      const response = await documentationAPI.toggleFeatureStatus(feature.featureId);
      if (response.success) {
        showToast('success', response.message);
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling feature status:', error);
      showToast('error', 'Failed to toggle feature status');
    }
  };

  // Pagination handlers
  const handlePageChangeEndpoints = (newPage) => {
    setCurrentPageEndpoints(newPage);
  };

  const handlePageChangeFeatures = (newPage) => {
    setCurrentPageFeatures(newPage);
  };

  // Reset pagination when search changes
  useEffect(() => {
    if (searchQuery !== '') {
      setCurrentPageEndpoints(1);
      setCurrentPageFeatures(1);
    }
  }, [searchQuery]);

  // Fetch data when pagination changes
  useEffect(() => {
    if (activeTab === 'endpoints') {
      fetchEndpoints();
    } else {
      fetchFeatures();
    }
  }, [currentPageEndpoints, currentPageFeatures, searchQuery]);

  // No client-side filtering needed - server handles pagination and search

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessColor = (access) => {
    switch (access) {
      case 'Public': return 'bg-green-100 text-green-800';
      case 'Student': return 'bg-blue-100 text-blue-800';
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Both': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100">
            <i className="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Loading Documentation Management
          </h3>
          <p className="text-gray-600">
            Please wait while we fetch the documentation data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
            <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Error Loading Documentation
          </h3>
          <p className="mb-4 text-gray-600">
            {error}
          </p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>   
          <p className="mt-2 text-gray-600">
            Manage API endpoints and features for the documentation portal
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("endpoints")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "endpoints"
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className="fas fa-code mr-2"></i>
            API Endpoints ({paginationEndpoints.totalItems || 0})
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "features"
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className="fas fa-layer-group mr-2"></i>
            Features ({paginationFeatures.totalItems || 0})
          </button>
        </nav>
      </div>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300 text-gray-900"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <button
          onClick={() => {
            setSelectedItem(null);
            if (activeTab === "endpoints") {
              setShowAddEndpointModal(true);
            } else {
              setShowAddFeatureModal(true);
            }
          }}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Add {activeTab === "endpoints" ? "Endpoint" : "Feature"}
        </button>
      </div>

      {/* Content */}
      {activeTab === "endpoints" ? (
        <div className="rounded-lg shadow-sm border bg-white border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apiEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {endpoint.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {endpoint.url}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessColor(endpoint.access)}`}>
                        {endpoint.access}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(endpoint.isActive)}`}>
                        {endpoint.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(endpoint);
                            setShowEditEndpointModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-500"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(endpoint);
                            setShowViewEndpointModal(true);
                          }}
                          className="text-green-600 hover:text-green-500"
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(endpoint);
                            setShowDeleteEndpointModal(true);
                          }}
                          className="text-red-600 hover:text-red-500"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg shadow-sm border bg-white border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {feature.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feature.description.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {feature.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessColor(feature.access)}`}>
                        {feature.access}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feature.isActive)}`}>
                        {feature.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(feature);
                            setShowEditFeatureModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-500"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(feature);
                            setShowViewFeatureModal(true);
                          }}
                          className="text-green-600 hover:text-green-500"
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(feature);
                            setShowDeleteFeatureModal(true);
                          }}
                          className="text-red-600 hover:text-red-500"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {activeTab === "endpoints" && paginationEndpoints.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {((paginationEndpoints.currentPage - 1) * paginationEndpoints.itemsPerPage) + 1} to {Math.min(paginationEndpoints.currentPage * paginationEndpoints.itemsPerPage, paginationEndpoints.totalItems)} of {paginationEndpoints.totalItems} items
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChangeEndpoints(paginationEndpoints.currentPage - 1)}
              disabled={!paginationEndpoints.hasPrevPage}
              className={`px-3 py-1 text-sm rounded ${
                paginationEndpoints.hasPrevPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-700">
              Page {paginationEndpoints.currentPage} of {paginationEndpoints.totalPages}
            </span>
            <button
              onClick={() => handlePageChangeEndpoints(paginationEndpoints.currentPage + 1)}
              disabled={!paginationEndpoints.hasNextPage}
              className={`px-3 py-1 text-sm rounded ${
                paginationEndpoints.hasNextPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {activeTab === "features" && paginationFeatures.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {((paginationFeatures.currentPage - 1) * paginationFeatures.itemsPerPage) + 1} to {Math.min(paginationFeatures.currentPage * paginationFeatures.itemsPerPage, paginationFeatures.totalItems)} of {paginationFeatures.totalItems} items
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChangeFeatures(paginationFeatures.currentPage - 1)}
              disabled={!paginationFeatures.hasPrevPage}
              className={`px-3 py-1 text-sm rounded ${
                paginationFeatures.hasPrevPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-700">
              Page {paginationFeatures.currentPage} of {paginationFeatures.totalPages}
            </span>
            <button
              onClick={() => handlePageChangeFeatures(paginationFeatures.currentPage + 1)}
              disabled={!paginationFeatures.hasNextPage}
              className={`px-3 py-1 text-sm rounded ${
                paginationFeatures.hasNextPage
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddEndpointModal
        isOpen={showAddEndpointModal}
        onClose={() => setShowAddEndpointModal(false)}
        onSuccess={fetchData}
        initialData={selectedItem}
      />

      <EditEndpointModal
        isOpen={showEditEndpointModal}
        onClose={() => setShowEditEndpointModal(false)}
        onSuccess={fetchData}
        endpointData={selectedItem}
      />

      <DeleteEndpointModal
        isOpen={showDeleteEndpointModal}
        onClose={() => setShowDeleteEndpointModal(false)}
        onConfirm={handleDeleteEndpoint}
        endpointData={selectedItem}
      />

      <ViewEndpointModal
        isOpen={showViewEndpointModal}
        onClose={() => setShowViewEndpointModal(false)}
        endpointData={selectedItem}
      />

      <AddFeatureModal
        isOpen={showAddFeatureModal}
        onClose={() => setShowAddFeatureModal(false)}
        onSuccess={fetchData}
        initialData={selectedItem}
      />

      <EditFeatureModal
        isOpen={showEditFeatureModal}
        onClose={() => setShowEditFeatureModal(false)}
        onSuccess={fetchData}
        featureData={selectedItem}
      />

      <DeleteFeatureModal
        isOpen={showDeleteFeatureModal}
        onClose={() => setShowDeleteFeatureModal(false)}
        onConfirm={handleDeleteFeature}
        featureData={selectedItem}
      />

      <ViewFeatureModal
        isOpen={showViewFeatureModal}
        onClose={() => setShowViewFeatureModal(false)}
        featureData={selectedItem}
      />
    </div>
  );
};

export default DocumentationManagement;