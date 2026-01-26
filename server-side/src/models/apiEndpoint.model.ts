import mongoose, { Schema, Document } from "mongoose";
import {
  IApiEndpoint,
  IEndpointParameter,
  IExampleRequest,
  IExampleResponse,
} from "./apiEndpoint.interface";

export interface IEndpointParameterDocument extends IEndpointParameter, Document {}
export interface IExampleRequestDocument extends IExampleRequest, Document {}
export interface IExampleResponseDocument extends IExampleResponse, Document {}
export interface IApiEndpointDocument extends IApiEndpoint, Document {}

const endpointParameterSchema = new Schema<IEndpointParameterDocument>({
  field: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: String,
    required: false,
  },
}, { _id: false });

const exampleRequestSchema = new Schema<IExampleRequestDocument>({
  curl: {
    type: String,
    required: true,
  },
  javascript: {
    type: String,
    required: true,
  },
}, { _id: false });

const exampleResponseSchema = new Schema<IExampleResponseDocument>({
  status: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { _id: false });

const apiEndpointSchema = new Schema<IApiEndpointDocument>({
  endpointId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    required: true,
    index: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ['Public', 'Student', 'Admin', 'Both'],
    required: true,
    index: true,
  },
  category: {
    type: String,
    enum: ['authentication', 'student', 'admin', 'events', 'merchandise', 'other'],
    required: true,
    index: true,
  },
  parameters: {
    type: [endpointParameterSchema],
    default: [],
  },
  exampleRequest: {
    type: exampleRequestSchema,
    required: true,
  },
  exampleResponse: {
    type: exampleResponseSchema,
    required: true,
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
apiEndpointSchema.index({ method: 1, access: 1 });
apiEndpointSchema.index({ category: 1, isActive: 1 });
apiEndpointSchema.index({ access: 1, isActive: 1 });

export const ApiEndpoint = mongoose.model<IApiEndpointDocument>("apiendpoint", apiEndpointSchema);
