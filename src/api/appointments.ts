import apiClient from './client';
import type { Appointment } from '../types';

export interface CreateAppointmentRequest {
  workspaceId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  startTime: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  startTime?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface GetAvailableSlotsRequest {
  workspaceId: string;
  professionalId: string;
  serviceId: string;
  date: string;
}

export const appointmentsApi = {
  list: async (workspaceId: string, filters?: {
    professionalId?: string;
    clientId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Appointment[]> => {
    const params = new URLSearchParams(filters as any);
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/appointments?${params}`);
    return response.data;
  },

  get: async (workspaceId: string, id: string): Promise<Appointment> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/appointments/${id}`);
    return response.data;
  },

  create: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.post(`/api/workspaces/${data.workspaceId}/appointments`, data);
    return response.data;
  },

  update: async (workspaceId: string, id: string, data: UpdateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}`, data);
    return response.data;
  },

  updateStatus: async (workspaceId: string, id: string, status: string): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}/status`, { status });
    return response.data;
  },

  reschedule: async (workspaceId: string, id: string, data: { date: string; startTime: string }): Promise<Appointment> => {
    const response = await apiClient.post(`/api/workspaces/${workspaceId}/appointments/${id}/reschedule`, data);
    return response.data;
  },

  cancel: async (workspaceId: string, id: string): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}/status`, { status: 'cancelled' });
    return response.data;
  },

  confirm: async (workspaceId: string, id: string): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}/status`, { status: 'confirmed' });
    return response.data;
  },

  complete: async (workspaceId: string, id: string): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}/status`, { status: 'completed' });
    return response.data;
  },

  markNoShow: async (workspaceId: string, id: string): Promise<Appointment> => {
    const response = await apiClient.patch(`/api/workspaces/${workspaceId}/appointments/${id}/status`, { status: 'no-show' });
    return response.data;
  },

  getAvailableSlots: async (params: GetAvailableSlotsRequest): Promise<string[]> => {
    const response = await apiClient.get(
      `/api/workspaces/${params.workspaceId}/professionals/${params.professionalId}/available-slots`,
      { params: { serviceId: params.serviceId, date: params.date } }
    );
    return response.data;
  },

  myAppointments: async (): Promise<Appointment[]> => {
    const response = await apiClient.get('/api/appointments/me');
    return response.data;
  },
};
