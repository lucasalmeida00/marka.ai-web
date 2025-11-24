import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { workspacesApi } from '../api/workspaces';
import { useWorkspace } from '../context/WorkspaceContext';
import type { Workspace } from '../types';

export default function SettingsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { refreshWorkspaces } = useWorkspace();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    loadWorkspace();
  }, [workspaceId]);

  const loadWorkspace = async () => {
    if (!workspaceId) return;

    try {
      const data = await workspacesApi.get(workspaceId);
      setWorkspace(data);
      setFormData({
        name: data.name,
        description: data.description || '',
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        city: data.city || '',
      });
    } catch (error) {
      console.error('Failed to load workspace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) return;

    setIsSaving(true);
    try {
      await workspacesApi.update(workspaceId, formData);
      await refreshWorkspaces();
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Failed to update workspace:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie as informações da sua empresa</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Informações Gerais</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Nome da Empresa"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <Input
                  label="Telefone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Endereço"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <Input
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </CardBody>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="submit" isLoading={isSaving}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        )}
      </div>
    </AppLayout>
  );
}
