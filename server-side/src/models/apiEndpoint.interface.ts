import { Types } from "mongoose";

export interface IEndpointParameter {
  field: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface IExampleRequest {
  curl: string;
  javascript: string;
}

export interface IExampleResponse {
  status: string;
  body: string; // JSON string
}

export interface IApiEndpoint {
  endpointId: string; // Unique identifier (e.g., "auth-login")
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string; // Endpoint URL
  title: string; // Display title
  description: string; // Brief description
  access: 'Public' | 'Student' | 'Admin' | 'Both'; // Access level for visibility
  category: 'authentication' | 'student' | 'admin' | 'events' | 'merchandise' | 'other';
  parameters: IEndpointParameter[]; // Request parameters
  exampleRequest: IExampleRequest; // Code examples
  exampleResponse: IExampleResponse; // Response examples
  isActive: boolean; // Toggle visibility
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin who created
  updatedBy: string; // Last admin who updated
}
