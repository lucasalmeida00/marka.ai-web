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
import { useProfessionals, useCreateProfessional, useUpdateProfessional } from '../hooks/api/useProfessionals';
import { inviteProfessionalSchema } from '../schemas/workspace.schema';
import type { Professional } from '../types';

const columnHelper = createColumnHelper<Professional>();

const columns: ColumnDef<Professional, any>[] = [
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (info) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg">
          👤
        </div>
        <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'email',
    header: 'Email',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">{(info.row.original as any).email || '-'}</span>
    ),
  }),
  columnHelper.display({
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const isActive = (info.row.original as any).isActive;
      return isActive ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
          Ativo
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
          Inativo
        </span>
      );
    },
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

export default function ProfessionalsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);

  const { data: professionals = [], isLoading } = useProfessionals(workspaceId!);
  const { mutate: createProfessional, isPending: isCreating } = useCreateProfessional();
  const { mutate: updateProfessional, isPending: isUpdating } = useUpdateProfessional();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(inviteProfessionalSchema),
  });

  const openCreateModal = () => {
    setEditingProfessional(null);
    reset({
      name: '',
      email: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (professional: Professional) => {
    setEditingProfessional(professional);
    reset({
      name: professional.name,
      email: (professional as any).email || '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: any) => {
    if (!workspaceId) return;

    if (editingProfessional) {
      updateProfessional(
        {
          workspaceId,
          id: editingProfessional.id,
          data,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            reset();
          },
          onError: (error: any) => {
            setError('root', {
              message: error.response?.data?.message || 'Erro ao atualizar profissional.',
            });
          },
        }
      );
    } else {
      createProfessional(
        { workspaceId, ...data },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            reset();
          },
          onError: (error: any) => {
            setError('root', {
              message: error.response?.data?.message || 'Erro ao enviar convite.',
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profissionais</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie os profissionais da sua empresa</p>
          </div>
          <Button onClick={openCreateModal}>Adicionar Profissional</Button>
        </div>

        {professionals.length === 0 && !isLoading ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum profissional cadastrado</p>
              <Button onClick={openCreateModal}>Adicionar Primeiro Profissional</Button>
            </CardBody>
          </Card>
        ) : (
          <DataTable
            data={professionals}
            columns={columns}
            isLoading={isLoading}
            onRowClick={(professional) => openEditModal(professional)}
          />
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader onClose={() => setIsModalOpen(false)}>
              {editingProfessional ? 'Editar Profissional' : 'Adicionar Profissional'}
            </ModalHeader>
            <ModalBody>
              {errors.root && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {errors.root.message}
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Nome"
                  required
                  {...register('name')}
                  error={errors.name?.message}
                  placeholder="Nome do profissional"
                />

                <Input
                  label="Email"
                  type="email"
                  required
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="email@exemplo.com"
                />

                {!editingProfessional && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Um convite será enviado para o email cadastrado
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isPending}>
                {editingProfessional ? 'Salvar Alterações' : 'Enviar Convite'}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </AppLayout>
  );
}
