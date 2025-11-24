import apiClient from './client';
import type { Professional, Schedule } from '../types';

export interface CreateProfessionalRequest {
  workspaceId: string;
  name: string;
  email: string;
  bio?: string;
  services: string[];
  schedule: Schedule;
}

export interface UpdateProfessionalRequest extends Partial<Omit<CreateProfessionalRequest, 'workspaceId' | 'email'>> {
  avatar?: string;
}

export const professionalsApi = {
  list: async (workspaceId: string): Promise<Professional[]> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/professionals`);
    return response.data;
  },

  get: async (workspaceId: string, id: string): Promise<Professional> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/professionals/${id}`);
    return response.data;
  },

  create: async (data: CreateProfessionalRequest): Promise<Professional> => {
    const response = await apiClient.post(`/api/workspaces/${data.workspaceId}/professionals`, data);
    return response.data;
  },

  update: async (workspaceId: string, id: string, data: UpdateProfessionalRequest): Promise<Professional> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/professionals/${id}`, data);
    return response.data;
  },

  delete: async (workspaceId: string, id: string): Promise<void> => {
    await apiClient.delete(`/api/workspaces/${workspaceId}/professionals/${id}`);
  },

  updateSchedule: async (workspaceId: string, id: string, schedule: Schedule): Promise<Professional> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/professionals/${id}/schedule`, { schedule });
    return response.data;
  },
};
