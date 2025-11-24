import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import Input from '../components/Input';
import { useRegister } from '../hooks/api/useAuth';
import { registerSchema, type RegisterInput } from '../schemas/auth.schema';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'owner' | 'client'>('owner');

  const { mutate: register, isPending } = useRegister();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'owner',
    },
  });

  const handleRoleSelect = (selectedRole: 'owner' | 'client') => {
    setRole(selectedRole);
    setStep(2);
  };

  const onSubmit = (data: RegisterInput) => {
    register(
      { ...data, role },
      {
        onSuccess: () => {
          if (role === 'owner') {
            navigate('/onboarding/workspace');
          } else {
            navigate('/app');
          }
        },
        onError: (error: any) => {
          setError('root', {
            message: error.response?.data?.message || 'Erro ao criar conta. Tente novamente.',
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <div className="w-12 h-12 bg-primary-600 dark:bg-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ou{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            entre na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center mb-6">
                Como você vai usar o Agendamentos?
              </h3>

              <button
                onClick={() => handleRoleSelect('owner')}
                className="w-full p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all text-left"
              >
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💼</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Tenho um negócio
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Sou dono de salão, barbearia, clínica ou outro negócio com agendamentos
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('client')}
                className="w-full p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all text-left"
              >
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Sou cliente
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Quero agendar serviços em salões, barbearias, clínicas, etc.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>

              {errors.root && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {errors.root.message}
                </div>
              )}

              <Input
                label="Nome completo"
                type="text"
                required
                {...formRegister('name')}
                error={errors.name?.message}
                placeholder="Seu nome"
              />

              <Input
                label="Email"
                type="email"
                required
                {...formRegister('email')}
                error={errors.email?.message}
                placeholder="seu@email.com"
              />

              <Input
                label="Senha"
                type="password"
                required
                {...formRegister('password')}
                error={errors.password?.message}
                placeholder="••••••••"
                helperText="Mínimo de 6 caracteres"
              />

              <Input
                label="Confirmar senha"
                type="password"
                required
                {...formRegister('confirmPassword')}
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
              />

              <Button type="submit" fullWidth isLoading={isPending}>
                Criar Conta
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Ao criar uma conta, você concorda com nossos{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Política de Privacidade
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
