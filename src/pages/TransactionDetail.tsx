import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRightLeft, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { LATEST_TRANSACTIONS } from '../data/mockData';
import { formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';

export function TransactionDetail() {
  const { hash } = useParams<{ hash: string }>();
  const { role } = useRole();
  const isPublic = role === 'public';
  
  const tx = LATEST_TRANSACTIONS.find(t => t.hash === hash) || {
    hash: hash || '0x...',
    from: '0x71C...973E',
    to: '0x82D...451A',
    amount: '1,250 MNT',
    fee: '0.001 MNT',
    time: '12s ago',
    status: 'success'
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/transactions" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Transactions
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
           <ArrowRightLeft className="w-6 h-6 text-blue-400" />
           Transaction Details
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             {tx.status === 'success' ? (
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Success
                </span>
             ) : tx.status === 'pending' ? (
                <span className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-pulse" /> Pending
                </span>
             ) : (
                <span className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">
                  Failed
                </span>
             )}
          </div>
          <div className="text-slate-400 text-sm flex items-center gap-2">
             <Clock className="w-4 h-4" />
             {tx.time} (May 24, 2026 12:46:21 UTC)
          </div>
        </div>

        {isPublic && (
          <div className="p-4 bg-blue-900/10 border-b border-blue-500/20 text-sm text-blue-400 flex items-center justify-center">
            This transaction is private. Please log in with the wallet that participated to see decrypted details.
          </div>
        )}

        <div className="divide-y divide-slate-800/50 text-sm">
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">Transaction Hash:</span>
            <span className="text-slate-200 font-mono break-all md:col-span-3">{tx.hash}</span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">Status:</span>
            <span className="text-emerald-400 font-medium md:col-span-3">{tx.status === 'success' ? 'Confirmed' : tx.status}</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">Block:</span>
            <span className="md:col-span-3">
              <Link to="/blocks/1459203" className="text-blue-400 hover:text-blue-300 font-mono">
                1459203
              </Link>
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">From:</span>
            <span className="text-slate-200 font-mono break-all md:col-span-3 hover:text-blue-400 cursor-pointer">
              {isPublic ? tx.from.slice(0, 6) + '...' + tx.from.slice(-4) : tx.from}
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">To:</span>
            <span className="text-slate-200 font-mono break-all md:col-span-3 hover:text-blue-400 cursor-pointer">
              {isPublic ? tx.to.slice(0, 6) + '...' + tx.to.slice(-4) : tx.to}
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">Value:</span>
            <span className="text-white font-medium md:col-span-3 hover:opacity-80">
              {isPublic ? (
                 <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded cursor-not-allowed text-xs">Confidential</span>
              ) : (
                tx.amount
              )}
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <span className="text-slate-500 md:col-span-1">Transaction Fee:</span>
            <span className="text-slate-300 font-mono md:col-span-3">
               {isPublic ? (
                 <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded cursor-not-allowed text-xs">Confidential</span>
              ) : (
                tx.fee
              )}
            </span>
          </div>

          {!isPublic && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <span className="text-slate-500 md:col-span-1">Encrypted Memo:</span>
              <span className="text-slate-300 md:col-span-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700 italic">
                "Payment for Q2 consulting services. Invoice #4812"
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
