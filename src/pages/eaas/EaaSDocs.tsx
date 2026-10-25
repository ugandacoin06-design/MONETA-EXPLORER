import React from 'react';
import { BookOpen, Terminal, Code, CheckCircle2, Server, Globe, Key, AlertCircle } from 'lucide-react';
import { EaaSNav } from '../../components/eaas/EaaSNav';
import { BACKEND_CONTRACTS } from '../../services/eaasClient';

export function EaaSDocs() {
  return (
    <div className="space-y-8 pb-20">
      <EaaSNav />

      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#202328] pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Technical Reference</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">EaaS Integration Spec</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-[#1677FF]" />
            Explorer as a Service Integration Guide
          </h1>
          <p className="text-xs text-[#A7ADB5] mt-1">
            Complete developer instructions for provisioning, white-labeling, and integrating MONETA CHAIN explorers.
          </p>
        </div>

        {/* 1. Architecture Overview */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4 text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-[#1677FF]" />
            <span>1. Architecture & Multi-Tenant Isolation</span>
          </h2>
          <p className="text-[#A7ADB5] leading-relaxed">
            MONETASCAN Explorer as a Service isolates each customer's blockchain indexer into a dedicated tenant namespace. Whether running in <strong>Public</strong>, <strong>Consortium</strong>, or <strong>Private</strong> mode, transaction streams and zero-knowledge circuit proofs are evaluated inside isolated container pods.
          </p>
        </div>

        {/* 2. Custom Domain DNS Setup */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4 text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1677FF]" />
            <span>2. Custom Domain DNS Configuration</span>
          </h2>
          <p className="text-[#A7ADB5] leading-relaxed">
            To point your custom domain (e.g. <code className="text-white font-mono">explorer.yourdomain.com</code>) to your hosted explorer instance:
          </p>

          <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] space-y-2 font-mono text-[11px]">
            <div className="flex justify-between border-b border-[#202328] pb-2 text-[#A7ADB5]">
              <span>Record Type</span>
              <span>Host / Name</span>
              <span>Target Value</span>
            </div>
            <div className="flex justify-between text-white font-bold">
              <span className="text-[#1677FF]">CNAME</span>
              <span>explorer</span>
              <span>eaas.moneta.network</span>
            </div>
          </div>
          <p className="text-[11px] text-[#5D646E]">
            Once your DNS provider propagates the record, select <strong>"Verify DNS Record"</strong> in your Project Domains tab to automatically issue TLS certificates.
          </p>
        </div>

        {/* 3. Missing Backend Endpoints Checklist */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4 text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-[#1677FF]" />
            <span>3. Backend Service Contract Specification</span>
          </h2>
          <p className="text-[#A7ADB5] leading-relaxed">
            The frontend client adheres strictly to these backend REST and gRPC API contracts. When deploying the live backend microservices, wire up the following routes:
          </p>

          <div className="space-y-3 font-mono text-[11px]">
            {Object.entries(BACKEND_CONTRACTS).map(([key, contract]) => (
              <div key={key} className="p-3.5 rounded-lg bg-[#0E1012] border border-[#202328] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">
                    <span className="text-[#1677FF] mr-2">{contract.method}</span>
                    {contract.endpoint}
                  </span>
                  <span className={`px-2 py-0.2 rounded text-[10px] uppercase font-bold ${
                    contract.status === 'live_backend_verified' 
                      ? 'text-[#10B981] bg-[#10B981]/15' 
                      : 'text-[#E5A93C] bg-[#E5A93C]/15'
                  }`}>
                    {contract.status}
                  </span>
                </div>
                <div className="text-[#A7ADB5]">{contract.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
