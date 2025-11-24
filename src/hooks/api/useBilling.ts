import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { billingApi } from '../../api';
import type { CreateCheckoutSessionRequest } from '../../api';

export const usePlans = () => {
  return useQuery({
    queryKey: ['billing', 'plans'],
    queryFn: () => billingApi.listPlans(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const usePlan = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'plans', id],
    queryFn: () => billingApi.getPlan(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSubscription = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'workspaces', workspaceId, 'subscription'],
    queryFn: () => billingApi.getSubscription(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (data: CreateCheckoutSessionRequest) => billingApi.createCheckoutSession(data),
  });
};

export const useChangePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, planId }: { workspaceId: string; planId: string }) =>
      billingApi.changePlan(workspaceId, planId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['billing', 'workspaces', variables.workspaceId, 'subscription'],
      });
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => billingApi.cancelSubscription(workspaceId),
    onSuccess: (_, workspaceId) => {
      queryClient.invalidateQueries({
        queryKey: ['billing', 'workspaces', workspaceId, 'subscription'],
      });
    },
  });
};

export const useResumeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => billingApi.resumeSubscription(workspaceId),
    onSuccess: (_, workspaceId) => {
      queryClient.invalidateQueries({
        queryKey: ['billing', 'workspaces', workspaceId, 'subscription'],
      });
    },
  });
};

export const useInvoices = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'workspaces', workspaceId, 'invoices'],
    queryFn: () => billingApi.listInvoices(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useInvoice = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'workspaces', workspaceId, 'invoices', id],
    queryFn: () => billingApi.getInvoice(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePayments = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'workspaces', workspaceId, 'payments'],
    queryFn: () => billingApi.listPayments(workspaceId),
    enabled: enabled && !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const usePayment = (workspaceId: string, id: string, enabled = true) => {
  return useQuery({
    queryKey: ['billing', 'workspaces', workspaceId, 'payments', id],
    queryFn: () => billingApi.getPayment(workspaceId, id),
    enabled: enabled && !!workspaceId && !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const usePayAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: any }) =>
      billingApi.payAppointment(workspaceId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['billing', 'workspaces', variables.workspaceId, 'payments'],
      });
    },
  });
};
