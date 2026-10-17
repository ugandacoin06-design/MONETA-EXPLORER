import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Database, Link as LinkIcon, Globe } from 'lucide-react';

export function Ecosystem() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">MONETA EXPLORER</h1>
        <p className="text-xl text-blue-400 font-medium mb-4">EXPLORE THE MONETA ECOSYSTEM</p>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          MONETA Explorer is the official window into the MONETA blockchain, providing visibility into the network and its on-chain activity.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-6 h-6 text-emerald-400" />
          MONETA ECOSYSTEM
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col h-full hover:border-blue-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">MONETA CHAIN</h3>
            <p className="text-slate-400 mb-8 flex-1">
              The blockchain infrastructure powering the MONETA ecosystem.
            </p>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 w-fit transition-colors cursor-not-allowed opacity-70">
                VISIT MONETA CHAIN <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500">Official link coming soon.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col h-full hover:border-emerald-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <LinkIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">MONETA ORACLE</h3>
            <p className="text-slate-400 mb-8 flex-1">
              The data and oracle infrastructure connecting trusted information with the MONETA ecosystem.
            </p>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 w-fit transition-colors cursor-not-allowed opacity-70">
                VISIT MONETA ORACLE <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500">Official link coming soon.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center"
      >
        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Official Ecosystem Links</h3>
        <p className="text-slate-400 font-medium mb-4">MONETA CHAIN | MONETA ORACLE</p>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-8">
          Official website links will be added once they are released by the MONETA team.
        </p>
        <div className="inline-block px-6 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-300 tracking-widest uppercase">
          One Ecosystem. Connected Infrastructure.
        </div>
      </motion.div>
    </div>
  );
}
