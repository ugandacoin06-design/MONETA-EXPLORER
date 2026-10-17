import React from 'react';
import { motion } from 'motion/react';
import { Network, Users, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export function Consortium() {
  const { role } = useRole();

  if (role === 'public') {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ShieldAlert className="w-12 h-12 text-slate-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-slate-400">This area is restricted to Consortium Members, Auditors, and Admins.</p>
      </div>
    );
  }

  const isAuditorOrAdmin = role === 'auditor' || role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Consortium Activity</h1>
          <p className="text-slate-400 text-sm">Monitor private network health, node status, and internal transactions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium tracking-wide">Active Members</p>
            <p className="text-2xl font-bold text-white">12 / 15</p>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium tracking-wide">24h Internal Tx Volume</p>
            <p className="text-2xl font-bold text-white">
              {isAuditorOrAdmin ? '1.2M MONETA' : 'Hidden'}
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Network className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium tracking-wide">Network Health</p>
            <p className="text-lg font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-5 h-5"/> Optimal</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Recent Consortium Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-sm text-slate-500">
                <th className="p-4 font-medium">Tx Hash</th>
                <th className="p-4 font-medium">From Member</th>
                <th className="p-4 font-medium">To Member</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm text-blue-400">0xab{i}...9f2{i}</td>
                  <td className="p-4 text-sm text-slate-300">Member Node Alpha</td>
                  <td className="p-4 text-sm text-slate-300">Member Node Gamma</td>
                  <td className="p-4 text-sm font-medium">
                    {isAuditorOrAdmin ? (
                      <span className="text-white">{(i * 1500).toLocaleString()} MONETA</span>
                    ) : (
                      <span className="text-slate-500 flex items-center cursor-help group relative">
                        Confidential
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Amounts visible only to auditors and validators
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
