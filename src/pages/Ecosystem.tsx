import React from 'react';
import { ExternalLink, Database, Link as LinkIcon, Globe, ShieldCheck } from 'lucide-react';

export function Ecosystem() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Infrastructure Network</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">Consortium Hub</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Globe className="w-7 h-7 text-[#1677FF]" />
          MONETA Ecosystem
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1 max-w-2xl">
          The sovereign blockchain infrastructure, oracle integrations, and connected digital economy services powering the MONETA network.
        </p>
      </div>

      {/* Ecosystem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MONETA CHAIN Card with Official Website Link */}
        <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between hover:border-[#1677FF]/50 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#1677FF]/15 border border-[#1677FF]/30 flex items-center justify-center mb-5 text-[#1677FF]">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">MONETA CHAIN</h2>
            <p className="text-xs text-[#A7ADB5] leading-relaxed mb-6">
              The foundational hybrid consortium blockchain infrastructure powering high-throughput enterprise transactions, sovereign governance, and privacy-preserving smart contract execution.
            </p>
          </div>

          <div className="pt-4 border-t border-[#202328] space-y-2">
            <a 
              href="https://moneta-chain.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold text-xs transition-colors group"
            >
              <span>Visit Official MONETA Chain Website</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <div className="text-[11px] font-mono text-[#A7ADB5] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span>https://moneta-chain.vercel.app/</span>
            </div>
          </div>
        </div>

        {/* MONETA ORACLE Card */}
        <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between hover:border-[#202328] transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#202328] flex items-center justify-center mb-5 text-[#10B981]">
              <LinkIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">MONETA ORACLE</h2>
            <p className="text-xs text-[#A7ADB5] leading-relaxed mb-6">
              Decentralized oracle infrastructure delivering verified real-world market feeds, foreign exchange rates, and cryptographic proofs to MONETA consortium contracts.
            </p>
          </div>

          <div className="pt-4 border-t border-[#202328] space-y-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#202328] text-[#5D646E] text-xs font-semibold cursor-not-allowed">
              <span>Oracle Gateway Coming Soon</span>
            </span>
            <div className="text-[11px] font-mono text-[#5D646E]">
              Official deployment in preparation by consortium validators
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Architecture Footnote */}
      <div className="p-6 rounded-xl bg-[#0E1012] border border-[#202328] text-center space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#1677FF] font-semibold">Consortium Infrastructure</span>
        <h3 className="text-base font-bold text-white">ONE ECOSYSTEM. CONNECTED INFRASTRUCTURE.</h3>
        <p className="text-xs text-[#A7ADB5] max-w-lg mx-auto">
          MONETASCAN acts as the universal verification layer across all current and future MONETA network components.
        </p>
      </div>
    </div>
  );
}
