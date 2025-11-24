import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card, { CardBody, CardFooter, CardHeader } from '../components/Card';
import { usePlans, useCreateCheckoutSession } from '../hooks/api';
import { useWorkspace } from '../context/WorkspaceContext';

export default function OnboardingPlanPage() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Usando o hook customizado para buscar planos
  const { data: plans = [], isLoading: loadingPlans } = usePlans();

  // Usando o hook customizado para criar sessão de checkout
  const createCheckoutSession = useCreateCheckoutSession();

  const handleSelectPlan = async (planId: string) => {
    if (!currentWorkspace) return;

    setSelectedPlan(planId);

    try {
      const plan = plans.find((p) => p.id === planId);

      if (plan && plan.price > 0) {
        const response = await createCheckoutSession.mutateAsync({
          workspaceId: currentWorkspace.id,
          planId,
          successUrl: `${window.location.origin}/app`,
          cancelUrl: `${window.location.origin}/onboarding/plan`,
        });

        window.location.href = response.checkoutUrl;
      } else {
        navigate('/app');
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      setSelectedPlan(null);
    }
  };

  if (loadingPlans) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Escolha seu plano
          </h2>
          <p className="mt-2 text-gray-600">
            Passo 2 de 2: Selecione o plano ideal para seu negócio
          </p>
          <p className="mt-1 text-sm text-gray-500">
            14 dias grátis, sem cartão de crédito
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <Card key={plan.id} className={selectedPlan === plan.id ? 'border-2 border-primary-500' : ''}>
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-1">{plan.description}</p>
              </CardHeader>
              <CardBody className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.interval === 'monthly' ? 'mês' : 'ano'}</span>
                </div>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  fullWidth
                  variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                  onClick={() => handleSelectPlan(plan.id)}
                  isLoading={createCheckoutSession.isPending && selectedPlan === plan.id}
                  disabled={createCheckoutSession.isPending}
                >
                  {plan.price === 0 ? 'Começar Grátis' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/app')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Pular por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}
