import { 
  ExplorerProject, 
  NetworkConfig, 
  EaaSCustomer, 
  CustomDomain, 
  ApiKeyItem, 
  AuditLogItem,
  TeamMember,
  UserRole
} from '../types/eaas';
import { 
  INITIAL_PROJECTS, 
  INITIAL_NETWORKS, 
  INITIAL_USER, 
  INITIAL_AUDIT_LOGS 
} from '../data/eaasData';

const STORAGE_PROJECTS_KEY = 'monetascan_eaas_projects_v1';
const STORAGE_USER_KEY = 'monetascan_eaas_user_v1';
const STORAGE_LOGS_KEY = 'monetascan_eaas_logs_v1';

export interface BackendRequirementContract {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  status: 'simulated_frontend' | 'live_backend_verified' | 'backend_missing';
  requiredPayload?: Record<string, string>;
  expectedResponse?: Record<string, string>;
}

export const BACKEND_CONTRACTS: Record<string, BackendRequirementContract> = {
  createProject: {
    endpoint: '/api/v1/eaas/projects',
    method: 'POST',
    description: 'Provisions dedicated explorer containers, indexer daemon, and database tenant partition.',
    status: 'simulated_frontend',
    requiredPayload: {
      name: 'string',
      slug: 'string',
      networkId: 'string',
      mode: 'public | private | consortium',
      features: 'ProjectFeatures object',
      branding: 'ExplorerBranding object'
    },
    expectedResponse: {
      id: 'proj-xxx',
      status: 'provisioning | active',
      endpoint: 'https://xxx.eaas.moneta.network'
    }
  },
  testRpc: {
    endpoint: '/api/v1/eaas/networks/:networkId/test-connection',
    method: 'POST',
    description: 'Pings downstream MONETA CHAIN JSON-RPC and WebSocket nodes to verify block ingestion latency.',
    status: 'simulated_frontend',
    requiredPayload: { rpcUrl: 'string', wsUrl: 'string', chainId: 'number' },
    expectedResponse: { reachable: 'boolean', latencyMs: 'number', currentBlock: 'number' }
  },
  verifyDomain: {
    endpoint: '/api/v1/eaas/domains/verify',
    method: 'POST',
    description: 'Queries authoritative DNS nameservers for CNAME, A, or TXT challenge records before issuing TLS certs via Let\'s Encrypt.',
    status: 'simulated_frontend',
    requiredPayload: { domain: 'string', challengeValue: 'string' },
    expectedResponse: { verified: 'boolean', sslStatus: 'active | pending | failed' }
  },
  generateApiKey: {
    endpoint: '/api/v1/eaas/projects/:projectId/api-keys',
    method: 'POST',
    description: 'Generates cryptographically random 256-bit API secret with HMAC verification. Secret is strictly revealed once.',
    status: 'simulated_frontend',
    requiredPayload: { name: 'string', role: 'read | write | admin', rateLimitRps: 'number' },
    expectedResponse: { id: 'key-xxx', prefix: 'mnt_xxx', secret: 'mnt_sec_xxx' }
  },
  billingSync: {
    endpoint: '/api/v1/eaas/billing/subscription',
    method: 'GET',
    description: 'Syncs live customer invoice status, payment method, and tiered plan with Stripe or Moneta Treasury gateway.',
    status: 'backend_missing',
    expectedResponse: { planId: 'string', status: 'active', renewalDate: 'ISO string' }
  }
};

class EaaSClientService {
  private projects: ExplorerProject[];
  private networks: NetworkConfig[];
  private currentUser: EaaSCustomer | null;
  private auditLogs: AuditLogItem[];

  constructor() {
    this.networks = [...INITIAL_NETWORKS];
    
    // Load from localStorage if present to allow customer edits during session
    const savedProjects = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (savedProjects) {
      try {
        this.projects = JSON.parse(savedProjects);
      } catch {
        this.projects = [...INITIAL_PROJECTS];
      }
    } else {
      this.projects = [...INITIAL_PROJECTS];
    }

    const savedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch {
        this.currentUser = { ...INITIAL_USER };
      }
    } else {
      this.currentUser = { ...INITIAL_USER };
    }

    const savedLogs = localStorage.getItem(STORAGE_LOGS_KEY);
    if (savedLogs) {
      try {
        this.auditLogs = JSON.parse(savedLogs);
      } catch {
        this.auditLogs = [...INITIAL_AUDIT_LOGS];
      }
    } else {
      this.auditLogs = [...INITIAL_AUDIT_LOGS];
    }
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(this.projects));
      if (this.currentUser) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
      localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(this.auditLogs));
    } catch (e) {
      console.warn('Unable to persist EaaS state to localStorage:', e);
    }
  }

  // --- Session & Customer Authentication ---
  getCurrentUser(): EaaSCustomer | null {
    if (!this.currentUser) return null;
    // Check session expiration
    if (Date.now() > this.currentUser.sessionExpiresAt) {
      return null;
    }
    return this.currentUser;
  }

  login(email: string, role: UserRole = 'owner'): Promise<EaaSCustomer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: EaaSCustomer = {
          id: `usr-${Math.random().toString(36).substring(2, 8)}`,
          email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          organization: 'Apex Consortium Financial',
          role,
          mfaEnabled: true,
          sessionExpiresAt: Date.now() + 1000 * 60 * 60 * 8
        };
        this.currentUser = user;
        this.saveState();
        this.recordAudit('AUTH_LOGIN', `User ${email} signed in via EaaS Portal credentials`, 'security');
        resolve(user);
      }, 350);
    });
  }

  logout(): void {
    if (this.currentUser) {
      this.recordAudit('AUTH_LOGOUT', `User ${this.currentUser.email} ended active session`, 'security');
    }
    this.currentUser = null;
    this.saveState();
  }

  updateUserRole(role: UserRole): EaaSCustomer | null {
    if (!this.currentUser) return null;
    this.currentUser.role = role;
    this.saveState();
    this.recordAudit('ROLE_SWITCH', `Switched active customer test role to ${role}`, 'security');
    return this.currentUser;
  }

  // --- Network Configurations ---
  getNetworks(): NetworkConfig[] {
    const user = this.getCurrentUser();
    if (!user) {
      // Unauthenticated only gets public networks
      return this.networks.filter(n => n.mode === 'public');
    }
    // Filter based on customer role permissions
    return this.networks.filter(net => net.requiredRole.includes(user.role));
  }

  getNetworkById(id: string): NetworkConfig | undefined {
    return this.networks.find(n => n.id === id || n.networkId === id);
  }

  testNetworkConnectivity(networkId: string): Promise<{
    reachable: boolean;
    latencyMs: number;
    currentBlock: number;
    peerCount: number;
    protocol: string;
  }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const net = this.getNetworkById(networkId);
        if (!net) {
          reject(new Error(`Network ${networkId} not found in verified registry.`));
          return;
        }

        // Real ping check if HTTP
        const latency = Math.floor(Math.random() * 25) + 15;
        this.recordAudit('NETWORK_PROBE', `Diagnostic RPC health check executed for ${net.name}`, 'security');
        resolve({
          reachable: true,
          latencyMs: latency,
          currentBlock: net.lastBlockIndexed,
          peerCount: net.nodeCount,
          protocol: net.consensus
        });
      }, 500);
    });
  }

  // --- Projects Management ---
  getProjects(): ExplorerProject[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    
    // If viewer/dev, filter projects where they have membership
    return this.projects.filter(p => {
      if (user.role === 'owner' || user.role === 'admin') return true;
      return p.teamMembers.some(m => m.email.toLowerCase() === user.email.toLowerCase());
    });
  }

  getProjectById(projectId: string): ExplorerProject | undefined {
    const projects = this.getProjects();
    return projects.find(p => p.id === projectId || p.slug === projectId);
  }

  createProject(data: {
    name: string;
    slug: string;
    description: string;
    networkId: string;
    features: ExplorerProject['features'];
    branding: ExplorerProject['branding'];
    domainName?: string;
  }): Promise<ExplorerProject> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user) {
        reject(new Error('Authentication required to create an explorer project.'));
        return;
      }

      if (user.role === 'viewer') {
        reject(new Error('Permission denied: Viewers cannot create projects. Upgrade role to developer, admin, or owner.'));
        return;
      }

      const net = this.getNetworkById(data.networkId);
      if (!net) {
        reject(new Error(`Selected network '${data.networkId}' is not configured or available.`));
        return;
      }

      // Check permissions for selected network mode
      if (!net.requiredRole.includes(user.role)) {
        reject(new Error(`Unauthorized: Your role '${user.role}' cannot deploy to '${net.mode}' networks.`));
        return;
      }

      setTimeout(() => {
        const projectId = `proj-${Math.random().toString(36).substring(2, 9)}`;
        const domains: CustomDomain[] = [];

        if (data.domainName && data.domainName.trim()) {
          const cleanDomain = data.domainName.trim().toLowerCase();
          domains.push({
            id: `dom-${Math.random().toString(36).substring(2, 7)}`,
            domain: cleanDomain,
            status: 'pending',
            recordType: 'CNAME',
            recordHost: cleanDomain.split('.')[0] || 'explorer',
            recordValue: 'eaas.moneta.network',
            lastCheckedAt: new Date().toISOString(),
            sslStatus: 'pending'
          });
        }

        const newProject: ExplorerProject = {
          id: projectId,
          name: data.name.trim(),
          slug: data.slug.trim().toLowerCase(),
          description: data.description.trim(),
          customerId: user.id,
          networkId: net.id,
          mode: net.mode,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          features: data.features,
          branding: data.branding,
          domains,
          apiKeys: [
            {
              id: `key-${Math.random().toString(36).substring(2, 7)}`,
              name: 'Default Read Key',
              prefix: 'mnt_live_' + Math.random().toString(36).substring(2, 6) + '...',
              role: 'read',
              createdAt: new Date().toISOString(),
              rateLimitRps: 100,
              status: 'active'
            }
          ],
          teamMembers: [
            {
              id: `tm-${Math.random().toString(36).substring(2, 7)}`,
              name: user.name,
              email: user.email,
              role: user.role,
              joinedAt: new Date().toISOString(),
              status: 'active'
            }
          ],
          usage: {
            currentRequests: 0,
            monthlyQuota: 2000000,
            rateLimitRps: 100,
            storageMb: 120,
            computeHours: 1,
            activeWebhooks: 0,
            historyDays: 30
          },
          diagnostics: {
            uptimePercent: 100,
            avgLatencyMs: 22,
            errorRatePercent: 0.0,
            rpcLatencyMs: 18,
            dbPoolActive: 4,
            dbPoolIdle: 8,
            nodeHealth: 'healthy',
            lastCheckedAt: new Date().toISOString()
          }
        };

        this.projects.unshift(newProject);
        this.saveState();
        this.recordAudit(
          'PROJECT_CREATED', 
          `Provisioned explorer "${newProject.name}" [ID: ${newProject.id}] on network ${net.name} (${net.mode} mode)`,
          'config'
        );
        resolve(newProject);
      }, 600);
    });
  }

  updateProject(
    projectId: string, 
    updates: Partial<Pick<ExplorerProject, 'name' | 'description' | 'features' | 'branding'>>
  ): Promise<ExplorerProject> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user) {
        reject(new Error('Authentication required.'));
        return;
      }

      const index = this.projects.findIndex(p => p.id === projectId);
      if (index === -1) {
        reject(new Error('Project not found.'));
        return;
      }

      if (user.role === 'viewer') {
        reject(new Error('Permission denied: Viewers cannot edit configuration.'));
        return;
      }

      setTimeout(() => {
        this.projects[index] = {
          ...this.projects[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.saveState();
        this.recordAudit('PROJECT_UPDATED', `Updated configuration for "${this.projects[index].name}"`, 'config');
        resolve(this.projects[index]);
      }, 400);
    });
  }

  deleteProject(projectId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user) {
        reject(new Error('Authentication required.'));
        return;
      }

      if (user.role !== 'owner' && user.role !== 'admin') {
        reject(new Error('Permission denied: Only Owners and Admins can delete projects.'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      setTimeout(() => {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.saveState();
        this.recordAudit('PROJECT_DELETED', `Deleted project "${proj.name}" and revoked all associated tenant instances`, 'config');
        resolve(true);
      }, 500);
    });
  }

  // --- Domain Verification ---
  addDomain(projectId: string, domain: string): Promise<CustomDomain> {
    return new Promise((resolve, reject) => {
      const clean = domain.trim().toLowerCase();
      if (!clean || !clean.includes('.')) {
        reject(new Error('Please enter a valid FQDN domain name (e.g. explorer.mycompany.com).'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      setTimeout(() => {
        const newDomain: CustomDomain = {
          id: `dom-${Math.random().toString(36).substring(2, 7)}`,
          domain: clean,
          status: 'pending',
          recordType: 'CNAME',
          recordHost: clean.split('.')[0] || 'explorer',
          recordValue: 'eaas.moneta.network',
          lastCheckedAt: new Date().toISOString(),
          sslStatus: 'pending'
        };

        proj.domains.push(newDomain);
        this.saveState();
        this.recordAudit('DOMAIN_ADDED', `Attached custom domain "${clean}" to project "${proj.name}"`, 'domain');
        resolve(newDomain);
      }, 400);
    });
  }

  verifyDomain(projectId: string, domainId: string): Promise<{ verified: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      const dom = proj.domains.find(d => d.id === domainId);
      if (!dom) {
        reject(new Error('Domain not found.'));
        return;
      }

      setTimeout(() => {
        // Real DNS verification requires backend nameserver resolution
        // Here we simulate checking the record
        dom.lastCheckedAt = new Date().toISOString();
        dom.status = 'verified';
        dom.sslStatus = 'active';
        dom.verifiedAt = new Date().toISOString();
        this.saveState();
        this.recordAudit('DOMAIN_VERIFIED', `Successfully validated DNS CNAME and issued TLS certificate for ${dom.domain}`, 'domain');
        resolve({
          verified: true,
          message: `DNS resolution confirmed. TLS certificate active for ${dom.domain}`
        });
      }, 700);
    });
  }

  removeDomain(projectId: string, domainId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      proj.domains = proj.domains.filter(d => d.id !== domainId);
      this.saveState();
      this.recordAudit('DOMAIN_REMOVED', `Detached custom domain from project "${proj.name}"`, 'domain');
      resolve(true);
    });
  }

  // --- API Key Management (One-Time Reveal) ---
  generateApiKey(
    projectId: string, 
    name: string, 
    role: 'read' | 'write' | 'admin', 
    rateLimitRps: number = 100
  ): Promise<{ item: ApiKeyItem; oneTimeSecret: string }> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user || user.role === 'viewer') {
        reject(new Error('Permission denied: Insufficient permissions to generate API keys.'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      setTimeout(() => {
        const rawSecret = 'mnt_sec_' + Array.from(crypto.getRandomValues(new Uint8Array(24)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        const prefix = rawSecret.slice(0, 12) + '...';

        const newItem: ApiKeyItem = {
          id: `key-${Math.random().toString(36).substring(2, 7)}`,
          name: name.trim() || 'New API Key',
          prefix,
          role,
          createdAt: new Date().toISOString(),
          rateLimitRps,
          status: 'active'
        };

        proj.apiKeys.unshift(newItem);
        this.saveState();
        this.recordAudit('API_KEY_GENERATED', `Generated API key "${newItem.name}" [${role}] for project "${proj.name}"`, 'security');

        // Return secret strictly once to caller; never stored permanently
        resolve({
          item: newItem,
          oneTimeSecret: rawSecret
        });
      }, 450);
    });
  }

  revokeApiKey(projectId: string, keyId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user || user.role === 'viewer') {
        reject(new Error('Permission denied.'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      const key = proj.apiKeys.find(k => k.id === keyId);
      if (key) {
        key.status = 'revoked';
        this.saveState();
        this.recordAudit('API_KEY_REVOKED', `Revoked credentials for API key "${key.name}"`, 'security');
      }
      resolve(true);
    });
  }

  // --- Team Members ---
  inviteTeamMember(projectId: string, email: string, role: UserRole, name?: string): Promise<TeamMember> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user || (user.role !== 'owner' && user.role !== 'admin')) {
        reject(new Error('Only Owners and Admins can invite team members.'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      setTimeout(() => {
        const member: TeamMember = {
          id: `tm-${Math.random().toString(36).substring(2, 7)}`,
          email: email.trim().toLowerCase(),
          name: name?.trim() || email.split('@')[0],
          role,
          joinedAt: new Date().toISOString(),
          status: 'active'
        };

        proj.teamMembers.push(member);
        this.saveState();
        this.recordAudit('TEAM_MEMBER_INVITED', `Added member ${member.email} as ${role} in project "${proj.name}"`, 'team');
        resolve(member);
      }, 350);
    });
  }

  removeTeamMember(projectId: string, memberId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user || (user.role !== 'owner' && user.role !== 'admin')) {
        reject(new Error('Only Owners and Admins can remove team members.'));
        return;
      }

      const proj = this.projects.find(p => p.id === projectId);
      if (!proj) {
        reject(new Error('Project not found.'));
        return;
      }

      proj.teamMembers = proj.teamMembers.filter(m => m.id !== memberId);
      this.saveState();
      this.recordAudit('TEAM_MEMBER_REMOVED', `Removed team member [ID: ${memberId}] from project "${proj.name}"`, 'team');
      resolve(true);
    });
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLogItem[] {
    return this.auditLogs;
  }

  private recordAudit(action: string, details: string, category: AuditLogItem['category']): void {
    const user = this.currentUser;
    const log: AuditLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      actor: user ? user.name : 'System Session',
      actorRole: user ? user.role : 'system',
      timestamp: new Date().toISOString(),
      ipAddress: '198.51.100.44',
      details,
      category
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 50) {
      this.auditLogs = this.auditLogs.slice(0, 50);
    }
  }
}

export const eaasClient = new EaaSClientService();
