import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import Button from './Button';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspace();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname.includes(path);

  const ownerLinks = [
    { path: '/app', label: 'Dashboard', icon: '📊' },
    { path: `/app/${currentWorkspace?.id}/professionals`, label: 'Profissionais', icon: '👥' },
    { path: `/app/${currentWorkspace?.id}/services`, label: 'Serviços', icon: '💈' },
    { path: `/app/${currentWorkspace?.id}/appointments`, label: 'Agendamentos', icon: '📅' },
    { path: `/app/${currentWorkspace?.id}/billing`, label: 'Plano & Pagamentos', icon: '💳' },
    { path: `/app/${currentWorkspace?.id}/settings`, label: 'Configurações', icon: '⚙️' },
  ];

  const professionalLinks = [
    { path: '/app', label: 'Dashboard', icon: '📊' },
    { path: `/app/${currentWorkspace?.id}/appointments`, label: 'Meus Agendamentos', icon: '📅' },
  ];

  const clientLinks = [
    { path: '/app', label: 'Dashboard', icon: '📊' },
    { path: '/app/explore', label: 'Buscar Empresas', icon: '🔍' },
    { path: '/app/appointments', label: 'Meus Agendamentos', icon: '📅' },
  ];

  const links = user?.role === 'owner' ? ownerLinks : user?.role === 'professional' ? professionalLinks : clientLinks;

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold">Agendamentos</span>
        </Link>
      </div>

      {user?.role === 'owner' && workspaces.length > 1 && (
        <div className="p-4 border-b border-gray-800">
          <label className="text-xs text-gray-400 mb-2 block">Empresa</label>
          <select
            value={currentWorkspace?.id || ''}
            onChange={(e) => {
              const workspace = workspaces.find((w) => w.id === e.target.value);
              if (workspace) {
                setCurrentWorkspace(workspace);
                navigate('/app');
              }
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive(link.path) && location.pathname === link.path
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-3">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <Button variant="secondary" size="sm" fullWidth onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
