import apiClient from './client';
import type { Plan, Subscription, Invoice, Payment } from '../types';

export interface CreateCheckoutSessionRequest {
  workspaceId: string;
  planId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}

export interface PayAppointmentRequest {
  appointmentId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PayAppointmentResponse {
  paymentId: string;
  paymentUrl: string;
}

export const billingApi = {
  // Plans
  listPlans: async (): Promise<Plan[]> => {
    const response = await apiClient.get('/api/billing/plans');
    return response.data;
  },

  getPlan: async (id: string): Promise<Plan> => {
    const response = await apiClient.get(`/api/billing/plans/${id}`);
    return response.data;
  },

  // Subscriptions
  getSubscription: async (workspaceId: string): Promise<Subscription> => {
    const response = await apiClient.get(`/api/billing/workspaces/${workspaceId}/subscription`);
    return response.data;
  },

  createCheckoutSession: async (data: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> => {
    const response = await apiClient.post(`/api/billing/workspaces/${data.workspaceId}/checkout-session`, data);
    return response.data;
  },

  changePlan: async (workspaceId: string, planId: string): Promise<Subscription> => {
    const response = await apiClient.post(`/api/billing/workspaces/${workspaceId}/subscription/change-plan`, { planId });
    return response.data;
  },

  cancelSubscription: async (workspaceId: string): Promise<Subscription> => {
    const response = await apiClient.delete(`/api/billing/workspaces/${workspaceId}/subscription`);
    return response.data;
  },

  resumeSubscription: async (workspaceId: string): Promise<Subscription> => {
    const response = await apiClient.post(`/api/billing/workspaces/${workspaceId}/subscription/resume`);
    return response.data;
  },

  // Invoices
  listInvoices: async (workspaceId: string): Promise<Invoice[]> => {
    const response = await apiClient.get(`/api/billing/workspaces/${workspaceId}/invoices`);
    return response.data;
  },

  getInvoice: async (workspaceId: string, id: string): Promise<Invoice> => {
    const response = await apiClient.get(`/api/billing/workspaces/${workspaceId}/invoices/${id}`);
    return response.data;
  },

  // Appointment Payments
  payAppointment: async (workspaceId: string, data: PayAppointmentRequest): Promise<PayAppointmentResponse> => {
    const response = await apiClient.post(`/api/workspaces/${workspaceId}/payments/intent`, data);
    return response.data;
  },

  getPayment: async (workspaceId: string, id: string): Promise<Payment> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/payments/${id}`);
    return response.data;
  },

  listPayments: async (workspaceId: string): Promise<Payment[]> => {
    const response = await apiClient.get(`/api/workspaces/${workspaceId}/payments`);
    return response.data;
  },
};
