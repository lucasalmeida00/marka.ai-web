import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import { useWorkspace } from '../context/WorkspaceContext';
import { appointmentsApi } from '../api/appointments';
import type { Appointment } from '../types';
import { format } from 'date-fns';

export default function DashboardProfessionalPage() {
  const { currentWorkspace } = useWorkspace();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentWorkspace) {
      loadAppointments();
    }
  }, [currentWorkspace]);

  const loadAppointments = async () => {
    if (!currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await appointmentsApi.list(currentWorkspace.id, {
        startDate: format(new Date(), 'yyyy-MM-dd'),
      });
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Minha Agenda</h1>
          <p className="text-gray-600 mt-1">
            Seus agendamentos de hoje
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Agendamentos de Hoje</h2>
          </CardHeader>
          <CardBody>
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum agendamento para hoje
              </p>
            ) : (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {appointment.startTime} - {appointment.endTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cliente #{appointment.clientId.slice(0, 8)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {appointment.status === 'confirmed'
                        ? 'Confirmado'
                        : appointment.status === 'completed'
                          ? 'Concluído'
                          : 'Pendente'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
}
