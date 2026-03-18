/**
 * Centralized API Client for SecureVault
 * Handles all API requests with proper error handling and authentication
 */

import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;

      // Handle specific error cases
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);

          if (!window.location.pathname.includes('/login') &&
            !window.location.pathname.includes('/register')) {
            window.location.href = '/login?expired=true';
          }
          break;
        case 403:
          console.error('Access forbidden:', data?.message || 'You do not have permission to access this resource');
          break;
        case 404:
          console.error('Resource not found:', data?.message || 'The requested resource was not found');
          break;
        case 413:
          console.error('Payload too large:', data?.message || 'The file you are trying to upload is too large');
          break;
        case 429:
          console.error('Too many requests:', data?.message || 'Slow down! You are making too many requests');
          break;
        case 500:
          console.error('Server error:', data?.message || 'Something went wrong on our end');
          break;
        default:
          console.error('API Error:', data?.message || 'An unexpected error occurred');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

/**
 * Safely extracts a readable error message from any error object
 * @param {any} err - The error object to parse
 * @returns {string} - A human-readable error message
 */
export function getErrorMessage(err) {
  if (!err) return 'An unknown error occurred';
  if (typeof err === 'string') return err;

  // Log detailed error to console for debugging
  if (process.env.NODE_ENV === 'development') {
    console.group('API Error Detailed Log');
    console.log('Message:', err.message);
    console.log('Response:', err.response);
    console.log('Request:', err.request);
    console.log('Config:', err.config);
    console.groupEnd();
  }

  // Axios error response
  if (err.response) {
    const data = err.response.data;
    
    // Check if we have a specific message in the response
    const specificMessage = data?.message || data?.error || (typeof data === 'string' ? data : null);
    if (specificMessage) return specificMessage;
    
    // Fallback based on status code
    if (err.response.status === 500) {
      return 'Internal Server Error (500). Please check server logs.';
    }
  }

  // Axios network error (no response received)
  if (err.request) {
    return 'Could not reach the server. Please check your internet connection or ensuring the backend is running.';
  }

  return err.message || 'Something went wrong';
}

// Export API methods
export default api;

// Auth API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Files API methods
export const filesAPI = {
  // Get all user files
  getFiles: () => api.get('/files'),

  // Upload a file
  uploadFile: (formData, onProgress) => {
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Delete a file
  deleteFile: (fileId) => api.delete(`/files/${fileId}`),

  // Get all shares
  getShares: () => api.get('/shares'),

  // Create a share link
  createShare: (fileId, options) => api.post('/shares', { fileId, ...options }),

  // Revoke a share link
  revokeShare: (shareId) => api.delete(`/shares/${shareId}`),

  // Access a shared file
  accessFile: (token, password) => api.post(`/shares/access/${token}`, { password }),

  // Get file info
  getFileInfo: (fileId) => api.get(`/files/${fileId}`),
};

// Health check API
export const healthAPI = {
  check: () => axios.get(`${API_BASE_URL}/health`),
  status: () => axios.get(`${API_BASE_URL}/status`),
};

