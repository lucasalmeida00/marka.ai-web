import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMyAppointments } from '../hooks/api/useAppointments';

export default function DashboardClientPage() {
  const { data: appointments = [], isLoading } = useMyAppointments();

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Meus Agendamentos</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
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
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Você não tem agendamentos futuros</p>
                  <Link to="/app/explore">
                    <Button>Agendar Agora</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {format(parseISO(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.startTime} - Empresa #{appointment.workspaceId.slice(0, 8)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
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
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {format(parseISO(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.startTime} - Empresa #{appointment.workspaceId.slice(0, 8)}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
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
