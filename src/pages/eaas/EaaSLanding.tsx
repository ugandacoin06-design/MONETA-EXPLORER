import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Lock, 
  Server, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Cpu,
  Database,
  Code
} from 'lucide-react';
import { INITIAL_NETWORKS } from '../../data/eaasData';

export function EaaSLanding() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto pt-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#15171A] border border-[#202328] text-xs font-mono text-[#A7ADB5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-pulse"></span>
          <span>MONETASCAN · EXPLORER AS A SERVICE (EaaS)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          HOSTED BLOCKCHAIN EXPLORERS.<br />
          <span className="text-[#A7ADB5]">ZERO INFRASTRUCTURE HEADACHES.</span>
        </h1>

        <p className="text-lg sm:text-xl font-bold text-white tracking-widest uppercase">
          VISIBLE TRUTH. INVISIBLE WEALTH.
        </p>

        <p className="text-sm md:text-base text-[#A7ADB5] max-w-2xl mx-auto leading-relaxed">
          Create, brand, host, and operate production-ready blockchain explorers for any MONETA CHAIN network—Public, Private, or Consortium. Backed by dedicated indexing clusters, zero-knowledge verification, and enterprise SLA.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/eaas/dashboard"
            className="px-6 py-3 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center gap-2 shadow-lg"
          >
            <span>Open Customer Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/eaas/projects/new"
            className="px-6 py-3 bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors"
          >
            Create New Explorer
          </Link>
          <Link
            to="/eaas/docs"
            className="px-6 py-3 bg-transparent hover:bg-[#15171A] text-[#A7ADB5] hover:text-white text-xs font-mono transition-colors"
          >
            View API & Docs &rarr;
          </Link>
        </div>
      </div>

      {/* Network Modes: Public, Private, Consortium */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold font-mono">
            Supported Network Architectures
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Configured for Every MONETA Mode</h2>
          <p className="text-xs text-[#A7ADB5]">
            Isolated environments with cryptographic access boundaries. Public data stays open, private circuits stay shielded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_NETWORKS.map((net) => {
            let modeBadgeColor = 'text-[#1677FF] bg-[#1677FF]/15 border-[#1677FF]/30';
            let Icon = Globe;
            if (net.mode === 'consortium') {
              modeBadgeColor = 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
              Icon = Server;
            } else if (net.mode === 'private') {
              modeBadgeColor = 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30';
              Icon = Lock;
            }

            return (
              <div 
                key={net.id}
                className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between hover:border-[#1677FF]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold border ${modeBadgeColor}`}>
                      {net.mode} Mode
                    </span>
                    <Icon className="w-5 h-5 text-[#A7ADB5]" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{net.name}</h3>
                    <p className="text-xs text-[#A7ADB5] mt-1 leading-relaxed">
                      {net.description}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[#0E1012] border border-[#202328] space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between text-[#A7ADB5]">
                      <span>Chain ID:</span>
                      <span className="text-white">{net.chainId}</span>
                    </div>
                    <div className="flex justify-between text-[#A7ADB5]">
                      <span>Consensus:</span>
                      <span className="text-white">{net.consensus}</span>
                    </div>
                    <div className="flex justify-between text-[#A7ADB5]">
                      <span>Active Nodes:</span>
                      <span className="text-[#10B981]">{net.nodeCount} Verified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#202328] flex items-center justify-between">
                  <span className="text-xs text-[#A7ADB5] font-mono">Indexing: {net.indexingProgress}%</span>
                  <Link
                    to={`/eaas/projects/new?network=${net.id}`}
                    className="text-xs text-[#1677FF] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Deploy on {net.mode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core EaaS Features */}
      <div className="max-w-6xl mx-auto p-8 md:p-12 rounded-xl bg-[#15171A] border border-[#202328] space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold font-mono">
            Platform Capabilities
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Full-Stack Explorer Provisioning</h2>
          <p className="text-xs text-[#A7ADB5]">
            Everything you need to launch a sovereign, institutional, or public blockchain viewer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Custom Domain & SSL</h4>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Attach your company domain (e.g. explorer.mychain.com) with automatic Let's Encrypt TLS provisioning.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">White-Label Branding</h4>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Custom logos, branding titles, theme color adjustments, and black-first typography aligned to your company.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
              <Terminal className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">High-Speed JSON-RPC & WS</h4>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Dedicated API keys with customized rate limits, automated DDoS mitigation, and live WebSocket block ingestion.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Team RBAC & Audit Logs</h4>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Granular access control (Owner, Admin, Developer, Viewer) with immutable audit logging for SOC2 compliance.
            </p>
          </div>
        </div>

        {/* Backend Connectivity Status Box */}
        <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
            <div>
              <span className="text-white font-semibold">Backend Orchestration Status: </span>
              <span className="text-[#A7ADB5]">Ready for live RPC & container orchestration deployment.</span>
            </div>
          </div>
          <Link
            to="/eaas/dashboard"
            className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded text-xs font-sans font-semibold transition-colors shrink-0 text-center"
          >
            Launch EaaS Console &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
