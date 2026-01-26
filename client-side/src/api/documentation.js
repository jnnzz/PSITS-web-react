import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Try both sessionStorage and localStorage for token
    const token = sessionStorage.getItem("Token") || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear both storages
      sessionStorage.removeItem('Token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Documentation Service
export const documentationAPI = {
  // Get documentation statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/api/docs/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching documentation stats:', error);
      throw error;
    }
  },

  // Get all API endpoints with optional filtering and pagination
  getApiEndpoints: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination params
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      // Add filter params
      if (params.method && params.method !== 'ALL') {
        queryParams.append('method', params.method);
      }
      
      if (params.category && params.category !== 'all') {
        queryParams.append('category', params.category);
      }
      
      if (params.access && params.access !== 'all') {
        queryParams.append('access', params.access);
      }

      const queryString = queryParams.toString();
      const url = `/api/docs/endpoints${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching API endpoints:', error);
      throw error;
    }
  },

  // Get specific API endpoint by ID
  getApiEndpointById: async (endpointId) => {
    try {
      const response = await apiClient.get(`/api/docs/endpoints/${endpointId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching API endpoint:', error);
      throw error;
    }
  },

  // Get all features with optional filtering and pagination
  getFeatures: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination params
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      // Add filter params
      if (params.category && params.category !== 'all') {
        queryParams.append('category', params.category);
      }
      
      if (params.search) {
        queryParams.append('search', params.search);
      }

      const queryString = queryParams.toString();
      const url = `/api/docs/features${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  },

  // Get specific feature by ID
  getFeatureById: async (featureId) => {
    try {
      const response = await apiClient.get(`/api/docs/features/${featureId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
  },

  // Get feature categories
  getFeatureCategories: async () => {
    try {
      const response = await apiClient.get('/api/docs/feature-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching feature categories:', error);
      throw error;
    }
  },

  // Get API methods
  getApiMethods: async () => {
    try {
      const response = await apiClient.get('/api/docs/api-methods');
      return response.data;
    } catch (error) {
      console.error('Error fetching API methods:', error);
      throw error;
    }
  },

  // Admin-only: Create API endpoint
  createApiEndpoint: async (endpointData) => {
    try {
      const response = await apiClient.post('/api/docs/endpoints', endpointData);
      return response.data;
    } catch (error) {
      console.error('Error creating API endpoint:', error);
      throw error;
    }
  },

  // Admin-only: Create feature
  createFeature: async (featureData) => {
    try {
      const response = await apiClient.post('/api/docs/features', featureData);
      return response.data;
    } catch (error) {
      console.error('Error creating feature:', error);
      throw error;
    }
  },

  // Admin-only: Update API endpoint
  updateApiEndpoint: async (endpointId, data) => {
    try {
      const response = await apiClient.put(`/api/docs/endpoints/${endpointId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating API endpoint:', error);
      throw error;
    }
  },

  // Admin-only: Delete API endpoint
  deleteApiEndpoint: async (endpointId) => {
    try {
      const response = await apiClient.delete(`/api/docs/endpoints/${endpointId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting API endpoint:', error);
      throw error;
    }
  },

  // Admin-only: Toggle API endpoint status
  toggleEndpointStatus: async (endpointId) => {
    try {
      const response = await apiClient.patch(`/api/docs/endpoints/${endpointId}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling endpoint status:', error);
      throw error;
    }
  },

  // Admin-only: Update feature
  updateFeature: async (featureId, data) => {
    try {
      const response = await apiClient.put(`/api/docs/features/${featureId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating feature:', error);
      throw error;
    }
  },

  // Admin-only: Delete feature
  deleteFeature: async (featureId) => {
    try {
      const response = await apiClient.delete(`/api/docs/features/${featureId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting feature:', error);
      throw error;
    }
  },

  // Admin-only: Toggle feature status
  toggleFeatureStatus: async (featureId) => {
    try {
      const response = await apiClient.patch(`/api/docs/features/${featureId}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling feature status:', error);
      throw error;
    }
  },
};

// Helper functions for data transformation
export const transformApiEndpoints = (endpoints) => {
  return endpoints.map(endpoint => ({
    id: endpoint.endpointId,
    endpointId: endpoint.endpointId,
    method: endpoint.method,
    url: endpoint.url,
    title: endpoint.title,
    description: endpoint.description,
    access: endpoint.access,
    category: endpoint.category,
    parameters: endpoint.parameters,
    exampleRequest: endpoint.exampleRequest,
    exampleResponse: endpoint.exampleResponse,
    isActive: endpoint.isActive,
    createdBy: endpoint.createdBy,
    updatedBy: endpoint.updatedBy,
    createdAt: endpoint.createdAt,
    updatedAt: endpoint.updatedAt
  }));
};

export const transformFeatures = (features) => {
  return features.map(feature => ({
    id: feature.featureId,
    featureId: feature.featureId,
    title: feature.title,
    category: feature.category,
    description: feature.description,
    implementationFlow: feature.implementationFlow,
    relatedEndpoints: feature.relatedEndpoints,
    tags: feature.tags,
    access: feature.access,
    isActive: feature.isActive,
    createdBy: feature.createdBy,
    updatedBy: feature.updatedBy,
    createdAt: feature.createdAt,
    updatedAt: feature.updatedAt
  }));
};

export const transformDocStats = (stats) => {
  return {
    apiEndpoints: stats.totalApiEndpoints,
    features: stats.totalFeatures,
    services: stats.totalServices,
  };
};

export default documentationAPI;
