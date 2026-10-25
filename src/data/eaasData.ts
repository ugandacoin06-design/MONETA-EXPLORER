import { 
  NetworkConfig, 
  ExplorerProject, 
  EaaSCustomer, 
  BillingPlan, 
  AuditLogItem 
} from '../types/eaas';

export const INITIAL_NETWORKS: NetworkConfig[] = [
  {
    id: 'net-public-stage',
    name: 'MONETA Public Devnet',
    networkId: 'moneta-devnet-01',
    mode: 'public',
    environment: 'devnet',
    rpcUrl: 'http://localhost:8545',
    wsUrl: 'ws://localhost:8546',
    chainId: 13371,
    status: 'connected',
    indexingStatus: 'synced',
    indexingProgress: 100,
    lastBlockIndexed: 1459203,
    lastSuccessfulUpdate: '2026-10-25T01:25:00Z',
    requiredRole: ['viewer', 'developer', 'admin', 'owner'],
    description: 'Public testnet environment for decentralized application developers and public transaction verification.',
    nodeCount: 16,
    consensus: 'PBFT + ZK Rollup'
  },
  {
    id: 'net-consortium-alpha',
    name: 'MONETA Consortium Network',
    networkId: 'moneta-consortium-core',
    mode: 'consortium',
    environment: 'testnet',
    rpcUrl: 'https://consortium-rpc.moneta.internal',
    wsUrl: 'wss://consortium-ws.moneta.internal',
    chainId: 13372,
    status: 'connected',
    indexingStatus: 'synced',
    indexingProgress: 99.8,
    lastBlockIndexed: 894102,
    lastSuccessfulUpdate: '2026-10-25T01:24:12Z',
    requiredRole: ['developer', 'admin', 'owner'],
    description: 'Restricted multi-institution ledger for banking partners, certified validators, and accredited settlement nodes.',
    nodeCount: 24,
    consensus: 'Authorized PBFT Cluster'
  },
  {
    id: 'net-private-sovereign',
    name: 'MONETA Private Sovereign Vault',
    networkId: 'moneta-vault-pvt',
    mode: 'private',
    environment: 'mainnet',
    rpcUrl: 'https://vault-node-01.private.moneta.internal:9443',
    wsUrl: 'wss://vault-node-01.private.moneta.internal:9444',
    chainId: 13373,
    status: 'connected',
    indexingStatus: 'synced',
    indexingProgress: 100,
    lastBlockIndexed: 412090,
    lastSuccessfulUpdate: '2026-10-25T01:22:45Z',
    requiredRole: ['admin', 'owner'],
    description: 'Strictly isolated sovereign cluster using recursive zero-knowledge shielding for proprietary treasury assets.',
    nodeCount: 7,
    consensus: 'Zero-Knowledge Proof Attestation'
  }
];

export const INITIAL_USER: EaaSCustomer = {
  id: 'usr-customer-001',
  email: 'enterprise-lead@moneta-consortium.org',
  name: 'Marcus Vance',
  organization: 'Apex Consortium Financial',
  role: 'owner',
  mfaEnabled: true,
  avatarUrl: '',
  sessionExpiresAt: Date.now() + 1000 * 60 * 60 * 8 // 8 hours valid session
};

export const INITIAL_PROJECTS: ExplorerProject[] = [
  {
    id: 'proj-moneta-global',
    name: 'Moneta Community Explorer',
    slug: 'moneta-community',
    description: 'Primary public-facing block and transaction browser for ecosystem dApps and token holders.',
    customerId: 'usr-customer-001',
    networkId: 'net-public-stage',
    mode: 'public',
    status: 'active',
    createdAt: '2026-08-14T10:00:00Z',
    updatedAt: '2026-10-20T16:45:00Z',
    features: {
      tokenExplorer: true,
      privacyShieldInspector: false,
      zkProofVerification: true,
      contractVerification: true,
      validatorDirectory: true,
      developerSandbox: true,
      gasTracker: true,
      mempoolViewer: false
    },
    branding: {
      displayName: 'MONETASCAN Community',
      tagline: 'Visible Truth. Community Transparency.',
      primaryColor: '#1677FF',
      themeMode: 'black_minimal',
      footerNote: 'Hosted on MONETA Explorer as a Service Cloud'
    },
    domains: [
      {
        id: 'dom-001',
        domain: 'explorer.moneta-community.org',
        status: 'verified',
        recordType: 'CNAME',
        recordHost: 'explorer',
        recordValue: 'eaas.moneta.network',
        verifiedAt: '2026-08-15T09:12:00Z',
        lastCheckedAt: '2026-10-25T00:00:00Z',
        sslStatus: 'active'
      }
    ],
    apiKeys: [
      {
        id: 'key-001',
        name: 'Frontend dApp Read Only',
        prefix: 'mnt_live_9a4f...',
        role: 'read',
        createdAt: '2026-08-14T10:30:00Z',
        lastUsedAt: '2026-10-25T01:15:00Z',
        rateLimitRps: 150,
        status: 'active'
      }
    ],
    teamMembers: [
      {
        id: 'tm-001',
        name: 'Marcus Vance',
        email: 'enterprise-lead@moneta-consortium.org',
        role: 'owner',
        joinedAt: '2026-08-14T10:00:00Z',
        status: 'active'
      },
      {
        id: 'tm-002',
        name: 'Sarah Chen',
        email: 's.chen@apex-financial.com',
        role: 'admin',
        joinedAt: '2026-08-16T11:20:00Z',
        status: 'active'
      }
    ],
    usage: {
      currentRequests: 421890,
      monthlyQuota: 2000000,
      rateLimitRps: 150,
      storageMb: 1420,
      computeHours: 720,
      activeWebhooks: 4,
      historyDays: 90
    },
    diagnostics: {
      uptimePercent: 99.98,
      avgLatencyMs: 38,
      errorRatePercent: 0.02,
      rpcLatencyMs: 24,
      dbPoolActive: 12,
      dbPoolIdle: 8,
      nodeHealth: 'healthy',
      lastCheckedAt: '2026-10-25T01:25:00Z'
    }
  },
  {
    id: 'proj-apex-consortium',
    name: 'Apex Consortium Ledger View',
    slug: 'apex-consortium',
    description: 'Confidential auditor portal with institutional settlement inspection and PBFT proof verification.',
    customerId: 'usr-customer-001',
    networkId: 'net-consortium-alpha',
    mode: 'consortium',
    status: 'active',
    createdAt: '2026-09-02T14:15:00Z',
    updatedAt: '2026-10-22T08:30:00Z',
    features: {
      tokenExplorer: true,
      privacyShieldInspector: true,
      zkProofVerification: true,
      contractVerification: true,
      validatorDirectory: true,
      developerSandbox: false,
      gasTracker: true,
      mempoolViewer: true
    },
    branding: {
      displayName: 'APEX SCAN Consortium',
      tagline: 'Institutional Settlement & Audit Provenance',
      primaryColor: '#10B981',
      themeMode: 'black_minimal',
      footerNote: 'Restricted Consortium Distribution. Authorized personnel only.'
    },
    domains: [
      {
        id: 'dom-002',
        domain: 'scan.apex-consortium.internal',
        status: 'verified',
        recordType: 'A',
        recordHost: 'scan',
        recordValue: '10.240.18.91',
        verifiedAt: '2026-09-03T11:00:00Z',
        lastCheckedAt: '2026-10-25T00:30:00Z',
        sslStatus: 'active'
      }
    ],
    apiKeys: [
      {
        id: 'key-002',
        name: 'Apex Gateway Service Key',
        prefix: 'mnt_consort_c7b2...',
        role: 'write',
        createdAt: '2026-09-02T15:00:00Z',
        lastUsedAt: '2026-10-25T01:10:00Z',
        rateLimitRps: 300,
        status: 'active'
      }
    ],
    teamMembers: [
      {
        id: 'tm-001',
        name: 'Marcus Vance',
        email: 'enterprise-lead@moneta-consortium.org',
        role: 'owner',
        joinedAt: '2026-09-02T14:15:00Z',
        status: 'active'
      },
      {
        id: 'tm-003',
        name: 'David K. Ross',
        email: 'compliance@apex-financial.com',
        role: 'viewer',
        joinedAt: '2026-09-10T16:00:00Z',
        status: 'active'
      }
    ],
    usage: {
      currentRequests: 1184920,
      monthlyQuota: 5000000,
      rateLimitRps: 300,
      storageMb: 3840,
      computeHours: 720,
      activeWebhooks: 12,
      historyDays: 365
    },
    diagnostics: {
      uptimePercent: 100.0,
      avgLatencyMs: 19,
      errorRatePercent: 0.0,
      rpcLatencyMs: 14,
      dbPoolActive: 22,
      dbPoolIdle: 14,
      nodeHealth: 'healthy',
      lastCheckedAt: '2026-10-25T01:24:12Z'
    }
  },
  {
    id: 'proj-zk-vault-pvt',
    name: 'Sovereign Treasury Explorer',
    slug: 'sovereign-vault',
    description: 'Dedicated zero-knowledge private explorer with circuit proof verification for proprietary reserves.',
    customerId: 'usr-customer-001',
    networkId: 'net-private-sovereign',
    mode: 'private',
    status: 'active',
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-10-24T18:00:00Z',
    features: {
      tokenExplorer: false,
      privacyShieldInspector: true,
      zkProofVerification: true,
      contractVerification: false,
      validatorDirectory: false,
      developerSandbox: false,
      gasTracker: false,
      mempoolViewer: false
    },
    branding: {
      displayName: 'MONETA Sovereign Vault Explorer',
      tagline: 'Cryptographic Proof. Zero Disclosure.',
      primaryColor: '#8B5CF6',
      themeMode: 'black_minimal',
      footerNote: 'Protected by Recursive zk-SNARK Verification Engines'
    },
    domains: [
      {
        id: 'dom-003',
        domain: 'vault.moneta-sovereign.io',
        status: 'pending',
        recordType: 'TXT',
        recordHost: '_moneta-verify.vault',
        recordValue: 'moneta-eaas-verification=4b7f88c3a109e59',
        lastCheckedAt: '2026-10-25T01:00:00Z',
        sslStatus: 'pending'
      }
    ],
    apiKeys: [
      {
        id: 'key-003',
        name: 'Vault Root Admin Key',
        prefix: 'mnt_priv_sec_e11d...',
        role: 'admin',
        createdAt: '2026-10-01T09:30:00Z',
        lastUsedAt: '2026-10-24T22:15:00Z',
        rateLimitRps: 500,
        status: 'active'
      }
    ],
    teamMembers: [
      {
        id: 'tm-001',
        name: 'Marcus Vance',
        email: 'enterprise-lead@moneta-consortium.org',
        role: 'owner',
        joinedAt: '2026-10-01T09:00:00Z',
        status: 'active'
      }
    ],
    usage: {
      currentRequests: 89450,
      monthlyQuota: 10000000,
      rateLimitRps: 500,
      storageMb: 890,
      computeHours: 720,
      activeWebhooks: 2,
      historyDays: 730
    },
    diagnostics: {
      uptimePercent: 99.99,
      avgLatencyMs: 12,
      errorRatePercent: 0.01,
      rpcLatencyMs: 9,
      dbPoolActive: 16,
      dbPoolIdle: 10,
      nodeHealth: 'healthy',
      lastCheckedAt: '2026-10-25T01:22:45Z'
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-001',
    action: 'PROJECT_CREATED',
    actor: 'Marcus Vance',
    actorRole: 'owner',
    timestamp: '2026-10-01T09:00:00Z',
    ipAddress: '198.51.100.44',
    details: 'Provisioned project "Sovereign Treasury Explorer" on Private Sovereign Vault network',
    category: 'config'
  },
  {
    id: 'log-002',
    action: 'API_KEY_GENERATED',
    actor: 'Marcus Vance',
    actorRole: 'owner',
    timestamp: '2026-10-01T09:30:00Z',
    ipAddress: '198.51.100.44',
    details: 'Generated high-throughput admin key for Vault Root service',
    category: 'security'
  },
  {
    id: 'log-003',
    action: 'DOMAIN_ADDED',
    actor: 'Marcus Vance',
    actorRole: 'owner',
    timestamp: '2026-10-01T09:45:00Z',
    ipAddress: '198.51.100.44',
    details: 'Attached custom domain "vault.moneta-sovereign.io" with DNS TXT challenge',
    category: 'domain'
  },
  {
    id: 'log-004',
    action: 'TEAM_MEMBER_INVITED',
    actor: 'Marcus Vance',
    actorRole: 'owner',
    timestamp: '2026-09-10T16:00:00Z',
    ipAddress: '198.51.100.44',
    details: 'Invited David K. Ross as viewer for Apex Consortium Explorer',
    category: 'team'
  },
  {
    id: 'log-005',
    action: 'RPC_FAILOVER_TEST',
    actor: 'System Health Probe',
    actorRole: 'system',
    timestamp: '2026-10-24T12:00:00Z',
    ipAddress: '127.0.0.1',
    details: 'Automatic failover health check completed successfully across 3 redundant RPC daemons',
    category: 'security'
  }
];

export const BILLING_PLANS: BillingPlan[] = [
  {
    id: 'plan-developer',
    name: 'Developer Community',
    tier: 'developer',
    monthlyFee: '$0 / month (Free Devnet)',
    includedProjects: 1,
    monthlyRequests: 2000000,
    supportLevel: 'Community Forum & Docs',
    isCustom: false,
    status: 'active'
  },
  {
    id: 'plan-consortium',
    name: 'Consortium Institutional',
    tier: 'consortium',
    monthlyFee: '$499 / month',
    includedProjects: 5,
    monthlyRequests: 15000000,
    supportLevel: 'Dedicated 99.9% SLA & 24/7 Slack Bridge',
    isCustom: false,
    status: 'active'
  },
  {
    id: 'plan-enterprise',
    name: 'Sovereign Enterprise Dedicated',
    tier: 'enterprise',
    monthlyFee: 'Custom Quota Contract',
    includedProjects: 20,
    monthlyRequests: 100000000,
    supportLevel: 'Sovereign On-Prem Deployment & Custom Circuits',
    isCustom: true,
    status: 'active'
  }
];
