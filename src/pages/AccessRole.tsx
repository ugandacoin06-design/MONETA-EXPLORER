import React, { useState } from 'react';
import { User, Shield, CheckCircle, Eye, EyeOff, Wallet, Check } from 'lucide-react';
import { useRole, Role } from '../context/RoleContext';

export function AccessRole() {
  const { role, setRole } = useRole();
  const [connected, setConnected] = useState(role !== 'public');

  const handleToggleConnect = () => {
    if (connected) {
      setConnected(false);
      setRole('public');
    } else {
      setConnected(true);
      setRole('member');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Access Management</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">Role Credentials</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <User className="w-7 h-7 text-[#1677FF]" />
          Access & Roles Control
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1">
          Configure demo identity, wallet connection, and role-based viewing permissions across the MONETA ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet / Session Card */}
        <div className="lg:col-span-1 border border-[#202328] bg-[#15171A] rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#202328] border-2 border-[#1677FF] flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-[#1677FF]" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1 capitalize">
            {role === 'public' ? 'Public Visitor' : `${role} Session`}
          </h2>
          <p className="text-xs text-[#A7ADB5] mb-4 font-mono">
            {role === 'public' ? 'Unauthenticated Mode' : '0x71C8360537aaC1bFa199C96dd3007049Abf1973E'}
          </p>
          
          <div className="mb-6">
            {role !== 'public' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#10B981]/15 text-[#10B981] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                Wallet Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#202328] text-[#A7ADB5] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5D646E]"></span>
                Not Connected
              </span>
            )}
          </div>

          <button 
            type="button"
            onClick={handleToggleConnect}
            className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              role !== 'public' 
                ? 'bg-[#202328] hover:bg-[#2A2E35] text-white' 
                : 'bg-[#1677FF] hover:bg-[#1366DB] text-white'
            }`}
          >
            {role !== 'public' ? 'Disconnect Demo Session' : 'Simulate Wallet Connection'}
          </button>
        </div>

        {/* Roles Selector & Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#15171A] border border-[#202328] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1677FF]" /> 
              Switch Simulated Role
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { r: 'public', title: 'Public Visitor', desc: 'Browse public blocks, transactions, and validator records without account.' },
                { r: 'member', title: 'Consortium Member', desc: 'Authorized wallet with decrypted balances and transaction records.' },
                { r: 'validator', title: 'Validator Node', desc: 'Consensus monitoring, node proposing access, and operational health metrics.' },
                { r: 'auditor', title: 'Regulatory Auditor', desc: 'Access compliance-level cryptographic verification and aggregate summaries.' },
              ].map(item => (
                <button
                  key={item.r}
                  type="button"
                  onClick={() => {
                    setRole(item.r as Role);
                    setConnected(item.r !== 'public');
                  }}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    role === item.r 
                      ? 'border-[#1677FF] bg-[#1677FF]/10' 
                      : 'border-[#202328] bg-[#0E1012] hover:border-[#343A43]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-xs">{item.title}</span>
                    {role === item.r && <Check className="w-4 h-4 text-[#1677FF]" />}
                  </div>
                  <p className="text-[11px] text-[#A7ADB5] leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5] mb-3">
              Role Permission Inspection
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded bg-[#0E1012] border border-[#202328]">
                <span className="text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#1677FF]" /> Public Chain Data (Blocks & Txns)
                </span>
                <span className="text-[#10B981] font-mono">Granted</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-[#0E1012] border border-[#202328]">
                <span className="text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#1677FF]" /> Decrypted Balances & Token Holdings
                </span>
                <span className={`font-mono ${role !== 'public' ? 'text-[#10B981]' : 'text-[#5D646E]'}`}>
                  {role !== 'public' ? 'Granted' : 'Shielded'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-[#0E1012] border border-[#202328]">
                <span className="text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#1677FF]" /> Validator Operational Telemetry
                </span>
                <span className={`font-mono ${['validator', 'admin'].includes(role) ? 'text-[#10B981]' : 'text-[#5D646E]'}`}>
                  {['validator', 'admin'].includes(role) ? 'Granted' : 'Limited'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
