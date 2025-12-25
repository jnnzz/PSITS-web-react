import mongoose, { Schema, Document } from "mongoose";
import { IFeature } from "./feature.interface";

export interface IFeatureDocument extends IFeature, Document {}

const featureSchema = new Schema<IFeatureDocument>({
  featureId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['security', 'events', 'management', 'commerce', 'other'],
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  implementationFlow: {
    type: String,
    required: true,
  },
  relatedEndpoints: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  access: {
    type: String,
    enum: ['Public', 'Student', 'Admin', 'Both'],
    required: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create compound indexes for better query performance
featureSchema.index({ category: 1, access: 1 });
featureSchema.index({ access: 1, isActive: 1 });
featureSchema.index({ category: 1, isActive: 1 });

export const Feature = mongoose.model<IFeatureDocument>("feature", featureSchema);
