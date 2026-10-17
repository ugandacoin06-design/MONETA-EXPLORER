import React, { useState } from 'react';
import { User, Shield, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function AccessRole() {
  const [connected, setConnected] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <User className="w-6 h-6 text-blue-400" />
          Access & Roles Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your identity and permissions on the MONETA hybrid chain.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 border border-blue-500/30 bg-blue-900/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-blue-500 flex items-center justify-center mb-4 z-10 transition-colors">
            <User className={`w-10 h-10 ${connected ? 'text-slate-300' : 'text-slate-600'}`} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1 z-10">{connected ? 'Consortium Admin' : 'Guest'}</h2>
          <p className="text-slate-400 text-sm mb-4 z-10">{connected ? 'Alex Node Operator' : 'No Wallet Connected'}</p>
          
          {connected ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Connected
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-8 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Disconnected
            </div>
          )}

          <button 
            onClick={() => setConnected(!connected)}
            className={`w-full py-2.5 rounded-lg font-medium transition-colors border z-10 ${connected ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'}`}>
            {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" /> Current Role & Access
            </h2>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 transition-opacity ${connected ? 'opacity-100' : 'opacity-40'}`}>
              <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-900/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-300">Validator</span>
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs text-blue-200/70">Can propose blocks and participate in consensus.</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-purple-500 bg-purple-900/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-purple-300">Consortium Member</span>
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-xs text-purple-200/70">Can vote on governance and view private chain data.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 opacity-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-300">Super Admin</span>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                </div>
                <p className="text-xs text-slate-400">Can add/remove members from consortium.</p>
              </div>
            </div>

            <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">What You Can View</h3>
            <div className={`space-y-3 transition-opacity ${connected ? 'opacity-100' : 'opacity-40'}`}>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> Public Chain Data
                </span>
                <span className="text-emerald-400 font-mono text-xs">Granted</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> Consortium Chain A (Payments)
                </span>
                <span className="text-emerald-400 font-mono text-xs">Granted</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 opacity-60 text-slate-400">
                <span className="text-sm font-medium flex items-center gap-2">
                  <EyeOff className="w-4 h-4" /> Consortium Chain B (Identity)
                </span>
                <span className="font-mono text-xs">Restricted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
