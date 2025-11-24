import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import { appointmentsApi } from '../api/appointments';
import type { Appointment } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardAdminPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [workspaceId]);

  const loadData = async () => {
    if (!workspaceId) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await appointmentsApi.list(workspaceId, { startDate: today });
      setAppointments(data.slice(0, 5));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const todayAppointments = appointments.filter((apt) => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do seu negócio</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agendamentos Hoje</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {todayAppointments.length}
                  </p>
                </div>
                <div className="text-4xl">📅</div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Esta Semana</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {appointments.length}
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">95%</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Próximos Agendamentos</h2>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Nenhum agendamento próximo</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">Cliente #{appointment.clientId.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">
                        Serviço: {appointment.serviceId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {format(new Date(appointment.date + 'T' + appointment.startTime), 'HH:mm', { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
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
