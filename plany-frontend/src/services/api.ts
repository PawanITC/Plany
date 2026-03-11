import axios from 'axios';

// During development, assume the backend is running locally on 8080.
// In production, this would be the AWS API Gateway endpoint.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 10000, 
});

// Interceptor for responses to handle global errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error.message);
    // Here we could plug in a toast notification system later
    return Promise.reject(error);
  }
);

export default apiClient;
