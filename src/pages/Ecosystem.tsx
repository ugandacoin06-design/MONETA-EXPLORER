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
            <div className="flex flex-col gap-2">
              <a 
                href="https://moneta-chain.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm w-fit transition-all shadow-lg shadow-blue-900/20 group"
              >
                <span>VISIT MONETA CHAIN</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-xs text-blue-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                https://moneta-chain.vercel.app/
              </span>
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
        className="mt-12 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-10 w-96 h-20 bg-blue-500/10 blur-2xl rounded-full" />
        <h3 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">OFFICIAL ECOSYSTEM LINKS</h3>
        <p className="text-xl font-bold text-white mb-3">MONETA CHAIN | MONETA ORACLE</p>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
          Official website links will be added once they are released by the MONETA team.
        </p>
        <div className="inline-block px-6 py-2 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 tracking-widest uppercase">
          ONE ECOSYSTEM. CONNECTED INFRASTRUCTURE.
        </div>
      </motion.div>
    </div>
  );
}
