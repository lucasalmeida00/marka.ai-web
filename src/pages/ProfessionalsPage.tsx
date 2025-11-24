import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/Modal';
import Input from '../components/Input';
import { professionalsApi } from '../api/professionals';
import type { Professional } from '../types';

export default function ProfessionalsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadProfessionals();
  }, [workspaceId]);

  const loadProfessionals = async () => {
    if (!workspaceId) return;

    try {
      const data = await professionalsApi.list(workspaceId);
      setProfessionals(data);
    } catch (error) {
      console.error('Failed to load professionals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>
            <p className="text-gray-600 mt-1">Gerencie os profissionais da sua empresa</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            Adicionar Profissional
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : professionals.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 mb-4">Nenhum profissional cadastrado</p>
              <Button onClick={() => setIsModalOpen(true)}>
                Adicionar Primeiro Profissional
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <Card key={professional.id} hoverable>
                <CardBody>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                      👤
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
                    {professional.bio && (
                      <p className="text-sm text-gray-600 mt-2">{professional.bio}</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader onClose={() => setIsModalOpen(false)}>
            Adicionar Profissional
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input label="Nome" required placeholder="Nome do profissional" />
              <Input label="Email" type="email" required placeholder="email@exemplo.com" />
              <p className="text-sm text-gray-600">
                Um convite será enviado para o email cadastrado
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Enviar Convite
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </AppLayout>
  );
}
