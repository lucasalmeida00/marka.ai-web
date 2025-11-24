import apiClient from './client';

export interface UploadResponse {
  url: string;
  filename: string;
  contentType: string;
}

export interface ImportJobResponse {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  type: 'clients' | 'appointments';
  fileName: string;
  totalRecords?: number;
  processedRecords?: number;
  errorRecords?: number;
  errors?: any[];
  createdAt: string;
  updatedAt: string;
}

export const uploadApi = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadMultipleFiles: async (files: File[]): Promise<{ files: UploadResponse[] }> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiClient.post('/api/upload/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFile: async (url: string): Promise<void> => {
    await apiClient.delete('/api/upload/upload', { data: { url } });
  },

  // Import jobs
  importClients: async (workspaceId: string, file: File): Promise<ImportJobResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(
      `/api/workspaces/${workspaceId}/files/import/clients`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  importAppointments: async (workspaceId: string, file: File): Promise<ImportJobResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(
      `/api/workspaces/${workspaceId}/files/import/appointments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  listImportJobs: async (workspaceId: string): Promise<ImportJobResponse[]> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/files/import-jobs`);
    return response.data;
  },

  getImportJob: async (workspaceId: string, id: string): Promise<ImportJobResponse> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/files/import-jobs/${id}`);
    return response.data;
  },
};
