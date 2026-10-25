import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  ExplorerProject, 
  NetworkConfig, 
  EaaSCustomer, 
  AuditLogItem, 
  UserRole 
} from '../types/eaas';
import { eaasClient } from '../services/eaasClient';

interface EaaSContextType {
  user: EaaSCustomer | null;
  projects: ExplorerProject[];
  currentProject: ExplorerProject | null;
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  networks: NetworkConfig[];
  auditLogs: AuditLogItem[];
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  refreshState: () => void;
  createProject: (data: Parameters<typeof eaasClient.createProject>[0]) => Promise<ExplorerProject>;
  updateProject: (id: string, updates: Parameters<typeof eaasClient.updateProject>[1]) => Promise<ExplorerProject>;
  deleteProject: (id: string) => Promise<boolean>;
}

const EaaSContext = createContext<EaaSContextType | undefined>(undefined);

export function EaaSProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EaaSCustomer | null>(() => eaasClient.getCurrentUser());
  const [projects, setProjects] = useState<ExplorerProject[]>(() => eaasClient.getProjects());
  const [currentProjectId, setCurrentProjectIdState] = useState<string | null>(() => {
    const list = eaasClient.getProjects();
    return list.length > 0 ? list[0].id : null;
  });
  const [networks, setNetworks] = useState<NetworkConfig[]>(() => eaasClient.getNetworks());
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => eaasClient.getAuditLogs());
  const [isLoading, setIsLoading] = useState(false);

  const refreshState = useCallback(() => {
    const u = eaasClient.getCurrentUser();
    setUser(u);
    const p = eaasClient.getProjects();
    setProjects(p);
    setNetworks(eaasClient.getNetworks());
    setAuditLogs(eaasClient.getAuditLogs());

    if (currentProjectId && !p.some(item => item.id === currentProjectId)) {
      setCurrentProjectIdState(p.length > 0 ? p[0].id : null);
    }
  }, [currentProjectId]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const currentProject = projects.find(p => p.id === currentProjectId) || (projects.length > 0 ? projects[0] : null);

  const setCurrentProjectId = (id: string | null) => {
    setCurrentProjectIdState(id);
  };

  const login = async (email: string, role: UserRole = 'owner') => {
    setIsLoading(true);
    try {
      await eaasClient.login(email, role);
      refreshState();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    eaasClient.logout();
    refreshState();
  };

  const switchRole = (role: UserRole) => {
    eaasClient.updateUserRole(role);
    refreshState();
  };

  const createProject = async (data: Parameters<typeof eaasClient.createProject>[0]) => {
    setIsLoading(true);
    try {
      const created = await eaasClient.createProject(data);
      refreshState();
      setCurrentProjectIdState(created.id);
      return created;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, updates: Parameters<typeof eaasClient.updateProject>[1]) => {
    setIsLoading(true);
    try {
      const updated = await eaasClient.updateProject(id, updates);
      refreshState();
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await eaasClient.deleteProject(id);
      refreshState();
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EaaSContext.Provider value={{
      user,
      projects,
      currentProject,
      currentProjectId,
      setCurrentProjectId,
      networks,
      auditLogs,
      isLoading,
      login,
      logout,
      switchRole,
      refreshState,
      createProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </EaaSContext.Provider>
  );
}

export function useEaaS() {
  const context = useContext(EaaSContext);
  if (!context) {
    throw new Error('useEaaS must be used within an EaaSProvider');
  }
  return context;
}
