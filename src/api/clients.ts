import apiClient from './client';
import type { User } from '../types';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientRequest {
  workspaceId: string;
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateClientRequest extends Partial<Omit<CreateClientRequest, 'workspaceId' | 'email'>> {
  avatar?: string;
}

export const clientsApi = {
  list: async (workspaceId: string): Promise<Client[]> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/clients`);
    return response.data;
  },

  get: async (workspaceId: string, id: string): Promise<Client> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/clients/${id}`);
    return response.data;
  },

  create: async (data: CreateClientRequest): Promise<Client> => {
    const response = await apiClient.post(`/api/workspaces/${data.workspaceId}/clients`, data);
    return response.data;
  },

  update: async (workspaceId: string, id: string, data: UpdateClientRequest): Promise<Client> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/clients/${id}`, data);
    return response.data;
  },
};
