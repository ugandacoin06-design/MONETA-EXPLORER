import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Layers, 
  Settings, 
  Globe, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  Users, 
  FileText, 
  Server, 
  Trash2, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  AlertTriangle,
  Lock,
  Plus,
  RefreshCw,
  Sliders,
  Eye,
  Key,
  Palette
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { eaasClient } from '../../services/eaasClient';
import { formatNumber, formatHash } from '../../utils';
import { EaaSNav } from '../../components/eaas/EaaSNav';
import { ExplorerProject, CustomDomain, ApiKeyItem, UserRole } from '../../types/eaas';

type ProjectTab = 
  | 'overview' 
  | 'network' 
  | 'features' 
  | 'branding' 
  | 'apikeys' 
  | 'usage' 
  | 'domains' 
  | 'team' 
  | 'security' 
  | 'health' 
  | 'logs';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { 
    projects, 
    networks, 
    user, 
    updateProject, 
    deleteProject, 
    refreshState 
  } = useEaaS();

  const currentTab = (searchParams.get('tab') as ProjectTab) || 'overview';
  const setTab = (tab: ProjectTab) => {
    setSearchParams({ tab });
  };

  const project = projects.find(p => p.id === projectId || p.slug === projectId);
  const network = networks.find(n => n.id === project?.networkId);

  // Form states for edits
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Network test state
  const [isTestingRpc, setIsTestingRpc] = useState(false);
  const [rpcTestResult, setRpcTestResult] = useState<{
    reachable: boolean;
    latencyMs: number;
    currentBlock: number;
  } | null>(null);

  // Domain state
  const [newDomainInput, setNewDomainInput] = useState('');
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [verifyingDomainId, setVerifyingDomainId] = useState<string | null>(null);

  // API Key creation modal
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState<'read' | 'write' | 'admin'>('read');
  const [newKeyRps, setNewKeyRps] = useState(100);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [revealedSecret, setRevealedSecret] = useState<{ item: ApiKeyItem; secret: string } | null>(null);

  // Team invite modal
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('developer');
  const [inviteName, setInviteName] = useState('');

  // Delete project modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Editable feature state
  const [featuresState, setFeaturesState] = useState<ExplorerProject['features']>(() => 
    project ? { ...project.features } : ({} as any)
  );

  // Editable branding state
  const [brandingState, setBrandingState] = useState<ExplorerProject['branding']>(() =>
    project ? { ...project.branding } : ({} as any)
  );

  useEffect(() => {
    if (project) {
      setFeaturesState({ ...project.features });
      setBrandingState({ ...project.branding });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="space-y-8 pb-16">
        <EaaSNav />
        <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-[#FF8595] mx-auto" />
          <h2 className="text-xl font-bold text-white">Project Not Found</h2>
          <p className="text-xs text-[#A7ADB5]">
            The explorer project ID <code className="text-white font-mono">{projectId}</code> does not exist or you lack permission to view it.
          </p>
          <Link
            to="/eaas/projects"
            className="inline-block px-4 py-2 bg-[#202328] text-white text-xs rounded-lg hover:bg-[#2A2E35]"
          >
            &larr; Back to Projects Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Test RPC Connectivity
  const handleTestRpc = async () => {
    setIsTestingRpc(true);
    setRpcTestResult(null);
    try {
      const res = await eaasClient.testNetworkConnectivity(project.networkId);
      setRpcTestResult({
        reachable: res.reachable,
        latencyMs: res.latencyMs,
        currentBlock: res.currentBlock
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'RPC probe failed.');
    } finally {
      setIsTestingRpc(false);
    }
  };

  // Save Features or Branding
  const handleSaveConfig = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);
    try {
      await updateProject(project.id, {
        features: featuresState,
        branding: brandingState
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  // Add Domain
  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainInput.trim()) return;
    setIsAddingDomain(true);
    setErrorMessage(null);
    try {
      await eaasClient.addDomain(project.id, newDomainInput.trim());
      setNewDomainInput('');
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to add domain.');
    } finally {
      setIsAddingDomain(false);
    }
  };

  // Verify Domain
  const handleVerifyDomain = async (domainId: string) => {
    setVerifyingDomainId(domainId);
    try {
      await eaasClient.verifyDomain(project.id, domainId);
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setVerifyingDomainId(null);
    }
  };

  // Remove Domain
  const handleRemoveDomain = async (domainId: string) => {
    try {
      await eaasClient.removeDomain(project.id, domainId);
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to remove domain.');
    }
  };

  // Generate API Key
  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingKey(true);
    try {
      const result = await eaasClient.generateApiKey(project.id, newKeyName, newKeyRole, newKeyRps);
      setRevealedSecret({
        item: result.item,
        secret: result.oneTimeSecret
      });
      setIsApiKeyModalOpen(false);
      setNewKeyName('');
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to generate key.');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // Revoke Key
  const handleRevokeKey = async (keyId: string) => {
    try {
      await eaasClient.revokeApiKey(project.id, keyId);
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Revocation failed.');
    }
  };

  // Invite Team Member
  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      await eaasClient.inviteTeamMember(project.id, inviteEmail, inviteRole, inviteName);
      setIsInviteModalOpen(false);
      setInviteEmail('');
      setInviteName('');
      refreshState();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to invite member.');
    }
  };

  // Delete Project Action
  const handleDeleteProject = async () => {
    if (deleteConfirmText !== project.slug) return;
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
      navigate('/eaas/projects');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Delete failed.');
      setIsDeleting(false);
    }
  };

  const tabs: Array<{ id: ProjectTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'network', label: 'Network & RPC', icon: Server },
    { id: 'features', label: 'Modules & Config', icon: Sliders },
    { id: 'branding', label: 'Branding & Theme', icon: Palette },
    { id: 'apikeys', label: 'API Keys & Docs', icon: Terminal },
    { id: 'usage', label: 'Usage & Quotas', icon: Activity },
    { id: 'domains', label: 'Custom Domains', icon: Globe },
    { id: 'team', label: 'Team & RBAC', icon: Users },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'health', label: 'Diagnostics', icon: RefreshCw },
    { id: 'logs', label: 'Audit Logs', icon: FileText }
  ];

  return (
    <div className="space-y-6 pb-20">
      <EaaSNav />

      <div className="px-4 md:px-8 space-y-6">
        {/* Project Header Banner */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Project</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="text-xs font-mono text-[#A7ADB5]">{project.id}</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border text-[#1677FF] bg-[#1677FF]/15 border-[#1677FF]/30">
                {project.mode} Mode
              </span>
              <span className="text-[11px] font-mono text-[#10B981] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                {project.status}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs text-[#A7ADB5]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <Link
              to="/explorer"
              target="_blank"
              className="px-3 py-1.5 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live View</span>
            </Link>
          </div>
        </div>

        {/* Global Notifications */}
        {saveSuccess && (
          <div className="p-3 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Changes successfully saved and applied to tenant configuration.</span>
          </div>
        )}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-[#2B1115] border border-[#4E1C24] text-[#FF8595] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* One-Time API Secret Reveal Modal */}
        {revealedSecret && (
          <div className="p-5 rounded-xl bg-[#1A1813] border border-[#E5A93C] text-xs space-y-3">
            <div className="flex items-center gap-2 text-[#E5A93C] font-bold">
              <Key className="w-5 h-5 shrink-0" />
              <span>ONE-TIME API KEY SECRET REVELATION</span>
            </div>
            <p className="text-white leading-relaxed">
              Copy and safely store your secret now. For security reasons, this secret is strictly revealed once and will never be shown again or stored in plaintext:
            </p>
            <div className="p-3 rounded bg-[#050505] border border-[#202328] flex items-center justify-between font-mono text-sm text-[#10B981] break-all">
              <span>{revealedSecret.secret}</span>
              <button
                type="button"
                onClick={() => handleCopy(revealedSecret.secret, 'secret')}
                className="ml-3 px-3 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs text-white shrink-0 flex items-center gap-1 font-sans"
              >
                {copiedId === 'secret' ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'secret' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setRevealedSecret(null)}
                className="px-4 py-1.5 bg-[#E5A93C] text-black font-semibold text-xs rounded hover:bg-[#D4982B]"
              >
                I have securely saved this secret
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-[#202328] pb-1 text-xs">
          {tabs.map(t => {
            const isActive = currentTab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-t-lg transition-colors font-medium whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#15171A] text-white border-t-2 border-[#1677FF]' 
                    : 'text-[#A7ADB5] hover:text-white hover:bg-[#15171A]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] space-y-3">
                <span className="text-xs uppercase font-semibold text-[#A7ADB5] font-mono">Service Status</span>
                <div className="text-xl font-bold font-mono text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>Operational</span>
                </div>
                <p className="text-xs text-[#A7ADB5]">
                  Uptime: {project.diagnostics.uptimePercent}% · Error Rate: {project.diagnostics.errorRatePercent}%
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] space-y-3">
                <span className="text-xs uppercase font-semibold text-[#A7ADB5] font-mono">Connected Network</span>
                <div className="text-xl font-bold text-white tracking-tight">
                  {network?.name || project.networkId}
                </div>
                <p className="text-xs text-[#A7ADB5] font-mono">
                  Chain ID: {network?.chainId} · {network?.consensus}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] space-y-3">
                <span className="text-xs uppercase font-semibold text-[#A7ADB5] font-mono">30-Day API Traffic</span>
                <div className="text-xl font-bold font-mono text-white tracking-tight">
                  {formatNumber(project.usage.currentRequests)} <span className="text-xs font-normal text-[#A7ADB5]">reqs</span>
                </div>
                <p className="text-xs text-[#A7ADB5] font-mono">
                  Quota: {Math.round((project.usage.currentRequests / project.usage.monthlyQuota) * 100)}% consumed
                </p>
              </div>
            </div>

            {/* Quick Properties Card */}
            <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Project Endpoint & Identifiers
              </h3>
              <div className="divide-y divide-[#202328] text-xs font-mono">
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[#A7ADB5]">Primary Hostname:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{project.slug}.eaas.moneta.network</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(`https://${project.slug}.eaas.moneta.network`, 'host')}
                      className="text-[#A7ADB5] hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[#A7ADB5]">Custom Domains:</span>
                  <span className="text-white">
                    {project.domains.length > 0 
                      ? project.domains.map(d => d.domain).join(', ') 
                      : 'None attached (configure in Domains tab)'}
                  </span>
                </div>
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[#A7ADB5]">Created Timestamp:</span>
                  <span className="text-white">{new Date(project.createdAt).toUTCString()}</span>
                </div>
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[#A7ADB5]">Last Config Sync:</span>
                  <span className="text-white">{new Date(project.updatedAt).toUTCString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NETWORK & RPC */}
        {currentTab === 'network' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Downstream Node Connectivity
                </h3>
                <p className="text-[#A7ADB5] mt-1">
                  Verified JSON-RPC and WebSocket endpoints used for real-time block and transaction ingestion.
                </p>
              </div>
              <button
                type="button"
                onClick={handleTestRpc}
                disabled={isTestingRpc}
                className="flex items-center gap-2 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg transition-colors shrink-0"
              >
                {isTestingRpc ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Test RPC Latency</span>
              </button>
            </div>

            {rpcTestResult && (
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#10B981]/50 text-xs font-mono space-y-1">
                <div className="text-[#10B981] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RPC Node Reachable & Responsive</span>
                </div>
                <div className="text-[#A7ADB5]">Ingestion Ping: <strong className="text-white">{rpcTestResult.latencyMs}ms</strong></div>
                <div className="text-[#A7ADB5]">Synchronized Block: <strong className="text-white">#{formatNumber(rpcTestResult.currentBlock)}</strong></div>
              </div>
            )}

            <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#0E1012] overflow-hidden font-mono text-[11px]">
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Network Name:</span>
                <span className="text-white font-bold">{network?.name}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Network Identifier:</span>
                <span className="text-white">{network?.networkId}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Network Mode:</span>
                <span className="text-[#1677FF] uppercase font-bold">{network?.mode}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">HTTP JSON-RPC:</span>
                <span className="text-white">{network?.rpcUrl}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">WebSocket Feed:</span>
                <span className="text-white">{network?.wsUrl}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">EVM Chain ID:</span>
                <span className="text-white">{network?.chainId}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Indexing Status:</span>
                <span className="text-[#10B981] font-bold uppercase">{network?.indexingStatus} ({network?.indexingProgress}%)</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Last Sync Block:</span>
                <span className="text-white">#{formatNumber(network?.lastBlockIndexed || 0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MODULES & FEATURES */}
        {currentTab === 'features' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Explorer Feature Modules
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Toggle interactive pages and inspection tools for this customer explorer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'tokenExplorer', title: 'Token & MINT Tracker', desc: 'Inspect MNTA, MINT algorithmic stablecoins, and custom tokens.' },
                { key: 'privacyShieldInspector', title: 'Zero-Knowledge Shield Inspector', desc: 'Inspect encrypted transaction envelopes with proof commitments.' },
                { key: 'zkProofVerification', title: 'On-Chain Proof Verification', desc: 'Real-time cryptographic verification of circuit attestations.' },
                { key: 'contractVerification', title: 'Smart Contract Source Code Verifier', desc: 'Compile and verify EVM/WASM bytecode against source files.' },
                { key: 'validatorDirectory', title: 'Consortium Validator Directory', desc: 'List active nodes, voting power, uptime, and slashed stakes.' },
                { key: 'developerSandbox', title: 'Interactive JSON-RPC Sandbox', desc: 'Allow web developers to test API requests directly in the browser.' },
                { key: 'gasTracker', title: 'Gas & Fee Delegation Monitor', desc: 'Display base gas, priority tips, and fee sponsor accounts.' },
                { key: 'mempoolViewer', title: 'Pending Mempool Queue', desc: 'Real-time inspection of unconfirmed transactions before block inclusion.' },
              ].map(item => {
                const isChecked = !!featuresState[item.key as keyof ExplorerProject['features']];
                return (
                  <label
                    key={item.key}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      isChecked 
                        ? 'border-[#1677FF]/60 bg-[#1677FF]/5' 
                        : 'border-[#202328] bg-[#0E1012] opacity-70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        setFeaturesState({
                          ...featuresState,
                          [item.key]: e.target.checked
                        });
                      }}
                      className="mt-1 rounded accent-[#1677FF]"
                    />
                    <div>
                      <span className="font-bold text-white block">{item.title}</span>
                      <span className="text-[11px] text-[#A7ADB5] block mt-0.5">{item.desc}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg transition-colors"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Feature Config</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: BRANDING & THEME */}
        {currentTab === 'branding' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                White-Label Branding Settings
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Maintain MONETASCAN's black-first visual discipline while applying your institutional brand identity.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Display Title</label>
                <input
                  type="text"
                  value={brandingState.displayName}
                  onChange={(e) => setBrandingState({ ...brandingState, displayName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Brand Tagline</label>
                <input
                  type="text"
                  value={brandingState.tagline}
                  onChange={(e) => setBrandingState({ ...brandingState, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A7ADB5] mb-1 font-semibold">Primary Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandingState.primaryColor}
                      onChange={(e) => setBrandingState({ ...brandingState, primaryColor: e.target.value })}
                      className="w-9 h-9 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandingState.primaryColor}
                      onChange={(e) => setBrandingState({ ...brandingState, primaryColor: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A7ADB5] mb-1 font-semibold">Theme Mode</label>
                  <select
                    value={brandingState.themeMode}
                    onChange={(e) => setBrandingState({ ...brandingState, themeMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                  >
                    <option value="black_minimal">Black Minimal (#050505 Default)</option>
                    <option value="graphite_contrast">Graphite High-Contrast (#15171A)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Footer Legal & Distribution Note</label>
                <input
                  type="text"
                  value={brandingState.footerNote}
                  onChange={(e) => setBrandingState({ ...brandingState, footerNote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg transition-colors"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Branding</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: API KEYS & DOCUMENTATION */}
        {currentTab === 'apikeys' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Tenant API Keys & Endpoints
                </h3>
                <p className="text-[#A7ADB5] mt-1">
                  High-throughput credentials with per-key rate limits and role scoping.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Generate API Key</span>
              </button>
            </div>

            {/* API Keys Table */}
            <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#0E1012] overflow-hidden">
              {project.apiKeys.map(k => (
                <div key={k.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-sans text-xs">{k.name}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#202328] text-[#1677FF] uppercase">{k.role}</span>
                      <span className={`px-1.5 py-0.2 rounded ${k.status === 'active' ? 'text-[#10B981]' : 'text-[#FF8595]'}`}>
                        {k.status}
                      </span>
                    </div>
                    <div className="text-[#A7ADB5] mt-1">
                      Identifier: <span className="text-white">{k.prefix}</span> · Limit: {k.rateLimitRps} RPS
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {k.status === 'active' && (
                      <button
                        type="button"
                        onClick={() => handleRevokeKey(k.id)}
                        className="px-3 py-1 bg-[#2B1115] hover:bg-[#4E1C24] text-[#FF8595] rounded font-sans text-xs transition-colors"
                      >
                        Revoke Key
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick API Snippet */}
            <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] space-y-2">
              <span className="text-white font-semibold block font-mono text-[11px]">
                cURL Integration Example (Read-Only)
              </span>
              <pre className="p-3 rounded bg-[#050505] text-[#1677FF] font-mono text-xs overflow-x-auto">
{`curl -X POST https://${project.slug}.eaas.moneta.network/api/v1/rpc \\
  -H "Authorization: Bearer YOUR_API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"moneta_blockNumber","params":[],"id":1}'`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 6: USAGE & QUOTAS */}
        {currentTab === 'usage' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Usage Consumption & Rate Limits
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Live metrics on ingestion capacity, database storage, and API requests.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-[#A7ADB5]">Monthly Requests Consumption:</span>
                  <span className="text-white">
                    {formatNumber(project.usage.currentRequests)} / {formatNumber(project.usage.monthlyQuota)}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#0E1012] overflow-hidden">
                  <div 
                    className="h-full bg-[#1677FF] rounded-full"
                    style={{ width: `${Math.min(100, (project.usage.currentRequests / project.usage.monthlyQuota) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono pt-2">
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <span className="text-[10px] text-[#A7ADB5] uppercase block">Rate Limit</span>
                  <span className="text-base font-bold text-white">{project.usage.rateLimitRps} RPS</span>
                </div>
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <span className="text-[10px] text-[#A7ADB5] uppercase block">Indexed Storage</span>
                  <span className="text-base font-bold text-white">{project.usage.storageMb} MB</span>
                </div>
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <span className="text-[10px] text-[#A7ADB5] uppercase block">History Retention</span>
                  <span className="text-base font-bold text-white">{project.usage.historyDays} Days</span>
                </div>
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <span className="text-[10px] text-[#A7ADB5] uppercase block">Webhooks Active</span>
                  <span className="text-base font-bold text-white">{project.usage.activeWebhooks} Endpoints</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CUSTOM DOMAINS */}
        {currentTab === 'domains' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Custom Domain Management & SSL
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Map your organization’s domain with automatic Let's Encrypt TLS certificates.
              </p>
            </div>

            {/* Add Domain Form */}
            <form onSubmit={handleAddDomain} className="flex gap-2">
              <input
                type="text"
                value={newDomainInput}
                onChange={(e) => setNewDomainInput(e.target.value)}
                placeholder="e.g. explorer.myconsortium.org"
                className="flex-1 px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono focus:outline-none focus:border-[#1677FF]"
              />
              <button
                type="submit"
                disabled={isAddingDomain || !newDomainInput.trim()}
                className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
              >
                {isAddingDomain ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Attach Domain</span>
              </button>
            </form>

            {/* Domains List */}
            <div className="space-y-3">
              {project.domains.map(d => (
                <div key={d.id} className="p-4 rounded-xl bg-[#0E1012] border border-[#202328] space-y-3 font-mono text-[11px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{d.domain}</span>
                      <span className={`px-2 py-0.2 rounded uppercase ${
                        d.status === 'verified' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#E5A93C]/15 text-[#E5A93C]'
                      }`}>
                        {d.status}
                      </span>
                      <span className="text-[#5D646E]">SSL: {d.sslStatus}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {d.status !== 'verified' && (
                        <button
                          type="button"
                          onClick={() => handleVerifyDomain(d.id)}
                          disabled={verifyingDomainId === d.id}
                          className="px-3 py-1 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded font-sans transition-colors flex items-center gap-1"
                        >
                          {verifyingDomainId === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                          <span>Verify DNS Record</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveDomain(d.id)}
                        className="p-1 text-[#5D646E] hover:text-[#FF8595]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[#15171A] border border-[#202328] space-y-1 text-[#A7ADB5]">
                    <div className="flex justify-between">
                      <span>Required DNS Type:</span>
                      <span className="text-white font-bold">{d.recordType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Host / Name:</span>
                      <span className="text-white">{d.recordHost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Value:</span>
                      <span className="text-white">{d.recordValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: TEAM & RBAC */}
        {currentTab === 'team' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Team Members & Permissions (RBAC)
                </h3>
                <p className="text-[#A7ADB5] mt-1">
                  Manage collaborators authorized to configure this explorer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Invite Member</span>
              </button>
            </div>

            <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#0E1012] overflow-hidden">
              {project.teamMembers.map(m => (
                <div key={m.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{m.name}</span>
                      <span className="px-2 py-0.2 rounded bg-[#202328] text-[#1677FF] font-mono text-[10px] uppercase font-semibold">
                        {m.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A7ADB5] font-mono mt-0.5">{m.email}</div>
                  </div>
                  <div className="text-[11px] text-[#5D646E] font-mono">
                    Joined: {new Date(m.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: SECURITY */}
        {currentTab === 'security' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Security & Isolation Boundaries
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Zero-knowledge verification controls and network access boundaries.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">Consortium Data Isolation</span>
                  <span className="text-[#A7ADB5] text-[10px]">Strict tenant partition enforced at the database level.</span>
                </div>
                <span className="text-[#10B981] font-bold">ENFORCED</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">Zero-Knowledge Circuit Prover</span>
                  <span className="text-[#A7ADB5] text-[10px]">Groth16 / Plonk proof verification for confidential transactions.</span>
                </div>
                <span className="text-[#10B981] font-bold">ACTIVE</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">Client State Leak Prevention</span>
                  <span className="text-[#A7ADB5] text-[10px]">Privileged API secrets and validator keys are never persisted in localStorage.</span>
                </div>
                <span className="text-[#10B981] font-bold">VERIFIED</span>
              </div>
            </div>

            {/* Danger Zone: Delete Project */}
            <div className="p-5 rounded-xl bg-[#2B1115]/40 border border-[#4E1C24] space-y-3">
              <span className="text-sm font-bold text-[#FF8595] block font-sans">Danger Zone</span>
              <p className="text-xs text-[#A7ADB5]">
                Deleting this project will permanently shut down its dedicated indexers, revoke all active API keys, and release its subdomains.
              </p>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 bg-[#4E1C24] hover:bg-[#682430] text-[#FF8595] font-semibold rounded-lg transition-colors"
              >
                Delete Explorer Project
              </button>
            </div>
          </div>
        )}

        {/* TAB 10: DIAGNOSTICS */}
        {currentTab === 'health' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                System Diagnostics & Latency Probes
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Real-time node metrics, database pool availability, and downstream ingestion stability.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328]">
                <span className="text-[10px] text-[#A7ADB5] uppercase block">Uptime</span>
                <span className="text-lg font-bold text-[#10B981]">{project.diagnostics.uptimePercent}%</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328]">
                <span className="text-[10px] text-[#A7ADB5] uppercase block">Avg Latency</span>
                <span className="text-lg font-bold text-white">{project.diagnostics.avgLatencyMs}ms</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328]">
                <span className="text-[10px] text-[#A7ADB5] uppercase block">DB Pool Active</span>
                <span className="text-lg font-bold text-white">{project.diagnostics.dbPoolActive} / 20</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328]">
                <span className="text-[10px] text-[#A7ADB5] uppercase block">Node Health</span>
                <span className="text-lg font-bold text-[#10B981] uppercase">{project.diagnostics.nodeHealth}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: AUDIT LOGS */}
        {currentTab === 'logs' && (
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Administrative Audit Logs
              </h3>
              <p className="text-[#A7ADB5] mt-1">
                Tamper-evident record of configuration changes, key rotations, and domain verifications.
              </p>
            </div>

            <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#0E1012] overflow-hidden font-mono text-[11px]">
              {eaasClient.getAuditLogs().map(log => (
                <div key={log.id} className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1677FF]">{log.action}</span>
                    <span className="text-[#5D646E]">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-[#A7ADB5]">{log.details}</div>
                  <div className="text-[10px] text-[#5D646E]">
                    Actor: {log.actor} ({log.actorRole}) · IP: {log.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Generate API Key */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Generate New API Key</h3>
            <form onSubmit={handleCreateApiKey} className="space-y-4">
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Key Name / Description</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Staging Backend Worker"
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Permission Role</label>
                <select
                  value={newKeyRole}
                  onChange={(e) => setNewKeyRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                >
                  <option value="read">Read Only (Blocks, Txs, Accounts)</option>
                  <option value="write">Write / Broadcast (Submit Txs)</option>
                  <option value="admin">Admin (Indexer controls)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Rate Limit (Requests per second)</label>
                <input
                  type="number"
                  value={newKeyRps}
                  onChange={(e) => setNewKeyRps(parseInt(e.target.value, 10))}
                  min={10}
                  max={1000}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApiKeyModalOpen(false)}
                  className="px-4 py-2 bg-[#202328] text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGeneratingKey}
                  className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg"
                >
                  {isGeneratingKey ? 'Generating...' : 'Generate Key'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Invite Team Member */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Invite Collaborator</h3>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white"
                >
                  <option value="developer">Developer (Manage API keys & tests)</option>
                  <option value="viewer">Viewer (Read-only)</option>
                  <option value="admin">Admin (Configuration & team)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 bg-[#202328] text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold rounded-lg"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Project Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#15171A] border border-[#4E1C24] space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#FF8595]">Confirm Irreversible Deletion</h3>
            <p className="text-white">
              To confirm deletion of project <strong className="text-white font-mono">{project.name}</strong>, type its slug <code className="text-[#FF8595] font-mono font-bold bg-[#2B1115] px-1 py-0.5 rounded">{project.slug}</code> below:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={project.slug}
              className="w-full px-3 py-2 bg-[#0E1012] border border-[#4E1C24] rounded-lg text-white font-mono"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setIsDeleteModalOpen(false); setDeleteConfirmText(''); }}
                className="px-4 py-2 bg-[#202328] text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                disabled={deleteConfirmText !== project.slug || isDeleting}
                className="px-4 py-2 bg-[#4E1C24] hover:bg-[#682430] disabled:opacity-40 text-[#FF8595] font-semibold rounded-lg"
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
