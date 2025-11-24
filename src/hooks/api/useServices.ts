import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '../../api';
import type { CreateServiceRequest, UpdateServiceRequest } from '../../api';

export const useServices = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'services'],
    queryFn: () => servicesApi.list(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useService = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'services', id],
    queryFn: () => servicesApi.get(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceRequest) => servicesApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'services'],
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      data,
    }: {
      workspaceId: string;
      id: string;
      data: UpdateServiceRequest;
    }) => servicesApi.update(workspaceId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'services'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'services', variables.id],
      });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      servicesApi.delete(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'services'],
      });
    },
  });
};
