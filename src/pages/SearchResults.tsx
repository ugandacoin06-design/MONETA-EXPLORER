import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Box, ArrowRightLeft, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { formatHash } from '../utils';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <SearchIcon className="w-6 h-6 text-blue-400" />
          Search Results
        </h1>
        <p className="text-slate-400 text-sm mt-1">Showing results for: <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded">{query}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mock Results */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase tracking-wider">Transaction</span>
          </div>
          <h3 className="text-lg font-mono text-white mb-2 line-clamp-1">{query.length > 20 ? formatHash(query) : '0x3a4...e92f'}</h3>
          <p className="text-sm text-slate-400 mb-6">Mined 12s ago in Block 1459203.</p>
          <Link to={`/transactions/${query}`} className="text-sm text-blue-400 font-medium hover:underline">View Transaction &rarr;</Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase tracking-wider">Block</span>
          </div>
          <h3 className="text-lg font-mono text-white mb-2">Block #1459203</h3>
          <p className="text-sm text-slate-400 mb-6">142 transactions • Produced by MonetaNode-01</p>
          <Link to="/blocks/1459203" className="text-sm text-blue-400 font-medium hover:underline">View Block &rarr;</Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Wallet className="w-5 h-5" />
            </div>
             <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase tracking-wider">Address</span>
          </div>
          <h3 className="text-lg font-mono text-white mb-2 line-clamp-1">{query.length > 20 ? formatHash(query) : '0x71C...973E'}</h3>
          <p className="text-sm text-slate-400 mb-6">Balance: 12,500 MNT • 45 Txns</p>
          <Link to="/addresses" className="text-sm text-blue-400 font-medium hover:underline">View Address &rarr;</Link>
        </motion.div>
      </div>
    </div>
  );
}
