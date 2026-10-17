import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRightLeft, Search, Filter } from 'lucide-react';
import { LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash } from '../utils';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

export function Transactions() {
  const [page, setPage] = useState(1);
  const { role } = useRole();
  const isPublic = role === 'public';
  
  const totalItems = 3284501;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ArrowRightLeft className="w-6 h-6 text-blue-400" />
            Transactions
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time ledger of all network transfers and contract calls.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search by Tx Hash..." 
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
                <th className="px-6 py-4">Transaction Hash</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {Array.from({ length: 15 }).map((_, i) => {
                const tx = LATEST_TRANSACTIONS[i % LATEST_TRANSACTIONS.length];
                
                return (
                  <tr key={`${tx.hash}-${i}`} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm">
                      <Link to={`/transactions/${tx.hash}`} className="text-blue-400 hover:text-blue-300">
                        {tx.hash.substring(0, 16)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{tx.time}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-400 hover:text-slate-300 cursor-pointer">
                      {isPublic ? 'Confidential' : formatHash(tx.from)}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-400 hover:text-slate-300 cursor-pointer">
                      {isPublic ? 'Confidential' : formatHash(tx.to)}
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">
                       {isPublic ? <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded text-xs select-none">●●●●●</span> : tx.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                       {isPublic ? <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded text-xs select-none">●●●●</span> : tx.fee}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                       {tx.status === 'success' ? (
                         <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs">
                           Success
                         </span>
                       ) : tx.status === 'pending' ? (
                         <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs w-full animate-pulse">
                           Pending
                         </span>
                       ) : (
                         <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs">
                           Failed
                         </span>
                       )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span className="text-center sm:text-left">Showing {itemsPerPage * (page - 1) + 1} - {Math.min(itemsPerPage * page, totalItems)} of {totalItems.toLocaleString()} transactions</span>
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
