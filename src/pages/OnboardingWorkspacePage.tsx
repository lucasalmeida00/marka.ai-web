import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { workspacesApi } from '../api/workspaces';
import { useWorkspace } from '../context/WorkspaceContext';

export default function OnboardingWorkspacePage() {
  const navigate = useNavigate();
  const { refreshWorkspaces } = useWorkspace();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    segment: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name' && !formData.slug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await workspacesApi.create(formData);
      await refreshWorkspaces();
      navigate('/onboarding/plan');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar empresa. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Configure sua empresa
          </h2>
          <p className="mt-2 text-gray-600">
            Passo 1 de 2: Informações da sua empresa
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Nome da empresa"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Barbearia do João"
            />

            <Input
              label="URL personalizada"
              name="slug"
              type="text"
              required
              value={formData.slug}
              onChange={handleChange}
              placeholder="barbearia-do-joao"
              helperText={`Sua página será: agendamentos.com/${formData.slug || 'sua-empresa'}`}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Segmento <span className="text-red-500">*</span>
              </label>
              <select
                name="segment"
                required
                value={formData.segment}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Selecione...</option>
                <option value="barbearia">Barbearia</option>
                <option value="salao-beleza">Salão de Beleza</option>
                <option value="estetica">Estética</option>
                <option value="manicure">Manicure/Pedicure</option>
                <option value="massagem">Massagem</option>
                <option value="personal">Personal Trainer</option>
                <option value="clinica">Clínica</option>
                <option value="consultorio">Consultório</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <Input
              label="Cidade"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="São Paulo - SP"
            />

            <Input
              label="Endereço"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua, número, bairro"
            />

            <Input
              label="Telefone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />

            <Input
              label="Email de contato"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contato@empresa.com"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Conte um pouco sobre sua empresa..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" isLoading={isLoading}>
                Continuar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
