import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { appointmentsApi } from '../../api';
import type { CreateAppointmentRequest, UpdateAppointmentRequest, GetAvailableSlotsRequest } from '../../api';

export const useAppointments = (
  workspaceId: string,
  filters?: {
    professionalId?: string;
    clientId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true
) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'appointments', filters],
    queryFn: () => appointmentsApi.list(workspaceId, filters),
    enabled: enabled && !!workspaceId,
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
};

export const useAppointment = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'appointments', id],
    queryFn: () => appointmentsApi.get(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 1 * 60 * 1000,
  });
};

export const useMyAppointments = (enabled = true) => {
  return useQuery({
    queryKey: ['appointments', 'me'],
    queryFn: () => appointmentsApi.myAppointments(),
    enabled,
    staleTime: 1 * 60 * 1000,
  });
};

export const useAvailableSlots = (params: GetAvailableSlotsRequest, enabled = true) => {
  return useQuery({
    queryKey: [
      'workspaces',
      params.workspaceId,
      'professionals',
      params.professionalId,
      'available-slots',
      params.serviceId,
      params.date,
    ],
    queryFn: () => appointmentsApi.getAvailableSlots(params),
    enabled: enabled && !!params.workspaceId && !!params.professionalId && !!params.date,
    staleTime: 30 * 1000, // 30 segundos
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentRequest) => appointmentsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['appointments', 'me'],
      });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      data,
    }: {
      workspaceId: string;
      id: string;
      data: UpdateAppointmentRequest;
    }) => appointmentsApi.update(workspaceId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id, status }: { workspaceId: string; id: string; status: string }) =>
      appointmentsApi.updateStatus(workspaceId, id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useRescheduleAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      id,
      data,
    }: {
      workspaceId: string;
      id: string;
      data: { date: string; startTime: string };
    }) => appointmentsApi.reschedule(workspaceId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      appointmentsApi.cancel(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useConfirmAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      appointmentsApi.confirm(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useCompleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      appointmentsApi.complete(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};

export const useMarkAppointmentNoShow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, id }: { workspaceId: string; id: string }) =>
      appointmentsApi.markNoShow(workspaceId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workspaces', variables.workspaceId, 'appointments', variables.id],
      });
    },
  });
};
