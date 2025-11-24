import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  duration: z.number().min(15, 'Duração mínima de 15 minutos').max(480, 'Duração máxima de 8 horas'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a 0'),
  requiresPayment: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
