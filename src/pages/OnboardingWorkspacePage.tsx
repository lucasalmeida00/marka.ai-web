import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import Input from '../components/Input';
import { useWorkspace } from '../context/WorkspaceContext';
import { useCreateWorkspace } from '../hooks/api/useWorkspaces';
import { workspaceSchema, type WorkspaceInput } from '../schemas/workspace.schema';

export default function OnboardingWorkspacePage() {
  const navigate = useNavigate();
  const { refreshWorkspaces } = useWorkspace();
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<WorkspaceInput>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      slug: '',
      segment: '',
      city: '',
      address: '',
      phone: '',
      email: '',
      description: '',
    },
  });

  const watchName = watch('name');
  const watchSlug = watch('slug');

  // Auto-generate slug from name
  useEffect(() => {
    if (watchName && !watchSlug) {
      const slug = watchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [watchName, watchSlug, setValue]);

  const onSubmit = (data: WorkspaceInput) => {
    createWorkspace(data, {
      onSuccess: async () => {
        await refreshWorkspaces();
        navigate('/onboarding/plan');
      },
      onError: (error: any) => {
        setError('root', {
          message: error.response?.data?.message || 'Erro ao criar empresa. Tente novamente.',
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Configure sua empresa
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Passo 1 de 2: Informações da sua empresa
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                {errors.root.message}
              </div>
            )}

            <Input
              label="Nome da empresa"
              type="text"
              required
              {...register('name')}
              error={errors.name?.message}
              placeholder="Ex: Barbearia do João"
            />

            <Input
              label="URL personalizada"
              type="text"
              required
              {...register('slug')}
              error={errors.slug?.message}
              placeholder="barbearia-do-joao"
              helperText={`Sua página será: agendamentos.com/${watchSlug || 'sua-empresa'}`}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Segmento <span className="text-red-500">*</span>
              </label>
              <select
                required
                {...register('segment')}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Selecione...</option>
                <option value="barbearia">Barbearia</option>
                <option value="salao-beleza">Salão de Beleza</option>
                <option value="estetica">Estética</option>
                <option value="manicure">Manicure/Pedicure</option>
                <option value="massagem">Massagem</option>
                <option value="personal">Personal Trainer</option>
                <option value="clinica">Clínica</option>
                <option value="consultorio">Consultório</option>
                <option value="outro">Outro</option>
              </select>
              {errors.segment && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.segment.message}</p>
              )}
            </div>

            <Input
              label="Cidade"
              type="text"
              {...register('city')}
              error={errors.city?.message}
              placeholder="São Paulo - SP"
            />

            <Input
              label="Endereço"
              type="text"
              {...register('address')}
              error={errors.address?.message}
              placeholder="Rua, número, bairro"
            />

            <Input
              label="Telefone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="(11) 99999-9999"
            />

            <Input
              label="Email de contato"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="contato@empresa.com"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <textarea
                rows={3}
                {...register('description')}
                placeholder="Conte um pouco sobre sua empresa..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" isLoading={isPending}>
                Continuar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
