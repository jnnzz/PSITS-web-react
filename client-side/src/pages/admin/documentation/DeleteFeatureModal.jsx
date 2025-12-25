import React from "react";
import { motion } from "framer-motion";

const DeleteFeatureModal = ({ isOpen, onClose, onConfirm, featureData, loading = false }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Delete Feature
            </h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="mb-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-2 text-gray-900">
                {featureData?.title}
              </h3>
              <p className="text-sm mb-2 text-gray-600">
                <span className="font-medium">Category:</span> {featureData?.category}
              </p>
              <p className="text-sm mb-2 text-gray-600">
                <span className="font-medium">Access:</span> {featureData?.access}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tags:</span> {featureData?.tags?.join(', ') || 'None'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-start">
              <i className={`fas fa-exclamation-triangle text-red-500 mr-3 mt-1`}></i>
              <div>
                <h4 className="font-semibold text-red-800">
                  Warning
                </h4>
                <p className="text-sm mt-1 text-red-700">
                  This action will deactivate the feature. It will no longer be visible in the documentation portal, but the data will be preserved.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="fas fa-trash mr-2"></i>
                  Delete Feature
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteFeatureModal;
