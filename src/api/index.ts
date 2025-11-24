export { authApi } from './auth';
export { workspacesApi } from './workspaces';
export { professionalsApi } from './professionals';
export { servicesApi } from './services';
export { appointmentsApi } from './appointments';
export { billingApi } from './billing';
export { clientsApi } from './clients';
export { uploadApi } from './upload';
export { default as apiClient } from './client';

// Re-export types
export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth';
export type { CreateWorkspaceRequest, UpdateWorkspaceRequest } from './workspaces';
export type { CreateProfessionalRequest, UpdateProfessionalRequest } from './professionals';
export type { CreateServiceRequest, UpdateServiceRequest } from './services';
export type { CreateAppointmentRequest, UpdateAppointmentRequest, GetAvailableSlotsRequest } from './appointments';
export type { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from './billing';
export type { Client, CreateClientRequest, UpdateClientRequest } from './clients';
export type { UploadResponse, ImportJobResponse } from './upload';
