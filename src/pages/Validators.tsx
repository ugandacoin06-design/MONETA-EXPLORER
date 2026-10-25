import React from 'react';
import { ShieldCheck, Server, AlertCircle, Cpu, Clock, CheckCircle2 } from 'lucide-react';
import { VALIDATORS, NETWORK_INFO } from '../data/mockData';
import { formatNumber, formatHash } from '../utils';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';

export function Validators() {
  const { role } = useRole();
  const isValidator = role === 'validator';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Consensus Layer</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Proof of Authority + PBFT</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-[#1677FF]" />
            Consortium Validators
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Authorized node operators participating in block proposal, consensus validation, and state root commitment.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] flex items-center gap-2 self-start md:self-auto font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          <span>42 Active Nodes</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Active Nodes</p>
            <h3 className="text-2xl font-bold font-mono text-white tracking-tight">42 / 50</h3>
          </div>
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
            <Server className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Average Uptime</p>
            <h3 className="text-2xl font-bold font-mono text-[#10B981] tracking-tight">99.94%</h3>
          </div>
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#10B981]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Blocks Produced</p>
            <h3 className="text-2xl font-bold font-mono text-white tracking-tight">{formatNumber(NETWORK_INFO.currentBlock)}</h3>
          </div>
          <div className="w-10 h-10 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Validators Table */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Active Validator Registry</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">Consortium Nodes (Simulated Data)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3.5">Validator Node</th>
                <th className="px-5 py-3.5">Consensus Address</th>
                <th className="px-5 py-3.5 text-right">Voting Power</th>
                <th className="px-5 py-3.5 text-right">Blocks Produced</th>
                <th className="px-5 py-3.5 text-right">Uptime</th>
                <th className="px-5 py-3.5 text-right">Commission</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {VALIDATORS.map((val) => (
                <tr key={val.id} className="hover:bg-[#191C21] transition-colors">
                  <td className="px-5 py-4 font-sans">
                    <div className="font-semibold text-white text-sm flex items-center gap-2">
                      <span>{val.name}</span>
                      {val.id === 'val_01' && (
                        <span className="text-[10px] text-[#1677FF] bg-[#1677FF]/15 px-1.5 py-0.2 rounded font-mono">
                          Genesis
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#1677FF]">
                    <Link to={`/addresses/${val.address}`} className="hover:underline">
                      {formatHash(val.address)}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-right font-bold text-white">
                    {val.votingPower}
                  </td>

                  <td className="px-5 py-4 text-right text-white">
                    {formatNumber(val.blocks)}
                  </td>

                  <td className="px-5 py-4 text-right text-[#10B981]">
                    {val.uptime}
                  </td>

                  <td className="px-5 py-4 text-right text-[#A7ADB5]">
                    {val.commission}
                  </td>

                  <td className="px-5 py-4 text-right font-sans">
                    {val.status === 'active' ? (
                      <span className="text-[#10B981] font-semibold text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="text-[#A7ADB5] font-semibold text-xs">
                        Inactive
                      </span>
                    )}
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
