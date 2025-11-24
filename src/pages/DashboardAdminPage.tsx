import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppointments } from '../hooks/api/useAppointments';

export default function DashboardAdminPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const today = new Date().toISOString().split('T')[0];

  const { data: appointments = [], isLoading } = useAppointments(
    workspaceId || '',
    { startDate: today },
    !!workspaceId
  );

  const todayAppointments = appointments.filter((apt) => apt.date === today);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Visão geral do seu negócio</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Agendamentos Hoje</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Esta Semana</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Conclusão</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">95%</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Próximos Agendamentos</h2>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Nenhum agendamento encontrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Cliente #{appointment.clientId.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Serviço: {appointment.serviceId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {format(new Date(appointment.date + 'T' + appointment.startTime), 'HH:mm', { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
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
