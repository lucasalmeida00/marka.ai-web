import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import { appointmentsApi } from '../api/appointments';
import type { Appointment } from '../types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardClientPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentsApi.myAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= new Date() && apt.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) < new Date() || apt.status === 'cancelled'
  );

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Agendamentos</h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus agendamentos
            </p>
          </div>
          <Link to="/app/explore">
            <Button>Novo Agendamento</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Próximos Agendamentos</h2>
            </CardHeader>
            <CardBody>
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Você não tem agendamentos futuros</p>
                  <Link to="/app/explore">
                    <Button>Agendar Agora</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {format(parseISO(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.startTime} - Empresa #{appointment.workspaceId.slice(0, 8)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </span>
                        <Button size="sm" variant="outline">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>

          {pastAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Histórico</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {pastAppointments.slice(0, 5).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {format(parseISO(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.startTime} - Empresa #{appointment.workspaceId.slice(0, 8)}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {appointment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
