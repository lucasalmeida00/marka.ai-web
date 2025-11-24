import type { ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import Button from './Button';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = user?.role === 'owner' || user?.role === 'professional' ? [
    { name: 'Dashboard', path: `/app/${workspaceId}/dashboard`, icon: '📊' },
    { name: 'Agendamentos', path: `/app/${workspaceId}/appointments`, icon: '📅' },
    ...(user?.role === 'owner' ? [
      { name: 'Profissionais', path: `/app/${workspaceId}/professionals`, icon: '👥' },
      { name: 'Serviços', path: `/app/${workspaceId}/services`, icon: '✂️' },
      { name: 'Plano', path: `/app/${workspaceId}/billing`, icon: '💳' },
      { name: 'Configurações', path: `/app/${workspaceId}/settings`, icon: '⚙️' },
    ] : []),
  ] : [
    { name: 'Explorar', path: '/app/explore', icon: '🔍' },
    { name: 'Meus Agendamentos', path: '/app/my-appointments', icon: '📅' },
    { name: 'Perfil', path: '/app/profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 w-full z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/app" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 dark:bg-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Agendamentos</span>
            </Link>

            <div className="flex items-center space-x-4">
              {(user?.role === 'owner' || user?.role === 'professional') && workspaces.length > 1 && (
                <select
                  value={currentWorkspace?.id || ''}
                  onChange={(e) => {
                    const workspace = workspaces.find((w) => w.id === e.target.value);
                    if (workspace) {
                      setCurrentWorkspace(workspace);
                      navigate(`/app/${workspace.id}/dashboard`);
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                >
                  {workspaces.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 bottom-0 top-16 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="flex justify-around">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
