import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'owner' | 'client'>('owner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole: 'owner' | 'client') => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);

      if (role === 'owner') {
        navigate('/onboarding/workspace');
      } else {
        navigate('/app');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            entre na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
                Como você vai usar o Agendamentos?
              </h3>

              <button
                onClick={() => handleRoleSelect('owner')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💼</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Tenho um negócio
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Sou dono de salão, barbearia, clínica ou outro negócio com agendamentos
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('client')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Sou cliente
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Quero agendar serviços em salões, barbearias, clínicas, etc.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleRegister}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Nome completo"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />

              <Input
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />

              <Input
                label="Senha"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                helperText="Mínimo de 6 caracteres"
              />

              <Input
                label="Confirmar senha"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />

              <Button type="submit" fullWidth isLoading={isLoading}>
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
