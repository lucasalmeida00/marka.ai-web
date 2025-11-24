import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Workspace } from '../types';
import { workspacesApi } from '../api/workspaces';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await workspacesApi.list();
      setWorkspaces(data);

      const savedWorkspaceId = localStorage.getItem('current_workspace_id');
      if (savedWorkspaceId) {
        const workspace = data.find((w) => w.id === savedWorkspaceId);
        if (workspace) {
          setCurrentWorkspaceState(workspace);
        }
      } else if (data.length > 0) {
        setCurrentWorkspaceState(data[0]);
        localStorage.setItem('current_workspace_id', data[0].id);
      }
    } catch (error) {
      console.error('Failed to load workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrentWorkspace = (workspace: Workspace | null) => {
    setCurrentWorkspaceState(workspace);
    if (workspace) {
      localStorage.setItem('current_workspace_id', workspace.id);
    } else {
      localStorage.removeItem('current_workspace_id');
    }
  };

  const refreshWorkspaces = async () => {
    await loadWorkspaces();
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        isLoading,
        setCurrentWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
