import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clientsApi } from '../../api';
import type { CreateClientRequest, UpdateClientRequest } from '../../api';

export const useClients = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'clients'],
    queryFn: () => clientsApi.list(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useClient = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'clients', id],
    queryFn: () => clientsApi.get(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientRequest) => clientsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'clients'],
      });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      data,
    }: {
      workspaceId: string;
      id: string;
      data: UpdateClientRequest;
    }) => clientsApi.update(workspaceId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'clients'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'clients', variables.id],
      });
    },
  });
};
