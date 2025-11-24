import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import AppLayout from '../components/AppLayout';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/Modal';
import Input from '../components/Input';
import DataTable from '../components/DataTable';
import { useServices, useCreateService, useUpdateService } from '../hooks/api/useServices';
import { serviceSchema } from '../schemas/service.schema';
import type { Service } from '../types';

const columnHelper = createColumnHelper<Service>();

const columns: ColumnDef<Service, any>[] = [
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (info) => (
      <div className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor('duration', {
    header: 'Duração',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">{info.getValue()} min</span>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (info) => (
      <span className="font-semibold text-primary-600 dark:text-primary-400">
        R$ {info.getValue().toFixed(2)}
      </span>
    ),
  }),
  columnHelper.accessor('requiresPayment', {
    header: 'Pagamento',
    cell: (info) =>
      info.getValue() ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
          Online
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          No local
        </span>
      ),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Ações',
    cell: () => (
      <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
        Editar
      </button>
    ),
  }),
];

export default function ServicesPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { data: services = [], isLoading } = useServices(workspaceId!);
  const { mutate: createService, isPending: isCreating } = useCreateService();
  const { mutate: updateService, isPending: isUpdating } = useUpdateService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      duration: 60,
      price: 0,
      requiresPayment: false,
      isActive: true,
    },
  });

  const openCreateModal = () => {
    setEditingService(null);
    reset({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      requiresPayment: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    reset({
      name: service.name,
      description: service.description || '',
      duration: service.duration,
      price: service.price,
      requiresPayment: service.requiresPayment,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: any) => {
    if (!workspaceId) return;

    if (editingService) {
      updateService(
        {
          workspaceId,
          id: editingService.id,
          data,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            reset();
          },
          onError: (error: any) => {
            setError('root', {
              message: error.response?.data?.message || 'Erro ao atualizar serviço.',
            });
          },
        }
      );
    } else {
      createService(
        { workspaceId, ...data },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            reset();
          },
          onError: (error: any) => {
            setError('root', {
              message: error.response?.data?.message || 'Erro ao criar serviço.',
            });
          },
        }
      );
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Serviços</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie os serviços oferecidos</p>
          </div>
          <Button onClick={openCreateModal}>Adicionar Serviço</Button>
        </div>

        {services.length === 0 && !isLoading ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum serviço cadastrado</p>
              <Button onClick={openCreateModal}>Adicionar Primeiro Serviço</Button>
            </CardBody>
          </Card>
        ) : (
          <DataTable
            data={services}
            columns={columns}
            isLoading={isLoading}
            onRowClick={(service) => openEditModal(service)}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader onClose={() => setIsModalOpen(false)}>
              {editingService ? 'Editar Serviço' : 'Adicionar Serviço'}
            </ModalHeader>
            <ModalBody>
              {errors.root && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {errors.root.message}
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Nome do serviço"
                  required
                  {...register('name')}
                  error={errors.name?.message}
                  placeholder="Ex: Corte de cabelo"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    {...register('description')}
                    placeholder="Descreva o serviço..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Duração (minutos)"
                    type="number"
                    required
                    {...register('duration', { valueAsNumber: true })}
                    error={errors.duration?.message}
                    placeholder="60"
                  />

                  <Input
                    label="Preço (R$)"
                    type="number"
                    step="0.01"
                    required
                    {...register('price', { valueAsNumber: true })}
                    error={errors.price?.message}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('requiresPayment')}
                      className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Requer pagamento antecipado
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('isActive')}
                      className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Serviço ativo
                    </span>
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isPending}>
                {editingService ? 'Salvar Alterações' : 'Criar Serviço'}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </AppLayout>
  );
}
