import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card, { CardBody, CardFooter, CardHeader } from '../components/Card';

export default function LandingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 49',
      interval: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Até 2 profissionais',
        'Até 100 agendamentos/mês',
        'Agenda online pública',
        'Lembretes automáticos',
        'Suporte por email',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: 'R$ 99',
      interval: '/mês',
      description: 'Para negócios em crescimento',
      features: [
        'Até 5 profissionais',
        'Agendamentos ilimitados',
        'Agenda online pública',
        'Lembretes automáticos',
        'Pagamentos online',
        'Relatórios avançados',
        'Suporte prioritário',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 'R$ 199',
      interval: '/mês',
      description: 'Para grandes operações',
      features: [
        'Profissionais ilimitados',
        'Agendamentos ilimitados',
        'Agenda online pública',
        'Lembretes automáticos',
        'Pagamentos online',
        'Relatórios avançados',
        'API de integração',
        'Suporte 24/7',
        'Marca personalizada',
      ],
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: '📅',
      title: 'Agenda Organizada',
      description: 'Visualize todos os seus agendamentos em um só lugar, com calendário intuitivo e fácil de usar.',
    },
    {
      icon: '🔔',
      title: 'Lembretes Automáticos',
      description: 'Reduza faltas com lembretes automáticos enviados por email e SMS aos seus clientes.',
    },
    {
      icon: '💳',
      title: 'Pagamentos Online',
      description: 'Receba pagamentos antecipados diretamente pelo sistema, garantindo compromisso dos clientes.',
    },
    {
      icon: '🌐',
      title: 'Agenda Pública',
      description: 'Seus clientes agendam online 24/7, sem precisar ligar ou enviar mensagens.',
    },
    {
      icon: '📊',
      title: 'Relatórios Completos',
      description: 'Acompanhe o desempenho do seu negócio com relatórios detalhados e métricas importantes.',
    },
    {
      icon: '🎯',
      title: 'Multi-Segmento',
      description: 'Funciona para barbearias, salões, clínicas, academias, consultórios e muito mais.',
    },
  ];

  const faqs = [
    {
      question: 'Como funciona o período de teste?',
      answer: 'Você tem 14 dias grátis para testar todas as funcionalidades do plano escolhido, sem compromisso.',
    },
    {
      question: 'Posso mudar de plano depois?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.',
    },
    {
      question: 'Os pagamentos online são seguros?',
      answer: 'Sim, utilizamos as melhores plataformas de pagamento do mercado com certificação PCI-DSS.',
    },
    {
      question: 'Funciona no celular?',
      answer: 'Perfeitamente! Nossa plataforma é 100% responsiva e funciona em qualquer dispositivo.',
    },
    {
      question: 'Preciso de conhecimento técnico?',
      answer: 'Não! A plataforma foi desenvolvida para ser extremamente simples e intuitiva.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Transforme seu negócio com
            <span className="text-primary-600 dark:text-primary-400"> agendamentos online</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Plataforma completa para gerenciar agendamentos, profissionais, pagamentos e muito mais.
            Perfeito para barbearias, salões, clínicas, academias e qualquer negócio com hora marcada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" variant="primary">
                Começar Grátis por 14 dias
              </Button>
            </Link>
            <a href="#planos">
              <Button size="lg" variant="outline">
                Ver Planos
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Não é necessário cartão de crédito para testar
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Recursos pensados para facilitar o dia a dia do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Sem taxas ocultas, sem surpresas. Cancele quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={plan.popular ? 'border-2 border-primary-500 relative' : ''}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    Mais Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{plan.description}</p>
                </CardHeader>
                <CardBody className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.interval}</span>
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
                  <Link to="/register" className="w-full block">
                    <Button
                      fullWidth
                      variant={plan.popular ? 'primary' : 'outline'}
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tire suas dúvidas sobre a plataforma
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardBody>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Junte-se a centenas de profissionais que já transformaram seus negócios
          </p>
          <Link to="/register">
            <Button variant="outline" size="lg" className="bg-white border-white text-primary-600 hover:bg-gray-100">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Agendamentos</h3>
              <p className="text-sm">
                Plataforma completa de agendamentos online para profissionais e empresas.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#beneficios" className="hover:text-white">Recursos</a></li>
                <li><a href="#planos" className="hover:text-white">Planos</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Acesso</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-white">Entrar</Link></li>
                <li><Link to="/register" className="hover:text-white">Criar conta</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Agendamentos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
