import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workspacesApi } from '../../api';
import type { CreateWorkspaceRequest, UpdateWorkspaceRequest } from '../../api';

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: () => workspacesApi.list(),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useWorkspace = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', id],
    queryFn: () => workspacesApi.get(id),
    enabled: enabled && !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useWorkspaceBySlug = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', 'slug', slug],
    queryFn: () => workspacesApi.getBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceRequest) => workspacesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceRequest }) =>
      workspacesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', variables.id] });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};
