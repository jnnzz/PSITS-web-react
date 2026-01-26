import React from "react";
import { motion } from "framer-motion";

const ViewFeatureModal = ({ isOpen, onClose, featureData }) => {

  if (!isOpen || !featureData) return null;

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
              Feature Details
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
                  Feature ID
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.featureId}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Category
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.category}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Access Level
                </label>
                <div className="p-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getAccessColor(featureData.access)}`}>
                    {featureData.access}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Status
                </label>
                <div className="p-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(featureData.isActive)}`}>
                    {featureData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Title
              </label>
              <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                {featureData.title}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description
              </label>
              <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                {featureData.description}
              </div>
            </div>

            {/* Implementation Flow */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Implementation Flow
              </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900 whitespace-pre-line">
                {featureData.implementationFlow}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {featureData.tags && featureData.tags.length > 0 ? (
                  featureData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    No tags added
                  </span>
                )}
              </div>
            </div>

            {/* Related Endpoints */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Related Endpoints
              </label>
              <div className="space-y-2">
                {featureData.relatedEndpoints && featureData.relatedEndpoints.length > 0 ? (
                  featureData.relatedEndpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-gray-100 text-gray-900"
                    >
                      {endpoint}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    No related endpoints added
                  </span>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Created By
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.createdBy || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Updated By
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.updatedBy || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Created At
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.createdAt ? new Date(featureData.createdAt).toLocaleString() : 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Updated At
                </label>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                  {featureData.updatedAt ? new Date(featureData.updatedAt).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
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

export default ViewFeatureModal;
