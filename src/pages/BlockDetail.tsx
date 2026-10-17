import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, ArrowLeft, Clock, ShieldCheck, Database, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';

export function BlockDetail() {
  const { id } = useParams<{ id: string }>();
  const height = parseInt(id || '0', 10);
  
  // Find block or generate a mock one based on ID
  const block = LATEST_BLOCKS.find(b => b.height === height) || {
    height,
    hash: `0x${Math.random().toString(16).substring(2, 14)}...${Math.random().toString(16).substring(2, 6)}`,
    txCount: Math.floor(Math.random() * 200) + 10,
    validator: 'MonetaNode-04',
    size: `${Math.floor(Math.random() * 50) + 10} KB`,
    time: '2 mins ago',
    status: 'confirmed'
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/blocks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Blocks
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Box className="w-6 h-6 text-blue-400" />
          Block #{formatNumber(block.height)}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-white">Block Properties</h2>
            </div>
            <div className="divide-y divide-slate-800/50">
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Block Height:</span>
                <span className="text-white font-medium">{formatNumber(block.height)}</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Block Hash:</span>
                <span className="text-slate-300 font-mono break-all">{block.hash}</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Timestamp:</span>
                <span className="text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {block.time} (May 24, 2026 12:45:00 UTC)
                </span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Validator:</span>
                <span className="text-blue-400 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {block.validator}
                </span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Transactions:</span>
                <span className="text-slate-300">{block.txCount} transactions internally</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-slate-500 w-32 shrink-0">Size:</span>
                <span className="text-slate-300">{block.size}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Transactions</h2>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Showing first 5</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-medium">
                    <th className="px-6 py-4">Hash</th>
                    <th className="px-6 py-4">From</th>
                    <th className="px-6 py-4">To</th>
                    <th className="px-6 py-4 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {LATEST_TRANSACTIONS.slice(0, 5).map((tx) => (
                    <tr key={tx.hash} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-mono text-sm">
                        <Link to={`/transactions/${tx.hash}`} className="text-blue-400 hover:text-blue-300">
                          {formatHash(tx.hash)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{formatHash(tx.from)}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{formatHash(tx.to)}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium text-right">{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6"
          >
            <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">Navigation</h3>
            <div className="flex items-center gap-4">
              <Link 
                to={`/blocks/${height - 1}`} 
                className="flex-1 py-2 text-center bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
              >
                &larr; Prev Block
              </Link>
              <Link 
                to={`/blocks/${height + 1}`} 
                className="flex-1 py-2 text-center bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm transition-colors"
              >
                Next Block &rarr;
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6"
          >
            <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">Network Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Status</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Confirmed
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Chain Data</div>
                  <div className="text-xs text-slate-400">Consortium A</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
