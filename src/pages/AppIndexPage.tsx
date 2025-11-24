import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import AppLayout from '../components/AppLayout';

export default function AppIndexPage() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'client') {
      navigate('/app/explore');
    } else if (currentWorkspace) {
      navigate(`/app/${currentWorkspace.id}/dashboard`);
    }
  }, [user, currentWorkspace, navigate]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    </AppLayout>
  );
}
