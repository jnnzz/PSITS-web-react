import { Request, Response } from "express";
import { ApiEndpoint } from "../models/apiEndpoint.model";
import { Feature } from "../models/feature.model";

// Helper function to determine user access level
const getUserAccessLevel = (req: any): 'Public' | 'Student' | 'Admin' | 'Both' => {
  const userRole = req.both?.role || req.user?.role;
  
  if (userRole === 'Admin') {
    return 'Admin';
  } else if (userRole === 'Student') {
    return 'Student';
  }
  
  return 'Public';
};

// Helper function to build access filter based on user role
const buildAccessFilter = (userRole: string) => {
  if (userRole === 'Admin') {
    // Admins can see everything - no access filter
    return {};
  } else if (userRole === 'Student') {
    // Students can see Public, Student, and Both
    return { access: { $in: ['Public', 'Student', 'Both'] } };
  } else {
    // Public users can only see Public
    return { access: 'Public' };
  }
};

export const getApiEndpoints = async (req: any, res: Response) => {
  try {
    const { method, category, access, page, limit } = req.query;
    const userRole = req.admin?.role || 'Public';
    
    // Parse pagination parameters
    const currentPage = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(limit as string) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    
    // Build filter based on user role and query parameters
    const filter: any = {
      isActive: true,
      ...buildAccessFilter(userRole),
    };

    // Add optional filters
    if (method && method !== 'ALL') {
      filter.method = method;
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (access && access !== 'all') {
      filter.access = access;
    }

    // Get total count and paginated results
    const [endpoints, totalCount] = await Promise.all([
      ApiEndpoint.find(filter)
        .sort({ category: 1, method: 1, title: 1 })
        .skip(skip)
        .limit(itemsPerPage)
        .lean(),
      ApiEndpoint.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.status(200).json({
      success: true,
      data: endpoints,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalCount,
        itemsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    console.error('Error fetching API endpoints:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch API endpoints',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getApiEndpointById = async (req: any, res: Response) => {
  try {
    const { endpointId } = req.params;
    const userRole = req.admin?.role || 'Public';
    
    const endpoint = await ApiEndpoint.findOne({
      endpointId,
      isActive: true,
      ...buildAccessFilter(userRole),
    }).lean();

    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'API endpoint not found or access denied',
      });
    }

    res.status(200).json({
      success: true,
      data: endpoint,
    });
  } catch (error) {
    console.error('Error fetching API endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch API endpoint',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFeatures = async (req: any, res: Response) => {
  try {
    const { category, search, page, limit } = req.query;
    const userRole = req.admin?.role || 'Public';
    
    // Parse pagination parameters
    const currentPage = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(limit as string) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    
    // Build filter based on user role and query parameters
    const filter: any = {
      isActive: true,
      ...buildAccessFilter(userRole),
    };

    // Add optional filters
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    // Get total count and paginated results
    const [features, totalCount] = await Promise.all([
      Feature.find(filter)
        .sort({ category: 1, title: 1 })
        .skip(skip)
        .limit(itemsPerPage)
        .lean(),
      Feature.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.status(200).json({
      success: true,
      data: features,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalCount,
        itemsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch features',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFeatureById = async (req: any, res: Response) => {
  try {
    const { featureId } = req.params;
    const userRole = req.admin?.role || 'Public';
    
    const feature = await Feature.findOne({
      featureId,
      isActive: true,
      ...buildAccessFilter(userRole),
    }).lean();

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: 'Feature not found or access denied',
      });
    }

    res.status(200).json({
      success: true,
      data: feature,
    });
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getDocStats = async (req: any, res: Response) => {
  try {
    // Calculate stats directly from collections
    const totalApiEndpoints = await ApiEndpoint.countDocuments({ isActive: true });
    const totalFeatures = await Feature.countDocuments({ isActive: true });
    const totalServices = 4; // Static value

    const stats = {
      totalApiEndpoints,
      totalFeatures,
      totalServices,
      lastUpdated: new Date(),
      updatedBy: 'system',
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching documentation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch documentation stats',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFeatureCategories = async (req: any, res: Response) => {
  try {
    const categories = await Feature.distinct('category', { isActive: true });
    
    const categoryData = categories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      icon: getCategoryIcon(category),
    }));

    res.status(200).json({
      success: true,
      data: categoryData,
    });
  } catch (error) {
    console.error('Error fetching feature categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature categories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getApiMethods = async (req: any, res: Response) => {
  try {
    const methods = await ApiEndpoint.distinct('method', { isActive: true });
    
    res.status(200).json({
      success: true,
      data: ['ALL', ...methods],
    });
  } catch (error) {
    console.error('Error fetching API methods:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch API methods',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Helper function to get category icon
const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    security: 'fas fa-shield-alt',
    events: 'fas fa-calendar-alt',
    management: 'fas fa-users-cog',
    commerce: 'fas fa-shopping-cart',
    other: 'fas fa-th',
  };
  
  return iconMap[category] || 'fas fa-th';
};

// Helper function to generate endpointId from URL and method
const generateEndpointId = (url: string, method: string): string => {
  // Remove leading slash and replace slashes with hyphens
  const cleanUrl = url.replace(/^\//, '').replace(/\//g, '-');
  
  // Convert to lowercase and replace special characters
  const sanitizedUrl = cleanUrl
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Combine method and URL
  return `${method.toLowerCase()}-${sanitizedUrl}`;
};

// Helper function to generate featureId
const generateFeatureId = (title: string): string => {
  // Convert title to lowercase, replace spaces and special characters with hyphens
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
};

// Admin-only endpoints for managing documentation
export const createApiEndpoint = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    // Auto-generate endpointId if not provided
    const endpointId = req.body.endpointId || generateEndpointId(req.body.url, req.body.method);

    const endpointData = {
      ...req.body,
      endpointId,
      createdBy: req.admin?.id_number,
      updatedBy: req.admin?.id_number,
    };

    const endpoint = new ApiEndpoint(endpointData);
    await endpoint.save();

    res.status(201).json({
      success: true,
      message: 'API endpoint created successfully',
      data: endpoint,
    });
  } catch (error) {
    console.error('Error creating API endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create API endpoint',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createFeature = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    // Auto-generate featureId if not provided
    const featureId = req.body.featureId || generateFeatureId(req.body.title);

    const featureData = {
      ...req.body,
      featureId,
      createdBy: req.admin?.id_number,
      updatedBy: req.admin?.id_number,
    };

    const feature = new Feature(featureData);
    await feature.save();

    res.status(201).json({
      success: true,
      message: 'Feature created successfully',
      data: feature,
    });
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create feature',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update API Endpoint
export const updateApiEndpoint = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { endpointId } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.admin?.id_number,
    };

    const endpoint = await ApiEndpoint.findOneAndUpdate(
      { endpointId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'API endpoint not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'API endpoint updated successfully',
      data: endpoint,
    });
  } catch (error) {
    console.error('Error updating API endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update API endpoint',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete API Endpoint (hard delete - remove from database)
export const deleteApiEndpoint = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { endpointId } = req.params;

    const endpoint = await ApiEndpoint.findOneAndDelete(
      { endpointId }
    );

    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'API endpoint not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'API endpoint deleted successfully',
      data: endpoint,
    });
  } catch (error) {
    console.error('Error deleting API endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete API endpoint',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update Feature
export const updateFeature = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { featureId } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.admin?.id_number,
    };

    const feature = await Feature.findOneAndUpdate(
      { featureId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: 'Feature not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feature updated successfully',
      data: feature,
    });
  } catch (error) {
    console.error('Error updating feature:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feature',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete Feature (hard delete - remove from database)
export const deleteFeature = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { featureId } = req.params;

    const feature = await Feature.findOneAndDelete(
      { featureId }
    );

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: 'Feature not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feature deleted successfully',
      data: feature,
    });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feature',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Toggle Active Status for API Endpoint
export const toggleEndpointStatus = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { endpointId } = req.params;

    const endpoint = await ApiEndpoint.findOne({ endpointId });
    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: 'API endpoint not found',
      });
    }

    endpoint.isActive = !endpoint.isActive;
    endpoint.updatedBy = req.both?.id_number || req.user?.id_number;
    await endpoint.save();

    res.status(200).json({
      success: true,
      message: `API endpoint ${endpoint.isActive ? 'activated' : 'deactivated'} successfully`,
      data: endpoint,
    });
  } catch (error) {
    console.error('Error toggling endpoint status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle endpoint status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Toggle Active Status for Feature
export const toggleFeatureStatus = async (req: any, res: Response) => {
  try {
    if (req.admin?.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    const { featureId } = req.params;

    const feature = await Feature.findOne({ featureId });
    if (!feature) {
      return res.status(404).json({
        success: false,
        message: 'Feature not found',
      });
    }

    feature.isActive = !feature.isActive;
    feature.updatedBy = req.both?.id_number || req.user?.id_number;
    await feature.save();

    res.status(200).json({
      success: true,
      message: `Feature ${feature.isActive ? 'activated' : 'deactivated'} successfully`,
      data: feature,
    });
  } catch (error) {
    console.error('Error toggling feature status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle feature status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
