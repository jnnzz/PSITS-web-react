import { toast } from 'react-toastify';

/**
 * Copy text to clipboard with user feedback
 * @param {string} text - The text to copy
 * @param {string} type - The type of content being copied (for toast message)
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text, type = 'content') => {
  try {
    // Use the modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (!successful) {
        throw new Error('Copy command failed');
      }
    }
    
    // Show success toast
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    
    // Show error toast
    toast.error('Failed to copy to clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    return false;
  }
};

/**
 * Copy cURL command to clipboard
 * @param {string} curlCommand - The cURL command
 */
export const copyCurlCommand = (curlCommand) => {
  return copyToClipboard(curlCommand, 'cURL command');
};

/**
 * Copy JavaScript code to clipboard
 * @param {string} jsCode - The JavaScript code
 */
export const copyJavaScriptCode = (jsCode) => {
  return copyToClipboard(jsCode, 'JavaScript code');
};

/**
 * Copy JSON response to clipboard
 * @param {string|object} jsonData - The JSON data (string or object)
 */
export const copyJsonResponse = (jsonData) => {
  let jsonString;
  
  if (typeof jsonData === 'string') {
    try {
      // Parse and pretty-print if it's a JSON string
      const parsed = JSON.parse(jsonData);
      jsonString = JSON.stringify(parsed, null, 2);
    } catch {
      // If parsing fails, use as-is
      jsonString = jsonData;
    }
  } else if (typeof jsonData === 'object') {
    // Pretty-print object
    jsonString = JSON.stringify(jsonData, null, 2);
  } else {
    jsonString = String(jsonData);
  }
  
  return copyToClipboard(jsonString, 'JSON response');
};

/**
 * Copy API endpoint URL to clipboard
 * @param {string} url - The API endpoint URL
 */
export const copyApiUrl = (url) => {
  return copyToClipboard(url, 'API URL');
};

/**
 * Copy request headers to clipboard
 * @param {object} headers - The headers object
 */
export const copyHeaders = (headers) => {
  let headerString = '';
  
  if (typeof headers === 'object') {
    Object.entries(headers).forEach(([key, value]) => {
      headerString += `${key}: ${value}\n`;
    });
    headerString = headerString.trim();
  } else {
    headerString = String(headers);
  }
  
  return copyToClipboard(headerString, 'headers');
};

/**
 * Copy request body to clipboard
 * @param {string|object} body - The request body
 */
export const copyRequestBody = (body) => {
  let bodyString;
  
  if (typeof body === 'object') {
    bodyString = JSON.stringify(body, null, 2);
  } else {
    bodyString = String(body);
  }
  
  return copyToClipboard(bodyString, 'request body');
};

/**
 * Copy error message to clipboard
 * @param {string} errorMessage - The error message
 */
export const copyErrorMessage = (errorMessage) => {
  return copyToClipboard(errorMessage, 'error message');
};

/**
 * Copy code snippet with syntax highlighting info
 * @param {string} code - The code to copy
 * @param {string} language - The programming language (for context)
 */
export const copyCodeSnippet = (code, language = 'text') => {
  return copyToClipboard(code, `${language} code`);
};

/**
 * Copy formatted API documentation
 * @param {object} endpoint - The endpoint object
 */
export const copyApiDocumentation = (endpoint) => {
  const doc = `# ${endpoint.title || endpoint.endpointId}

## Description
${endpoint.description || 'No description available'}

## Method
\`${endpoint.method}\`

## URL
\`${endpoint.url}\`

## Parameters
${endpoint.parameters?.map(param => 
  `- **${param.name}** (${param.type})${param.required ? ' *required*' : ''}: ${param.description || 'No description'}`
).join('\n') || 'No parameters'}

## Example Request
\`\`\`bash
${endpoint.exampleRequest?.curl || 'No cURL example available'}
\`\`\`

## Example Response
\`\`\`json
${endpoint.exampleResponse ? JSON.stringify(endpoint.exampleResponse, null, 2) : 'No response example available'}
\`\`\`
`;
  
  return copyToClipboard(doc, 'API documentation');
};

/**
 * Copy all examples for an endpoint
 * @param {object} endpoint - The endpoint object
 */
export const copyAllExamples = (endpoint) => {
  const examples = `# ${endpoint.title || endpoint.endpointId} - All Examples

## cURL
\`\`\`bash
${endpoint.exampleRequest?.curl || 'No cURL example available'}
\`\`\`

## JavaScript (Axios)
\`\`\`javascript
${endpoint.exampleRequest?.javascript || 'No JavaScript example available'}
\`\`\`

## Response
\`\`\`json
${endpoint.exampleResponse ? JSON.stringify(endpoint.exampleResponse, null, 2) : 'No response example available'}
\`\`\`
`;
  
  return copyToClipboard(examples, 'all examples');
};

/**
 * Copy endpoint ID for reference
 * @param {string} endpointId - The endpoint ID
 */
export const copyEndpointId = (endpointId) => {
  return copyToClipboard(endpointId, 'endpoint ID');
};

/**
 * Copy feature ID for reference
 * @param {string} featureId - The feature ID
 */
export const copyFeatureId = (featureId) => {
  return copyToClipboard(featureId, 'feature ID');
};

/**
 * Copy implementation flow
 * @param {string} flow - The implementation flow text
 */
export const copyImplementationFlow = (flow) => {
  return copyToClipboard(flow, 'implementation flow');
};

/**
 * Copy tags as comma-separated string
 * @param {array} tags - Array of tags
 */
export const copyTags = (tags) => {
  const tagsString = Array.isArray(tags) ? tags.join(', ') : String(tags);
  return copyToClipboard(tagsString, 'tags');
};

/**
 * Copy related endpoints
 * @param {array} endpoints - Array of related endpoint IDs
 */
export const copyRelatedEndpoints = (endpoints) => {
  const endpointsString = Array.isArray(endpoints) ? endpoints.join(', ') : String(endpoints);
  return copyToClipboard(endpointsString, 'related endpoints');
};

// Default export with all functions
export default {
  copyToClipboard,
  copyCurlCommand,
  copyJavaScriptCode,
  copyJsonResponse,
  copyApiUrl,
  copyHeaders,
  copyRequestBody,
  copyErrorMessage,
  copyCodeSnippet,
  copyApiDocumentation,
  copyAllExamples,
  copyEndpointId,
  copyFeatureId,
  copyImplementationFlow,
  copyTags,
  copyRelatedEndpoints
};
