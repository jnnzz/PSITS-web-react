import React from "react";
import { motion } from "framer-motion";

const ViewEndpointModal = ({ isOpen, onClose, endpointData }) => {

  if (!isOpen || !endpointData) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              View API Endpoint
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Endpoint ID
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.endpointId}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  HTTP Method
                </label>
                <div className="px-3 py-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getMethodColor(endpointData.method)}`}>
                    {endpointData.method}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  URL
                </label>
                <div className="px-3 py-2 border rounded-lg font-mono text-sm bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.url}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Access Level
                </label>
                <div className="px-3 py-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getAccessColor(endpointData.access)}`}>
                    {endpointData.access}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Category
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.category}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Status
                </label>
                <div className="px-3 py-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(endpointData.isActive)}`}>
                    {endpointData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Title
              </label>
              <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                {endpointData.title}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description
              </label>
              <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                {endpointData.description}
              </div>
            </div>

            {/* Parameters */}
            {endpointData.parameters && endpointData.parameters.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Parameters
                </label>
                <div className="space-y-3">
                  {endpointData.parameters.map((param, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50 border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <span className="text-xs font-medium text-gray-600">Field</span>
                          <div className="px-2 py-1 rounded text-sm font-mono bg-white text-gray-900">
                            {param.field}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Type</span>
                          <div className="px-2 py-1 rounded text-sm bg-white text-gray-900">
                            {param.type}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Required</span>
                          <div className="px-2 py-1 rounded text-sm bg-white text-gray-900">
                            {param.required ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Default</span>
                          <div className="px-2 py-1 rounded text-sm font-mono bg-white text-gray-900">
                            {param.defaultValue || 'None'}
                          </div>
                        </div>
                      </div>
                      {param.description && (
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-600">Description</span>
                          <div className="px-2 py-1 rounded text-sm bg-white text-gray-900">
                            {param.description}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example Request */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Example Request
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    CURL
                  </label>
                  <div className="px-3 py-2 border rounded-lg font-mono text-sm bg-gray-50 border-gray-300 text-gray-900">
                    <pre className="whitespace-pre-wrap">{endpointData.exampleRequest?.curl || 'No CURL example provided'}</pre>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    JavaScript
                  </label>
                  <div className="px-3 py-2 border rounded-lg font-mono text-sm bg-gray-50 border-gray-300 text-gray-900">
                    <pre className="whitespace-pre-wrap">{endpointData.exampleRequest?.javascript || 'No JavaScript example provided'}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Response */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Example Response
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    Status Code
                  </label>
                  <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                    {endpointData.exampleResponse?.status || '200'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    Response Body
                  </label>
                  <div className="px-3 py-2 border rounded-lg font-mono text-sm bg-gray-50 border-gray-300 text-gray-900">
                    <pre className="whitespace-pre-wrap">{endpointData.exampleResponse?.body || 'No response example provided'}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Created By
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.createdBy || 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Updated By
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.updatedBy || 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Created At
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.createdAt ? new Date(endpointData.createdAt).toLocaleString() : 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Updated At
                </label>
                <div className="px-3 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900">
                  {endpointData.updatedAt ? new Date(endpointData.updatedAt).toLocaleString() : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
                className="px-6 py-2 border rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewEndpointModal;
