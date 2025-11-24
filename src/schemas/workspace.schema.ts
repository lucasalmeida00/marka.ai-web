import { z } from 'zod';

export const workspaceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  slug: z.string().min(3, 'URL deve ter no mínimo 3 caracteres'),
  segment: z.string().min(1, 'Selecione um segmento'),
  description: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
});

export const inviteProfessionalSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
});

export type WorkspaceInput = z.infer<typeof workspaceSchema>;
export type InviteProfessionalInput = z.infer<typeof inviteProfessionalSchema>;
