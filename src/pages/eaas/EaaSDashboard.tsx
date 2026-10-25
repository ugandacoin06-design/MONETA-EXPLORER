import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Plus, 
  ArrowRight, 
  Globe, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Server,
  Zap,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { formatNumber } from '../../utils';
import { EaaSNav } from '../../components/eaas/EaaSNav';

export function EaaSDashboard() {
  const { user, projects, networks } = useEaaS();

  // Aggregate stats
  const totalRequests = projects.reduce((acc, p) => acc + p.usage.currentRequests, 0);
  const totalQuota = projects.reduce((acc, p) => acc + p.usage.monthlyQuota, 0);
  const verifiedDomainsCount = projects.reduce(
    (acc, p) => acc + p.domains.filter(d => d.status === 'verified').length, 
    0
  );
  const activeKeysCount = projects.reduce(
    (acc, p) => acc + p.apiKeys.filter(k => k.status === 'active').length, 
    0
  );

  return (
    <div className="space-y-8 pb-16">
      <EaaSNav />

      <div className="px-4 md:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Customer Console</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="text-xs text-[#A7ADB5] font-mono">{user?.organization}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Explorer as a Service Overview
            </h1>
            <p className="text-xs text-[#A7ADB5] mt-1">
              Monitor, configure, and maintain your dedicated MONETA CHAIN blockchain explorers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/eaas/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create Explorer</span>
            </Link>
          </div>
        </div>

        {/* Primary Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
            <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Active Explorers</span>
              <Layers className="w-4 h-4 text-[#1677FF]" />
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {projects.length}
            </div>
            <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
              <span>Public / Consortium / Private</span>
              <span className="text-[#10B981]">100% Online</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
            <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">API Traffic (30d)</span>
              <Activity className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {formatNumber(totalRequests)}
            </div>
            <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
              <span>Quota: {formatNumber(totalQuota)}</span>
              <span className="text-[#1677FF]">{Math.round((totalRequests / totalQuota) * 100)}% Used</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
            <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Verified Domains</span>
              <Globe className="w-4 h-4 text-[#E5A93C]" />
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {verifiedDomainsCount}
            </div>
            <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
              <span>Custom White-Label FQDNs</span>
              <span className="text-[#10B981]">SSL Active</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
            <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">API Keys Deployed</span>
              <Terminal className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {activeKeysCount}
            </div>
            <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
              <span>HMAC Protected Credentials</span>
              <span className="text-[#10B981]">0 Leaks</span>
            </div>
          </div>
        </div>

        {/* Active Explorers Directory Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1677FF]" />
              <span>Customer Hosted Explorers ({projects.length})</span>
            </h2>
            <Link
              to="/eaas/projects"
              className="text-xs text-[#1677FF] hover:underline font-medium"
            >
              View Full Projects Directory &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj) => {
              const net = networks.find(n => n.id === proj.networkId);
              let modeColor = 'text-[#1677FF] bg-[#1677FF]/15 border-[#1677FF]/30';
              if (proj.mode === 'consortium') {
                modeColor = 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
              } else if (proj.mode === 'private') {
                modeColor = 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30';
              }

              const primaryDomain = proj.domains[0]?.domain || `${proj.slug}.eaas.moneta.network`;

              return (
                <div
                  key={proj.id}
                  className="p-5 rounded-xl bg-[#15171A] border border-[#202328] hover:border-[#1677FF]/40 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider border ${modeColor}`}>
                        {proj.mode} Mode
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        <span>{proj.status}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{proj.name}</h3>
                      <p className="text-xs text-[#A7ADB5] mt-1 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#0E1012] border border-[#202328] space-y-1.5 text-[11px] font-mono">
                      <div className="flex justify-between text-[#A7ADB5]">
                        <span>Network:</span>
                        <span className="text-white">{net?.name || proj.networkId}</span>
                      </div>
                      <div className="flex justify-between text-[#A7ADB5]">
                        <span>Hostname:</span>
                        <span className="text-white truncate max-w-[180px]">{primaryDomain}</span>
                      </div>
                      <div className="flex justify-between text-[#A7ADB5]">
                        <span>Uptime / Latency:</span>
                        <span className="text-[#10B981]">{proj.diagnostics.uptimePercent}% ({proj.diagnostics.avgLatencyMs}ms)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#202328] flex items-center justify-between">
                    <span className="text-[11px] text-[#A7ADB5] font-mono">
                      {formatNumber(proj.usage.currentRequests)} reqs
                    </span>
                    <Link
                      to={`/eaas/projects/${proj.id}`}
                      className="px-3 py-1.5 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs font-medium text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Diagnostics and Network Status Banner */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#1677FF]" />
              <h3 className="text-sm font-semibold text-white">Global Downstream Infrastructure Status</h3>
            </div>
            <span className="text-xs text-[#10B981] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              All Ingestion Nodes Nominal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {networks.map(n => (
              <div key={n.id} className="p-3 rounded-lg bg-[#0E1012] border border-[#202328] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{n.name}</span>
                  <span className="text-[#10B981] text-[10px] uppercase font-semibold">{n.indexingStatus}</span>
                </div>
                <div className="text-[11px] text-[#A7ADB5]">Block Height: #{formatNumber(n.lastBlockIndexed)}</div>
                <div className="text-[10px] text-[#5D646E] truncate">RPC: {n.rpcUrl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
