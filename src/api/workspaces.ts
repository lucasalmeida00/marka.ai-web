import apiClient from './client';
import type { Workspace } from '../types';

export interface CreateWorkspaceRequest {
  name: string;
  slug: string;
  description?: string;
  segment: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface UpdateWorkspaceRequest extends Partial<CreateWorkspaceRequest> {
  logo?: string;
}

export const workspacesApi = {
  list: async (): Promise<Workspace[]> => {
    const response = await apiClient.get('/api/workspaces');
    return response.data;
  },

  get: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get(`/api/workspaces/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Workspace> => {
    const response = await apiClient.get(`/api/workspaces/slug/${slug}`);
    return response.data;
  },

  create: async (data: CreateWorkspaceRequest): Promise<Workspace> => {
    const response = await apiClient.post('/api/workspaces', data);
    return response.data;
  },

  update: async (id: string, data: UpdateWorkspaceRequest): Promise<Workspace> => {
    const response = await apiClient.patch(`/api/workspaces/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/workspaces/${id}`);
  },
};
