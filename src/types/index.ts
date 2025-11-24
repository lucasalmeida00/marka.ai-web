export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'professional' | 'client';
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  segment: string;
  city?: string;
  ownerId: string;
  planId: string;
  createdAt: string;
}

export interface Professional {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  avatar?: string;
  bio?: string;
  services: string[];
  schedule: Schedule;
  createdAt: string;
}

export interface Schedule {
  [key: string]: {
    enabled: boolean;
    slots: TimeSlot[];
  };
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Service {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  requiresPayment: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  workspaceId: string;
  professionalId: string;
  clientId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxProfessionals: number;
  maxAppointments: number;
  allowOnlinePayments: boolean;
}

export interface Subscription {
  id: string;
  workspaceId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Invoice {
  id: string;
  workspaceId: string;
  subscriptionId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  dueDate: string;
  paidAt?: string;
  invoiceUrl?: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  paymentUrl?: string;
  paidAt?: string;
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}
