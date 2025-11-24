import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { professionalsApi } from '../../api';
import type { CreateProfessionalRequest, UpdateProfessionalRequest } from '../../api';
import type { Schedule } from '../../types';

export const useProfessionals = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'professionals'],
    queryFn: () => professionalsApi.list(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useProfessional = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'professionals', id],
    queryFn: () => professionalsApi.get(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateProfessional = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfessionalRequest) => professionalsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'professionals'],
      });
    },
  });
};

export const useUpdateProfessional = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      data,
    }: {
      workspaceId: string;
      id: string;
      data: UpdateProfessionalRequest;
    }) => professionalsApi.update(workspaceId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'professionals'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'professionals', variables.id],
      });
    },
  });
};

export const useDeleteProfessional = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      professionalsApi.delete(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'professionals'],
      });
    },
  });
};

export const useUpdateProfessionalSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      schedule,
    }: {
      workspaceId: string;
      id: string;
      schedule: Schedule;
    }) => professionalsApi.updateSchedule(workspaceId, id, schedule),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'professionals', variables.id],
      });
    },
  });
};
