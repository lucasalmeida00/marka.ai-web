import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody } from '../components/Card';
import { appointmentsApi } from '../api/appointments';
import type { Appointment } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AppointmentsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [workspaceId]);

  const loadAppointments = async () => {
    if (!workspaceId) return;

    try {
      const data = await appointmentsApi.list(workspaceId);
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'no-show': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os agendamentos</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : appointments.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600">Nenhum agendamento encontrado</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusLabel(appointment.status)}
                        </span>
                        {appointment.paymentStatus && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {appointment.paymentStatus === 'paid' ? 'Pago' : 'Aguardando pagamento'}
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-gray-900">
                        Cliente: #{appointment.clientId.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Profissional: #{appointment.professionalId.slice(0, 8)} | Serviço: {appointment.serviceId.slice(0, 8)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.startTime} - {appointment.endTime}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
