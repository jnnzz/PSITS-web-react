import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { documentationAPI } from "../../../api/documentation";
import { showToast } from "../../../utils/alertHelper";

const AddFeatureModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "other",
    description: "",
    implementationFlow: "",
    relatedEndpoints: [],
    tags: [],
    access: "Public"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState("");
  const [newEndpoint, setNewEndpoint] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: "",
          category: "other",
          description: "",
          implementationFlow: "",
          relatedEndpoints: [],
          tags: [],
          access: "Public"
        });
      }
      setErrors({});
      setNewTag("");
      setNewEndpoint("");
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRelatedEndpoint = () => {
    if (newEndpoint.trim() && !formData.relatedEndpoints.includes(newEndpoint.trim())) {
      setFormData(prev => ({
        ...prev,
        relatedEndpoints: [...prev.relatedEndpoints, newEndpoint.trim()]
      }));
      setNewEndpoint("");
    }
  };

  const removeRelatedEndpoint = (endpointToRemove) => {
    setFormData(prev => ({
      ...prev,
      relatedEndpoints: prev.relatedEndpoints.filter(endpoint => endpoint !== endpointToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.implementationFlow.trim()) {
      newErrors.implementationFlow = "Implementation flow is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = initialData 
        ? await documentationAPI.updateFeature(formData.featureId, formData)
        : await documentationAPI.createFeature(formData);

      if (response.success) {
        showToast('success', response.message);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error saving feature:', error);
      showToast('error', 'Failed to save feature');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {initialData ? 'Edit Feature' : 'Add Feature'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Auto-generated Feature ID Preview */}
            {!initialData && formData.title && (
              <div className="p-3 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-700">
                  <strong>Auto-generated Feature ID:</strong> {formData.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}
                </p>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                >
                  <option value="security">Security</option>
                  <option value="events">Events</option>
                  <option value="management">Management</option>
                  <option value="commerce">Commerce</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Access Level
                </label>
                <select
                  name="access"
                  value={formData.access}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                >
                  <option value="Public">Public</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'bg-white border-gray-300'
                  }`}
                placeholder="User Authentication System"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'bg-white border-gray-300'
                  }`}
                placeholder="Comprehensive authentication system that handles user login, registration, and session management"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Implementation Flow */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Implementation Flow *
              </label>
              <textarea
                name="implementationFlow"
                value={formData.implementationFlow}
                onChange={handleChange}
                rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.implementationFlow ? 'border-red-500' : 'bg-white border-gray-300'
                  }`}
                placeholder="1. User submits login credentials\n2. System validates credentials against database\n3. Generate JWT token if valid\n4. Return token and user information\n5. Client stores token for subsequent requests"
              />
              {errors.implementationFlow && <p className="text-red-500 text-sm mt-1">{errors.implementationFlow}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Related Endpoints */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Related Endpoints
              </label>
              <div className="space-y-2 mb-3">
                {formData.relatedEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <span className="text-sm text-gray-700">
                      {endpoint}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRelatedEndpoint(endpoint)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newEndpoint}
                  onChange={(e) => setNewEndpoint(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRelatedEndpoint())}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                  placeholder="Add related endpoint URL..."
                />
                <button
                  type="button"
                  onClick={addRelatedEndpoint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    {initialData ? 'Update' : 'Create'} Feature
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddFeatureModal;
