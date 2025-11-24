import apiClient from './client';
import type { User } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'client';
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/reset-password', data);
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  refresh: async (): Promise<{ token: string }> => {
    const response = await apiClient.post('/api/auth/refresh');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/verify-email', { token });
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_workspace_id');
  },
};
