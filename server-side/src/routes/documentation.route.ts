import { Router } from "express";
import {
  getApiEndpoints,
  getApiEndpointById,
  getFeatures,
  getFeatureById,
  getDocStats,
  getFeatureCategories,
  getApiMethods,
  createApiEndpoint,
  createFeature,
  updateApiEndpoint,
  deleteApiEndpoint,
  updateFeature,
  deleteFeature,
  toggleEndpointStatus,
  toggleFeatureStatus,
} from "../controllers/documentation.controller";
import { admin_authenticate } from "../middlewares/custom_authenticate_token";

const router = Router();

// Public routes (no authentication required)
router.get("/stats", getDocStats);
router.get("/feature-categories", getFeatureCategories);
router.get("/api-methods", getApiMethods);

// Protected routes (authentication required for admins only)
router.get("/endpoints", admin_authenticate, getApiEndpoints);
router.get("/endpoints/:endpointId", admin_authenticate, getApiEndpointById);
router.get("/features", admin_authenticate, getFeatures);
router.get("/features/:featureId", admin_authenticate, getFeatureById);

// Admin-only routes (admin role required)
router.post("/endpoints", admin_authenticate, createApiEndpoint);
router.post("/features", admin_authenticate, createFeature);

// Update routes
router.put("/endpoints/:endpointId", admin_authenticate, updateApiEndpoint);
router.put("/features/:featureId", admin_authenticate, updateFeature);

// Delete routes (soft delete)
router.delete("/endpoints/:endpointId", admin_authenticate, deleteApiEndpoint);
router.delete("/features/:featureId", admin_authenticate, deleteFeature);

// Toggle status routes
router.patch("/endpoints/:endpointId/toggle", admin_authenticate, toggleEndpointStatus);
router.patch("/features/:featureId/toggle", admin_authenticate, toggleFeatureStatus);

export default router;
