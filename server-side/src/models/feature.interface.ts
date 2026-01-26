export interface IFeature {
  featureId: string; // Unique identifier
  title: string;
  category: 'security' | 'events' | 'management' | 'commerce' | 'other';
  description: string;
  implementationFlow: string; // Text description of flow
  relatedEndpoints: string[]; // Array of endpoint URLs
  tags: string[]; // Searchable tags
  access: 'Public' | 'Student' | 'Admin' | 'Both'; // Visibility control
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
