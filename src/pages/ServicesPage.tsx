import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/Modal';
import Input from '../components/Input';
import { servicesApi } from '../api/services';
import type { Service } from '../types';

export default function ServicesPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadServices();
  }, [workspaceId]);

  const loadServices = async () => {
    if (!workspaceId) return;

    try {
      const data = await servicesApi.list(workspaceId);
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
            <p className="text-gray-600 mt-1">Gerencie os serviços oferecidos</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            Adicionar Serviço
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 mb-4">Nenhum serviço cadastrado</p>
              <Button onClick={() => setIsModalOpen(true)}>
                Adicionar Primeiro Serviço
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} hoverable>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                </CardHeader>
                <CardBody>
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">
                        R$ {service.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">{service.duration} minutos</p>
                    </div>
                    {service.requiresPayment && (
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Pagamento Online
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader onClose={() => setIsModalOpen(false)}>
            Adicionar Serviço
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input label="Nome do serviço" required placeholder="Ex: Corte de cabelo" />
              <Input label="Preço (R$)" type="number" required placeholder="0.00" />
              <Input label="Duração (minutos)" type="number" required placeholder="60" />
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Requer pagamento antecipado</span>
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Salvar Serviço
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </AppLayout>
  );
}
