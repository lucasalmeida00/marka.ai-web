import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardFooter, CardHeader } from '../components/Card';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import { usePlans, useSubscription, useInvoices } from '../hooks/api/useBilling';
import type { Invoice } from '../types';

const columnHelper = createColumnHelper<Invoice>();

const invoiceColumns: ColumnDef<Invoice, any>[] = [
  columnHelper.accessor('amount', {
    header: 'Valor',
    cell: (info) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        R$ {info.getValue().toFixed(2)}
      </span>
    ),
  }),
  columnHelper.accessor('dueDate', {
    header: 'Vencimento',
    cell: (info) => (
      <span className="text-gray-600 dark:text-gray-400">
        {format(new Date(info.getValue()), 'dd/MM/yyyy', { locale: ptBR })}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status === 'paid'
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
            : status === 'pending'
              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
            }`}
        >
          {status === 'paid' ? 'Pago' : status === 'pending' ? 'Pendente' : 'Falhou'}
        </span>
      );
    },
  }),
];

export default function BillingPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { data: plans = [], isLoading: isLoadingPlans } = usePlans();
  const { data: subscription, isLoading: isLoadingSubscription } = useSubscription(workspaceId!);
  const { data: invoices = [], isLoading: isLoadingInvoices } = useInvoices(workspaceId!);

  const isLoading = isLoadingPlans || isLoadingSubscription || isLoadingInvoices;
  const currentPlan = plans.find((p) => p.id === subscription?.planId);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Plano e Pagamentos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie seu plano e histórico de pagamentos</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Plano Atual</h2>
              </CardHeader>
              <CardBody>
                {currentPlan ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentPlan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{currentPlan.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {subscription && (
                          <>
                            Próxima cobrança: {format(new Date(subscription.currentPeriodEnd), 'dd/MM/yyyy', { locale: ptBR })}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        R$ {currentPlan.price}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">/{currentPlan.interval === 'monthly' ? 'mês' : 'ano'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">Nenhum plano ativo</p>
                )}
              </CardBody>
              <CardFooter>
                <Button variant="outline">Alterar Plano</Button>
              </CardFooter>
            </Card>

            {/* Available Plans */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Planos Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={plan.id === subscription?.planId ? 'border-2 border-primary-500' : ''}>
                    <CardHeader className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{plan.description}</p>
                    </CardHeader>
                    <CardBody className="text-center">
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        R$ {plan.price}
                      </p>
                      <ul className="text-sm text-left space-y-2">
                        {plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                    <CardFooter>
                      {plan.id === subscription?.planId ? (
                        <Button fullWidth variant="ghost" disabled>
                          Plano Atual
                        </Button>
                      ) : (
                        <Button fullWidth variant="outline">
                          Selecionar
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Invoices */}
            {invoices.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Histórico de Faturas</h2>
                </CardHeader>
                <CardBody>
                  <DataTable data={invoices} columns={invoiceColumns} isLoading={isLoadingInvoices} />
                </CardBody>
              </Card>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
