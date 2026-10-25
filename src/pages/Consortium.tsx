import React from 'react';
import { Network, Users, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';

export function Consortium() {
  const { role } = useRole();

  if (role === 'public') {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#15171A] border border-[#202328] rounded-xl text-center max-w-lg mx-auto">
        <ShieldAlert className="w-10 h-10 text-[#E5A93C] mb-3" />
        <h2 className="text-base font-bold text-white mb-1">Consortium Partition Restricted</h2>
        <p className="text-xs text-[#A7ADB5] mb-4">
          This partition requires authenticated credentials as a Consortium Member, Auditor, or Validator.
        </p>
        <Link
          to="/access"
          className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Select Role in Access Manager
        </Link>
      </div>
    );
  }

  const isAuditorOrAdmin = role === 'auditor' || role === 'admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Permissioned Partition</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">Consortium Ring</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Network className="w-7 h-7 text-[#1677FF]" />
          Consortium Activity
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1">
          Monitor private institutional settlement, member node health, and gross clearing logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#10B981]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider">Active Consortium Nodes</p>
            <p className="text-2xl font-bold font-mono text-white">12 / 15</p>
          </div>
        </div>
        
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider">24h Internal Settlement</p>
            <p className="text-2xl font-bold font-mono text-white">
              {isAuditorOrAdmin ? '1,240,000 MNTA' : 'Shielded by ZK Proof'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#10B981]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider">Ring Integrity</p>
            <p className="text-sm font-bold text-[#10B981] flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-4 h-4"/> 100% Agreement
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#15171A] border border-[#202328] overflow-hidden">
        <div className="p-4 bg-[#0E1012] border-b border-[#202328] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Recent Consortium Settlement Transactions</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">Simulated Institutional Ring</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="p-4">Tx Hash</th>
                <th className="p-4">From Member</th>
                <th className="p-4">To Member</th>
                <th className="p-4 text-right">Value</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-[#191C21] transition-colors">
                  <td className="p-4 text-[#1677FF]">0xab{i}4...9f2{i}</td>
                  <td className="p-4 text-white font-sans">Member Node Alpha</td>
                  <td className="p-4 text-white font-sans">Member Node Gamma</td>
                  <td className="p-4 text-right font-bold text-white">
                    {isAuditorOrAdmin ? (
                      `${(i * 1500).toLocaleString()} MNTA`
                    ) : (
                      <span className="text-[#5D646E] font-sans italic text-[11px]">Confidential Par</span>
                    )}
                  </td>
                  <td className="p-4 text-right text-[#10B981] font-sans">
                    Finalized
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
