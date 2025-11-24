import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Card, { CardBody } from '../components/Card';
import { appointmentsApi } from '../api/appointments';
import type { Appointment } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentsApi.myAppointments();
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
          <h1 className="text-3xl font-bold text-gray-900">Meus Agendamentos</h1>
          <p className="text-gray-600 mt-1">Acompanhe seus agendamentos</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : appointments.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600">Você não tem agendamentos</p>
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
                      </div>
                      <p className="font-medium text-gray-900">
                        Empresa: {appointment.workspaceId.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Profissional: #{appointment.professionalId.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Serviço: {appointment.serviceId.slice(0, 8)}
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
