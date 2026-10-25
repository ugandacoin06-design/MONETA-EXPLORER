import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Globe, 
  Lock, 
  Server, 
  Palette, 
  Sliders, 
  ShieldCheck,
  Cpu,
  Info
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { EaaSNav } from '../../components/eaas/EaaSNav';
import { NetworkConfig, ExplorerProject } from '../../types/eaas';

export function CreateProjectWizard() {
  const { user, networks, createProject } = useEaaS();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Step indicator (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>(
    searchParams.get('network') || (networks.length > 0 ? networks[0].id : '')
  );
  
  // Feature flags
  const [features, setFeatures] = useState<ExplorerProject['features']>({
    tokenExplorer: true,
    privacyShieldInspector: false,
    zkProofVerification: true,
    contractVerification: true,
    validatorDirectory: true,
    developerSandbox: true,
    gasTracker: true,
    mempoolViewer: false
  });

  // Branding
  const [displayName, setDisplayName] = useState('');
  const [tagline, setTagline] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#1677FF');
  const [themeMode, setThemeMode] = useState<'black_minimal' | 'graphite_contrast'>('black_minimal');
  const [customDomain, setCustomDomain] = useState('');

  // Submission & Validation States
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createdProject, setCreatedProject] = useState<ExplorerProject | null>(null);

  // Derive selected network object
  const selectedNetwork = networks.find(n => n.id === selectedNetworkId);

  // Auto-generate slug and display name if user enters name
  const handleNameChange = (val: string) => {
    setName(val);
    if (!displayName) setDisplayName(val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setSlug(generatedSlug);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    if (!name.trim()) return 'Project name is required.';
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug)) return 'Valid lowercase alphanumeric slug is required.';
    if (!description.trim()) return 'Please provide a project description.';
    return null;
  };

  // Step 2 Validation (Network Selection & RBAC check)
  const validateStep2 = () => {
    if (!selectedNetwork) return 'Please choose a verified MONETA network.';
    if (!user) return 'You must be authenticated.';
    if (!selectedNetwork.requiredRole.includes(user.role)) {
      return `Permission Denied: Your customer role (${user.role}) is not authorized to deploy to ${selectedNetwork.mode} mode.`;
    }
    return null;
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 1) {
      const err = validateStep1();
      if (err) { setValidationError(err); return; }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const err = validateStep2();
      if (err) { setValidationError(err); return; }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitDeployment = async () => {
    setValidationError(null);
    setIsSubmitting(true);
    try {
      const proj = await createProject({
        name,
        slug,
        description,
        networkId: selectedNetworkId,
        features,
        branding: {
          displayName: displayName || name,
          tagline: tagline || 'Visible Truth. Invisible Wealth.',
          primaryColor,
          themeMode,
          footerNote: 'Hosted on MONETA Explorer as a Service Cloud'
        },
        domainName: customDomain ? customDomain.trim() : undefined
      });
      setCreatedProject(proj);
    } catch (err: unknown) {
      setValidationError(err instanceof Error ? err.message : 'Deployment failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If created successfully, show deployment confirmation screen
  if (createdProject) {
    return (
      <div className="space-y-8 pb-16">
        <EaaSNav />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="p-8 md:p-12 rounded-xl bg-[#15171A] border border-[#10B981]/50 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto text-[#10B981]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                Provisioning Verified
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                Explorer Project Live
              </h1>
              <p className="text-xs text-[#A7ADB5] mt-2 max-w-md mx-auto">
                "{createdProject.name}" has been provisioned on <strong className="text-white font-mono">{selectedNetwork?.name}</strong>. Ingestion indexer daemon is synced.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] text-left text-xs font-mono space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between text-[#A7ADB5]">
                <span>Project ID:</span>
                <span className="text-white">{createdProject.id}</span>
              </div>
              <div className="flex justify-between text-[#A7ADB5]">
                <span>Network Mode:</span>
                <span className="text-[#1677FF] uppercase font-bold">{createdProject.mode}</span>
              </div>
              <div className="flex justify-between text-[#A7ADB5]">
                <span>Service Hostname:</span>
                <span className="text-white">{createdProject.slug}.eaas.moneta.network</span>
              </div>
              {customDomain && (
                <div className="flex justify-between text-[#A7ADB5]">
                  <span>Custom Domain:</span>
                  <span className="text-[#E5A93C]">{customDomain} (DNS Pending)</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to={`/eaas/projects/${createdProject.id}`}
                className="px-6 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Open Project Overview &rarr;
              </Link>
              <Link
                to="/eaas/projects"
                className="px-6 py-2.5 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Back to Projects Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <EaaSNav />

      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="border-b border-[#202328] pb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Step {currentStep} of 5</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="text-xs text-[#A7ADB5] font-mono">Provisioning Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create New Explorer
            </h1>
          </div>
          <Link
            to="/eaas/projects"
            className="text-xs text-[#A7ADB5] hover:text-white transition-colors"
          >
            Cancel & Exit
          </Link>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-mono">
          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Network' },
            { num: 3, label: 'Modules' },
            { num: 4, label: 'Branding' },
            { num: 5, label: 'Review' },
          ].map(s => (
            <div
              key={s.num}
              className={`p-2 rounded-lg border transition-colors ${
                currentStep === s.num
                  ? 'border-[#1677FF] bg-[#1677FF]/15 text-[#1677FF] font-bold'
                  : currentStep > s.num
                  ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]'
                  : 'border-[#202328] bg-[#15171A] text-[#5D646E]'
              }`}
            >
              <span>{s.num}. {s.label}</span>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {validationError && (
          <div className="p-3.5 rounded-lg bg-[#2B1115] border border-[#4E1C24] text-[#FF8595] text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Step 1: Project Identity */}
        {currentStep === 1 && (
          <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-5 text-xs">
            <h2 className="text-base font-bold text-white">1. Project Identity & Purpose</h2>
            
            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">Explorer Project Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Apex Global Consortium Explorer"
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white text-sm focus:outline-none focus:border-[#1677FF]"
              />
            </div>

            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">URL Slug (Subdomain) *</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="apex-explorer"
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-l-lg text-white font-mono focus:outline-none focus:border-[#1677FF]"
                />
                <span className="px-3 py-2 bg-[#202328] border border-l-0 border-[#202328] rounded-r-lg text-[#A7ADB5] font-mono text-xs shrink-0">
                  .eaas.moneta.network
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">Description & Objective *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe who will use this explorer (e.g. consortium auditor team, public users, institutional settlement nodes)..."
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Network Selection */}
        {currentStep === 2 && (
          <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-white">2. Select Configured MONETA Network</h2>
              <p className="text-[#A7ADB5] mt-1">
                Only networks configured and authorized for your customer role (<strong className="text-white font-mono">{user?.role}</strong>) are selectable.
              </p>
            </div>

            <div className="space-y-3">
              {networks.map((net) => {
                const isSelected = selectedNetworkId === net.id;
                let modeColor = 'text-[#1677FF] border-[#1677FF] bg-[#1677FF]/10';
                if (net.mode === 'consortium') modeColor = 'text-[#10B981] border-[#10B981] bg-[#10B981]/10';
                if (net.mode === 'private') modeColor = 'text-[#8B5CF6] border-[#8B5CF6] bg-[#8B5CF6]/10';

                return (
                  <div
                    key={net.id}
                    onClick={() => setSelectedNetworkId(net.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isSelected 
                        ? 'border-[#1677FF] bg-[#1677FF]/10 ring-1 ring-[#1677FF]' 
                        : 'border-[#202328] bg-[#0E1012] hover:border-[#2A2E35]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{net.name}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-mono uppercase font-bold border ${modeColor}`}>
                          {net.mode} mode
                        </span>
                      </div>
                      <p className="text-xs text-[#A7ADB5]">{net.description}</p>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#5D646E] pt-1">
                        <span>Chain ID: {net.chainId}</span>
                        <span>Consensus: {net.consensus}</span>
                        <span>Nodes: {net.nodeCount}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#1677FF] bg-[#1677FF]' : 'border-[#5D646E]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Feature Modules */}
        {currentStep === 3 && (
          <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-white">3. Explorer Feature Modules</h2>
              <p className="text-[#A7ADB5] mt-1">
                Configure which exploration and verification components will be exposed on this customer instance.
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
                const isEnabled = features[item.key as keyof ExplorerProject['features']];
                return (
                  <label
                    key={item.key}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      isEnabled 
                        ? 'border-[#1677FF]/60 bg-[#1677FF]/5' 
                        : 'border-[#202328] bg-[#0E1012] opacity-75'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => {
                        setFeatures({
                          ...features,
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
          </div>
        )}

        {/* Step 4: White-Label Branding */}
        {currentStep === 4 && (
          <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-white">4. White-Label Branding & Domain</h2>
              <p className="text-[#A7ADB5] mt-1">
                Customize appearance and prepare custom domain mapping for your explorer.
              </p>
            </div>

            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">Custom Explorer Title</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. APEX SCAN · Consortium Explorer"
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
              />
            </div>

            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Institutional Settlement & Audit Provenance"
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Accent Theme Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-9 h-9 rounded bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A7ADB5] mb-1 font-semibold">Base Theme</label>
                <select
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white text-xs focus:outline-none"
                >
                  <option value="black_minimal">Black Minimal (#050505 Default)</option>
                  <option value="graphite_contrast">Graphite High-Contrast (#15171A)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#A7ADB5] mb-1 font-semibold">Optional Custom Domain (FQDN)</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. explorer.myconsortium.org"
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono focus:outline-none focus:border-[#1677FF]"
              />
              <span className="text-[11px] text-[#5D646E] mt-1 block">
                You can configure DNS CNAME/A records and verify domain ownership after creation.
              </span>
            </div>
          </div>
        )}

        {/* Step 5: Final Review & Submission */}
        {currentStep === 5 && (
          <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-6 text-xs">
            <div>
              <h2 className="text-base font-bold text-white">5. Review Configuration & Submit</h2>
              <p className="text-[#A7ADB5] mt-1">
                Verify all parameters before instructing the orchestrator to provision your explorer indexer containers.
              </p>
            </div>

            <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#0E1012] overflow-hidden font-mono text-[11px]">
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Explorer Name:</span>
                <span className="text-white font-bold">{name}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Target Network:</span>
                <span className="text-[#1677FF] font-bold">{selectedNetwork?.name} ({selectedNetwork?.mode} mode)</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Subdomain Endpoint:</span>
                <span className="text-white">{slug}.eaas.moneta.network</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Active Modules:</span>
                <span className="text-white">
                  {Object.values(features).filter(Boolean).length} modules enabled
                </span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-[#A7ADB5]">Branding Color:</span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: primaryColor }}></span>
                  <span className="text-white">{primaryColor}</span>
                </span>
              </div>
              {customDomain && (
                <div className="p-3 flex justify-between">
                  <span className="text-[#A7ADB5]">Custom Domain:</span>
                  <span className="text-[#E5A93C]">{customDomain}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-[#15171A] border border-[#202328] space-y-1.5 text-xs">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#1677FF]" />
                Provisioning Lifecycle Notice
              </span>
              <p className="text-[#A7ADB5] leading-relaxed">
                Submitting will allocate a dedicated PostgreSQL database partition, spin up an asynchronous block indexer, and generate initial read-only API credentials for your tenant.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="flex items-center justify-between pt-2">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitDeployment}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#0D9A6B] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{isSubmitting ? 'Provisioning Indexer...' : 'Confirm & Deploy Explorer'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
