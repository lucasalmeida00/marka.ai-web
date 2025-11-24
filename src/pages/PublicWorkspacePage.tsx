import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { workspacesApi } from '../api/workspaces';
import { professionalsApi } from '../api/professionals';
import { servicesApi } from '../api/services';
import type { Workspace, Professional, Service } from '../types';
import Button from '../components/Button';
import Card, { CardBody } from '../components/Card';

export default function PublicWorkspacePage() {
  const { slug } = useParams<{ slug: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadWorkspaceData();
    }
  }, [slug]);

  const loadWorkspaceData = async () => {
    if (!slug) return;

    setIsLoading(true);
    try {
      const workspaceData = await workspacesApi.getBySlug(slug);
      setWorkspace(workspaceData);

      const [professionalsData, servicesData] = await Promise.all([
        professionalsApi.list(workspaceData.id),
        servicesApi.list(workspaceData.id),
      ]);

      setProfessionals(professionalsData);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load workspace data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Empresa não encontrada</h1>
          <p className="text-gray-600">A empresa que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            {workspace.logo ? (
              <img src={workspace.logo} alt={workspace.name} className="w-16 h-16 rounded-lg" />
            ) : (
              <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {workspace.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
              {workspace.description && (
                <p className="text-gray-600">{workspace.description}</p>
              )}
            </div>
          </div>

          {workspace.address && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {workspace.address}
              {workspace.city && `, ${workspace.city}`}
            </div>
          )}

          {workspace.phone && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {workspace.phone}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Serviços</h2>
          {services.length === 0 ? (
            <p className="text-gray-500">Nenhum serviço disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardBody>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Duração: {service.duration} min</p>
                        <p className="text-lg font-bold text-primary-600">
                          R$ {service.price.toFixed(2)}
                        </p>
                      </div>
                      <Button size="sm">Agendar</Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Professionals Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profissionais</h2>
          {professionals.length === 0 ? (
            <p className="text-gray-500">Nenhum profissional cadastrado no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((professional) => (
                <Card key={professional.id}>
                  <CardBody>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                        <p className="text-sm text-gray-600">{professional.bio}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" fullWidth>
                      Ver Horários
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
