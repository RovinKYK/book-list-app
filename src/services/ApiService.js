import axios from 'axios';

// Create an API service wrapper that handles authentication and session expiry
const createApiService = () => {
  // Get the API URL from Choreo config.js (if deployed on Choreo) or use default
  const API_URL = window.configs?.apiUrl || 'http://localhost:8080';

  // Create axios instance with Choreo integration
  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    // Include credentials for cookies to be sent with requests
    withCredentials: true
  });

//   // Add request interceptor to handle API paths for Choreo
//   apiClient.interceptors.request.use(config => {
//     // When running in Choreo with managed auth, requests should use service URLs
//     if (window.configs && window.configs.apiUrl) {
//       if (!config.url.startsWith('http')) {
//         // Only transform relative URLs - the service path will be configured in Choreo
//         // when we create a connection to the backend service
//         config.url = `/choreo-apis/${config.url}`;
//       }
//     }
//     return config;
//   });

  // Add response interceptor to handle session expiry
  apiClient.interceptors.response.use(
    response => response,
    error => {
      // Check if error is due to authentication
      if (error.response && error.response.status === 401) {
        console.log('Session expired, redirecting to login...');
        // Redirect to login
        window.location.href = '/auth/login';
        return Promise.reject(new Error('Session expired'));
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiService;
