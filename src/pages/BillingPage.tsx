import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardFooter, CardHeader } from '../components/Card';
import Button from '../components/Button';
import { billingApi } from '../api/billing';
import type { Plan, Subscription, Invoice } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function BillingPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [workspaceId]);

  const loadData = async () => {
    if (!workspaceId) return;

    try {
      const [plansData, subscriptionData, invoicesData] = await Promise.all([
        billingApi.listPlans(),
        billingApi.getSubscription(workspaceId).catch(() => null),
        billingApi.listInvoices(workspaceId).catch(() => []),
      ]);

      setPlans(plansData);
      setSubscription(subscriptionData);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Failed to load billing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = plans.find((p) => p.id === subscription?.planId);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plano e Pagamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie seu plano e histórico de pagamentos</p>
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
                <h2 className="text-xl font-semibold text-gray-900">Plano Atual</h2>
              </CardHeader>
              <CardBody>
                {currentPlan ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                      <p className="text-gray-600 mt-1">{currentPlan.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {subscription && (
                          <>
                            Próxima cobrança: {format(new Date(subscription.currentPeriodEnd), 'dd/MM/yyyy', { locale: ptBR })}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-600">
                        R$ {currentPlan.price}
                      </p>
                      <p className="text-gray-600">/{currentPlan.interval === 'monthly' ? 'mês' : 'ano'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Nenhum plano ativo</p>
                )}
              </CardBody>
              <CardFooter>
                <Button variant="outline">Alterar Plano</Button>
              </CardFooter>
            </Card>

            {/* Available Plans */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Planos Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={plan.id === subscription?.planId ? 'border-2 border-primary-500' : ''}>
                    <CardHeader className="text-center">
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600 mt-1">{plan.description}</p>
                    </CardHeader>
                    <CardBody className="text-center">
                      <p className="text-3xl font-bold text-gray-900 mb-4">
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
                  <h2 className="text-xl font-semibold text-gray-900">Histórico de Faturas</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            R$ {invoice.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Vencimento: {format(new Date(invoice.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                          {invoice.status === 'paid' ? 'Pago' : invoice.status === 'pending' ? 'Pendente' : 'Falhou'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
