import { useParams } from 'react-router-dom';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AppLayout from '../components/AppLayout';
import Card, { CardBody } from '../components/Card';
import DataTable from '../components/DataTable';
import { useAppointments } from '../hooks/api/useAppointments';
import type { Appointment } from '../types';

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300',
    confirmed: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300',
    completed: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300',
    cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300',
    'no-show': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
  };
  return colors[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    'no-show': 'Não compareceu',
  };
  return labels[status] || status;
};

const columnHelper = createColumnHelper<Appointment>();

const columns: ColumnDef<Appointment, any>[] = [
  columnHelper.accessor('date', {
    header: 'Data',
    cell: (info) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {format(new Date(info.getValue()), 'dd/MM/yyyy', { locale: ptBR })}
      </span>
    ),
  }),
  columnHelper.accessor('startTime', {
    header: 'Horário',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">
        {info.getValue()} - {info.row.original.endTime}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'client',
    header: 'Cliente',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">
        #{info.row.original.clientId.slice(0, 8)}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'professional',
    header: 'Profissional',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">
        #{info.row.original.professionalId.slice(0, 8)}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(info.getValue())}`}>
        {getStatusLabel(info.getValue())}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'payment',
    header: 'Pagamento',
    cell: (info) => {
      const paymentStatus = (info.row.original as any).paymentStatus;
      if (!paymentStatus) return <span className="text-gray-400 dark:text-gray-500">-</span>;
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${paymentStatus === 'paid'
          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
          }`}>
          {paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
        </span>
      );
    },
  }),
];

export default function AppointmentsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data: appointments = [], isLoading } = useAppointments(workspaceId!);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Agendamentos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie todos os agendamentos</p>
        </div>

        {appointments.length === 0 && !isLoading ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhum agendamento encontrado</p>
            </CardBody>
          </Card>
        ) : (
          <DataTable data={appointments} columns={columns} isLoading={isLoading} />
        )}
      </div>
    </AppLayout>
  );
}
