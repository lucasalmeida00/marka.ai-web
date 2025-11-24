import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useWorkspace as useWorkspaceHook, useUpdateWorkspace } from '../hooks/api/useWorkspaces';
import { useWorkspace } from '../context/WorkspaceContext';
import { workspaceSchema, type WorkspaceInput } from '../schemas/workspace.schema';

export default function SettingsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { refreshWorkspaces } = useWorkspace();

  const { data: workspace, isLoading } = useWorkspaceHook(workspaceId || '');
  const { mutate: updateWorkspace, isPending: isSaving } = useUpdateWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<WorkspaceInput>({
    resolver: zodResolver(workspaceSchema),
  });

  useEffect(() => {
    if (workspace) {
      reset({
        name: workspace.name,
        description: workspace.description || '',
        phone: workspace.phone || '',
        email: workspace.email || '',
        address: workspace.address || '',
        city: workspace.city || '',
      });
    }
  }, [workspace, reset]);

  const onSubmit = (data: WorkspaceInput) => {
    if (!workspaceId) return;

    updateWorkspace(
      { id: workspaceId, data },
      {
        onSuccess: async () => {
          await refreshWorkspaces();
          alert('Configurações salvas com sucesso!');
        },
        onError: (error: any) => {
          setError('root', {
            message: error.response?.data?.message || 'Erro ao salvar configurações',
          });
        },
      }
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie as informações da sua empresa</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                {errors.root.message}
              </div>
            )}

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informações Gerais</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Nome da Empresa"
                  {...register('name')}
                  error={errors.name?.message}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                  )}
                </div>
                <Input
                  label="Telefone"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label="Endereço"
                  {...register('address')}
                  error={errors.address?.message}
                />
                <Input
                  label="Cidade"
                  {...register('city')}
                  error={errors.city?.message}
                />
              </CardBody>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="submit" isLoading={isSaving}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        )}
      </div>
    </AppLayout>
  );
}
