export type NetworkMode = 'public' | 'private' | 'consortium';
export type Environment = 'devnet' | 'testnet' | 'mainnet';
export type ProjectStatus = 'active' | 'provisioning' | 'suspended' | 'degraded';
export type UserRole = 'owner' | 'admin' | 'developer' | 'viewer';

export interface EaaSCustomer {
  id: string;
  email: string;
  name: string;
  organization: string;
  role: UserRole;
  mfaEnabled: boolean;
  avatarUrl?: string;
  sessionExpiresAt: number;
}

export interface NetworkConfig {
  id: string;
  name: string;
  networkId: string;
  mode: NetworkMode;
  environment: Environment;
  rpcUrl: string;
  wsUrl: string;
  chainId: number;
  status: 'connected' | 'degraded' | 'offline';
  indexingStatus: 'synced' | 'indexing' | 'paused' | 'error';
  indexingProgress: number; // 0 to 100
  lastBlockIndexed: number;
  lastSuccessfulUpdate: string;
  requiredRole: UserRole[];
  description: string;
  nodeCount: number;
  consensus: string;
}

export interface ExplorerBranding {
  displayName: string;
  tagline: string;
  logoUrl?: string;
  primaryColor: string;
  themeMode: 'black_minimal' | 'graphite_contrast';
  customCss?: string;
  footerNote: string;
}

export interface CustomDomain {
  id: string;
  domain: string;
  status: 'verified' | 'pending' | 'failed';
  recordType: 'CNAME' | 'A' | 'TXT';
  recordHost: string;
  recordValue: string;
  verifiedAt?: string;
  lastCheckedAt: string;
  sslStatus: 'active' | 'provisioning' | 'pending';
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  role: 'read' | 'write' | 'admin';
  createdAt: string;
  lastUsedAt?: string;
  rateLimitRps: number;
  status: 'active' | 'revoked';
  // Secret is only returned ONCE during creation; never stored permanently in client state
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  joinedAt: string;
  status: 'active' | 'pending';
}

export interface ProjectFeatures {
  tokenExplorer: boolean;
  privacyShieldInspector: boolean;
  zkProofVerification: boolean;
  contractVerification: boolean;
  validatorDirectory: boolean;
  developerSandbox: boolean;
  gasTracker: boolean;
  mempoolViewer: boolean;
}

export interface ProjectUsage {
  currentRequests: number;
  monthlyQuota: number;
  rateLimitRps: number;
  storageMb: number;
  computeHours: number;
  activeWebhooks: number;
  historyDays: number;
}

export interface ProjectDiagnostics {
  uptimePercent: number;
  avgLatencyMs: number;
  errorRatePercent: number;
  rpcLatencyMs: number;
  dbPoolActive: number;
  dbPoolIdle: number;
  nodeHealth: 'healthy' | 'degraded' | 'offline';
  lastCheckedAt: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  timestamp: string;
  ipAddress: string;
  details: string;
  category: 'security' | 'config' | 'team' | 'billing' | 'domain';
}

export interface ExplorerProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  customerId: string;
  networkId: string;
  mode: NetworkMode;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  features: ProjectFeatures;
  branding: ExplorerBranding;
  domains: CustomDomain[];
  apiKeys: ApiKeyItem[];
  teamMembers: TeamMember[];
  usage: ProjectUsage;
  diagnostics: ProjectDiagnostics;
}

export interface BillingPlan {
  id: string;
  name: string;
  tier: 'developer' | 'consortium' | 'enterprise';
  monthlyFee: string;
  includedProjects: number;
  monthlyRequests: number;
  supportLevel: string;
  isCustom: boolean;
  status: 'active' | 'inactive';
}
