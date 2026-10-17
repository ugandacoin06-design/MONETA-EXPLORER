import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Search, Filter } from 'lucide-react';
import { LATEST_BLOCKS } from '../data/mockData';
import { formatNumber } from '../utils';
import { Link } from 'react-router-dom';

export function Blocks() {
  const [page, setPage] = useState(1);
  const totalItems = 1459203;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Box className="w-6 h-6 text-blue-400" />
            Blocks
          </h1>
          <p className="text-slate-400 text-sm mt-1">Explore all blocks mined on the MONETA network.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search block height..." 
               className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
             />
           </div>
           <button className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-medium">
                <th className="px-6 py-4">Block</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Txn</th>
                <th className="px-6 py-4">Validator</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {/* Multiplying the mock data to show more rows for the dedicated page */}
              {Array.from({ length: 15 }).map((_, i) => {
                const block = LATEST_BLOCKS[i % LATEST_BLOCKS.length];
                const height = block.height - Math.floor(i / LATEST_BLOCKS.length) * LATEST_BLOCKS.length;
                
                return (
                  <tr key={`${block.hash}-${i}`} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm">
                      <Link to={`/blocks/${height}`} className="text-blue-400 hover:text-blue-300">
                        {formatNumber(height)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{block.time}</td>
                    <td className="px-6 py-4 text-sm text-slate-300 font-mono">{block.txCount}</td>
                    <td className="px-6 py-4 text-sm">
                       <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                         {block.validator}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">{block.size}</td>
                    <td className="px-6 py-4 text-sm text-right">
                       <span className="inline-flex items-center gap-1.5 text-emerald-400">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                         Confirmed
                       </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span className="text-center sm:text-left">Showing {itemsPerPage * (page - 1) + 1} - {Math.min(itemsPerPage * page, totalItems)} of {formatNumber(totalItems)} blocks</span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
