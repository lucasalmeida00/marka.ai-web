import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadApi } from '../../api';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file: File) => uploadApi.uploadFile(file),
  });
};

export const useUploadMultipleFiles = () => {
  return useMutation({
    mutationFn: (files: File[]) => uploadApi.uploadMultipleFiles(files),
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (url: string) => uploadApi.deleteFile(url),
  });
};

export const useImportClients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, file }: { workspaceId: string; file: File }) =>
      uploadApi.importClients(workspaceId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'import-jobs'],
      });
    },
  });
};

export const useImportAppointments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, file }: { workspaceId: string; file: File }) =>
      uploadApi.importAppointments(workspaceId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'import-jobs'],
      });
    },
  });
};

export const useImportJobs = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'import-jobs'],
    queryFn: () => uploadApi.listImportJobs(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 30 * 1000, // 30 segundos
  });
};

export const useImportJob = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'import-jobs', id],
    queryFn: () => uploadApi.getImportJob(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 10 * 1000, // 10 segundos
    refetchInterval: (query) => {
      const data = query.state.data;
      // Refetch a cada 5 segundos se estiver em processamento
      if (data?.status === 'PROCESSING' || data?.status === 'PENDING') {
        return 5000;
      }
      return false;
    },
  });
};
