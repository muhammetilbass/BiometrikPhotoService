import axios from 'axios';
import { ApiError } from '../errors/ApiError';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(ApiError.fromAxiosError(error))
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(ApiError.fromAxiosError(error))
); 