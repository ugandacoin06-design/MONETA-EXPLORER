import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Server, AlertCircle, Cpu, Clock, CheckCircle2 } from 'lucide-react';
import { VALIDATORS } from '../data/mockData';
import { formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';

export function Validators() {
  const { role } = useRole();
  const isValidator = role === 'validator';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            Consortium Validators
          </h1>
          <p className="text-slate-400 text-sm mt-1">Authorized nodes securing the MONETA hybrid chain.</p>
        </div>
        {isValidator && (
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors animate-pulse">
            <Cpu className="w-4 h-4" />
            Propose Next Block (Your Turn)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Active Nodes</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">42 / 50</h3>
            </div>
            <Server className="w-8 h-8 text-blue-500/50" />
         </div>
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Avg. Uptime</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">99.94%</h3>
            </div>
            <AlertCircle className="w-8 h-8 text-emerald-500/50" />
         </div>
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Total Blocks Produced</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">{formatNumber(1459203)}</h3>
            </div>
            <ShieldCheck className="w-8 h-8 text-blue-500/50" />
         </div>
      </div>

      {isValidator && (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 p-6 rounded-2xl bg-slate-900/40 border-2 border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
             <h2 className="text-lg font-semibold text-white">Live Mempool (Your Node)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                 <tr className="text-slate-500 border-b border-slate-800">
                   <th className="pb-3 font-medium">Time in Pool</th>
                   <th className="pb-3 font-medium">Tx Hash</th>
                   <th className="pb-3 font-medium">Type</th>
                   <th className="pb-3 font-medium text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                 {[1, 2, 3].map((tx) => (
                   <tr key={tx} className="text-slate-300">
                     <td className="py-3 flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500"/> {tx * 12}s</td>
                     <td className="py-3 font-mono text-blue-400 text-xs">0xfe4...{tx}b1</td>
                     <td className="py-3">Transfer</td>
                     <td className="py-3 text-right">
                       <button className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 justify-end w-full">
                         <CheckCircle2 className="w-4 h-4"/> Include
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VALIDATORS.map((validator, index) => (
          <motion.div 
            key={validator.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border flex flex-col group transition-colors relative overflow-hidden ${
              isValidator && index === 0 ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 hover:border-blue-500/30'
            }`}
          >
            {/* Background gradient hint for active nodes */}
            {validator.status === 'active' && (
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-colors" />
            )}
            
            <div className="flex items-center justify-between mb-6 z-10">
               <div className="font-semibold text-lg text-white flex items-center gap-2">
                 {validator.name}
                 {isValidator && index === 0 && <span className="text-[10px] uppercase font-bold bg-blue-600 px-1.5 py-0.5 rounded text-white tracking-widest">You</span>}
               </div>
               {validator.status === 'active' ? (
                 <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                   Active
                 </span>
               ) : (
                 <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                   Offline
                 </span>
               )}
            </div>

            <div className="space-y-4 flex-1 z-10">
              <div>
                <p className="text-xs text-slate-500 mb-1">Voting Power</p>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: validator.votingPower }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-slate-400 font-mono">{validator.votingPower}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-slate-500">Blocks Mined</p>
                  <p className="text-sm text-slate-200 font-mono">{formatNumber(validator.blocks)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Uptime</p>
                  <p className="text-sm text-slate-200 font-mono">{validator.uptime}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between z-10">
              <span className="text-xs text-slate-400">Reputation Score</span>
              <span className={`text-sm font-bold ${validator.reputation > 90 ? 'text-emerald-400' : 'text-slate-400'}`}>
                {validator.reputation} / 100
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
