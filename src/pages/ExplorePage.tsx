import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Card, { CardBody } from '../components/Card';
import Input from '../components/Input';
import { workspacesApi } from '../api/workspaces';
import type { Workspace } from '../types';

export default function ExplorePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await workspacesApi.list();
      setWorkspaces(data);
    } catch (error) {
      console.error('Failed to load workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase()) ||
    workspace.segment?.toLowerCase().includes(search.toLowerCase()) ||
    workspace.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explorar</h1>
          <p className="text-gray-600 mt-1">Encontre e agende com profissionais</p>
        </div>

        <Input
          placeholder="Buscar por nome, segmento ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredWorkspaces.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600">Nenhuma empresa encontrada</p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <Card key={workspace.id} hoverable>
                <CardBody>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                      {workspace.logo ? (
                        <img src={workspace.logo} alt={workspace.name} className="rounded-full" />
                      ) : (
                        '🏢'
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{workspace.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{workspace.segment}</p>
                    {workspace.city && (
                      <p className="text-sm text-gray-500 mt-1">📍 {workspace.city}</p>
                    )}
                    {workspace.description && (
                      <p className="text-sm text-gray-600 mt-2">{workspace.description}</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
