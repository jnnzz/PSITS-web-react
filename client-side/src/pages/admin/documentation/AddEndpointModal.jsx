import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { documentationAPI } from "../../../api/documentation";
import { showToast } from "../../../utils/alertHelper";

const AddEndpointModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    method: "GET",
    url: "",
    title: "",
    description: "",
    access: "Public",
    category: "other",
    parameters: [],
    exampleRequest: {
      curl: "",
      javascript: ""
    },
    exampleResponse: {
      status: "200",
      body: ""
    }
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          method: "GET",
          url: "",
          title: "",
          description: "",
          access: "Public",
          category: "other",
          parameters: [],
          exampleRequest: {
            curl: "",
            javascript: ""
          },
          exampleResponse: {
            status: "200",
            body: ""
          }
        });
      }
      setErrors({});
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

  const handleNestedChange = (parentKey, childKey, value) => {
    setFormData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  const addParameter = () => {
    setFormData(prev => ({
      ...prev,
      parameters: [...prev.parameters, {
        field: "",
        type: "string",
        required: false,
        description: "",
        defaultValue: ""
      }]
    }));
  };

  const removeParameter = (index) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  const updateParameter = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )
    }));
  };

  // Helper function to generate endpointId preview
  const generateEndpointIdPreview = () => {
    if (!formData.url || !formData.method) return '';
    
    const cleanUrl = formData.url.replace(/^\//, '').replace(/\//g, '-');
    const sanitizedUrl = cleanUrl
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `${formData.method.toLowerCase()}-${sanitizedUrl}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.exampleRequest.curl.trim()) {
      newErrors.exampleRequestCurl = "CURL example is required";
    }
    if (!formData.exampleRequest.javascript.trim()) {
      newErrors.exampleRequestJavascript = "JavaScript example is required";
    }
    if (!formData.exampleResponse.body.trim()) {
      newErrors.exampleResponseBody = "Response body is required";
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
        ? await documentationAPI.updateApiEndpoint(formData.endpointId, formData)
        : await documentationAPI.createApiEndpoint(formData);

      if (response.success) {
        showToast('success', response.message);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error saving endpoint:', error);
      showToast('error', 'Failed to save API endpoint');
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
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {initialData ? 'Edit API Endpoint' : 'Add API Endpoint'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  HTTP Method *
                </label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  URL *
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.url ? 'border-red-500' : 'bg-white border-gray-300'
                  }`}
                  placeholder="/api/auth/login"
                />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
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
                  <option value="authentication">Authentication</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="events">Events</option>
                  <option value="merchandise">Merchandise</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Auto-generated Endpoint ID Preview */}
            {generateEndpointIdPreview() && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center">
                  <i className="fas fa-info-circle mr-2 text-blue-600"></i>
                  <span className="text-sm font-medium text-blue-700">
                    Auto-generated Endpoint ID:
                  </span>
                </div>
                <code className="block mt-1 px-2 py-1 rounded text-sm font-mono bg-white text-blue-800">
                  {generateEndpointIdPreview()}
                </code>
              </div>
            )}

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
                placeholder="User Login"
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
                placeholder="Authenticate user with email and password"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Parameters */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Parameters
                </label>
                <button
                  type="button"
                  onClick={addParameter}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <i className="fas fa-plus mr-1"></i>
                  Add Parameter
                </button>
              </div>

              {formData.parameters.length === 0 ? (
                <div className="p-4 border-2 border-dashed rounded-lg text-center border-gray-300 text-gray-500">
                  <i className="fas fa-plus-circle text-2xl mb-2"></i>
                  <p>No parameters added yet. Click "Add Parameter" to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.parameters.map((param, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50 border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Parameter {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeParameter(index)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Remove parameter"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-gray-600">
                            Field Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., email, password"
                            value={param.field}
                            onChange={(e) => updateParameter(index, 'field', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1 text-gray-600">
                            Data Type *
                          </label>
                          <select
                            value={param.type}
                            onChange={(e) => updateParameter(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                          >
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1 text-gray-600">
                            Required
                          </label>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={param.required}
                              onChange={(e) => updateParameter(index, 'required', e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Required field</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1 text-gray-600">
                            Default Value
                          </label>
                          <input
                            type="text"
                            placeholder="Optional default value"
                            value={param.defaultValue}
                            onChange={(e) => updateParameter(index, 'defaultValue', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-xs font-medium mb-1 text-gray-600">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe what this parameter does..."
                          value={param.description}
                          onChange={(e) => updateParameter(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Example Request */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                Example Request *
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    CURL
                  </label>
                  <textarea
                    value={formData.exampleRequest.curl}
                    onChange={(e) => handleNestedChange('exampleRequest', 'curl', e.target.value)}
                    rows={10}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                      errors.exampleRequestCurl ? 'border-red-500' : 'bg-white border-gray-300'
                    }`}
                    placeholder='curl -X POST https://api.example.com/login -H "Content-Type: application/json" -d {"email":"user@example.com","password":"password"}'
                  />
                  {errors.exampleRequestCurl && <p className="text-red-500 text-sm mt-1">{errors.exampleRequestCurl}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    JavaScript
                  </label>
                  <textarea
                    value={formData.exampleRequest.javascript}
                    onChange={(e) => handleNestedChange('exampleRequest', 'javascript', e.target.value)}
                    rows={10}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                      errors.exampleRequestJavascript ? 'border-red-500' : 'bg-white border-gray-300'
                    }`}
                    placeholder="axios.post('/api/auth/login', { email: 'user@example.com', password: 'password' })"
                  />
                  {errors.exampleRequestJavascript && <p className="text-red-500 text-sm mt-1">{errors.exampleRequestJavascript}</p>}
                </div>
              </div>
            </div>

            {/* Example Response */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                Example Response *
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    Status Code
                  </label>
                  <input
                    type="text"
                    value={formData.exampleResponse.status}
                    onChange={(e) => handleNestedChange('exampleResponse', 'status', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">
                    Response Body
                  </label>
                  <textarea
                    value={formData.exampleResponse.body}
                    onChange={(e) => handleNestedChange('exampleResponse', 'body', e.target.value)}
                    rows={10}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                      errors.exampleResponseBody ? 'border-red-500' : 'bg-white border-gray-300'
                    }`}
                    placeholder='{"success": true, "message": "Login successful", "token": "jwt_token_here"}'
                  />
                  {errors.exampleResponseBody && <p className="text-red-500 text-sm mt-1">{errors.exampleResponseBody}</p>}
                </div>
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
                    {initialData ? 'Update' : 'Create'} Endpoint
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

export default AddEndpointModal;
