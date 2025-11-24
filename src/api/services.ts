import apiClient from './client';
import type { Service } from '../types';

export interface CreateServiceRequest {
  workspaceId: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  requiresPayment: boolean;
}

export interface UpdateServiceRequest extends Partial<Omit<CreateServiceRequest, 'workspaceId'>> { }

export const servicesApi = {
  list: async (workspaceId: string): Promise<Service[]> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/services`);
    return response.data;
  },

  get: async (workspaceId: string, id: string): Promise<Service> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/services/${id}`);
    return response.data;
  },

  create: async (data: CreateServiceRequest): Promise<Service> => {
    const response = await apiClient.post(`/api/workspaces/${data.workspaceId}/services`, data);
    return response.data;
  },

  update: async (workspaceId: string, id: string, data: UpdateServiceRequest): Promise<Service> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/services/${id}`, data);
    return response.data;
  },

  delete: async (workspaceId: string, id: string): Promise<void> => {
    await apiClient.delete(`/api/workspaces/${workspaceId}/services/${id}`);
  },
};
