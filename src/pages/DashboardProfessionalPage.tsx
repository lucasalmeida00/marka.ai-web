import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import { useWorkspace } from '../context/WorkspaceContext';
import { format } from 'date-fns';
import { useAppointments } from '../hooks/api/useAppointments';

export default function DashboardProfessionalPage() {
  const { currentWorkspace } = useWorkspace();
  const { data: appointments = [], isLoading } = useAppointments(
    currentWorkspace?.id || '',
    {
      startDate: format(new Date(), 'yyyy-MM-dd'),
    },
    !!currentWorkspace
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Minha Agenda</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Seus agendamentos de hoje
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Agendamentos de Hoje</h2>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Nenhum agendamento para hoje
              </p>
            ) : (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {appointment.startTime} - {appointment.endTime}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cliente #{appointment.clientId.slice(0, 8)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : appointment.status === 'completed'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
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
