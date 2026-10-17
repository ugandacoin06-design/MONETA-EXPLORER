import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, EyeOff, Eye, Download, Shield, Settings2, ShieldCheck, Clock } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export function PrivateDashboard() {
  const { role } = useRole();
  const [hideBalance, setHideBalance] = useState(false);
  const [transactions] = useState([
    { id: '1', hash: '0x3f...92a1', type: 'Sent', amount: '150.00', counterparty: 'Supplier A', date: '2 mins ago', status: 'Confirmed' },
    { id: '2', hash: '0x8a...4b12', type: 'Received', amount: '500.00', counterparty: 'Client X', date: '1 hour ago', status: 'Confirmed' },
    { id: '3', hash: '0x1c...7d99', type: 'Sent', amount: '20.50', counterparty: 'Service Fee', date: '5 hours ago', status: 'Confirmed' },
  ]);

  if (role === 'public') {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Shield className="w-12 h-12 text-slate-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Private Dashboard</h2>
        <p className="text-slate-400">Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Dashboard</h1>
          <p className="text-slate-400 text-sm">Manage your assets, transactions, and privacy settings.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
          Export Data (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 p-6 rounded-xl bg-slate-900/50 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-400" />
              Total Balance
            </h2>
            <button 
              onClick={() => setHideBalance(!hideBalance)}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg bg-slate-800"
            >
              {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">
              {hideBalance ? '••••••••' : '12,450.00'}
            </span>
            {!hideBalance && <span className="text-xl text-slate-400">MONETA</span>}
          </div>
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">Send</button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">Receive</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
        >
           <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Settings2 className="w-5 h-5 text-emerald-400" />
              Privacy Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Hide balance on public screens</span>
                <div className="relative inline-flex items-center h-5 rounded-full w-9">
                  <div className="w-9 h-5 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform translate-x-4"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Remember address labels</span>
                <div className="relative inline-flex items-center h-5 rounded-full w-9">
                  <div className="w-9 h-5 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform translate-x-4"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Enable stealth mode by default</span>
                <div className="relative inline-flex items-center h-5 rounded-full w-9">
                   <div className="w-9 h-5 bg-slate-700 rounded-full"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform translate-x-0"></div>
                </div>
              </label>
            </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-sm text-slate-500">
                <th className="p-4 font-medium">Tx Hash</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Counterparty</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm text-blue-400">{tx.hash}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${tx.type === 'Sent' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">{tx.counterparty}</td>
                  <td className="p-4 text-sm text-white font-medium">{tx.amount} MONETA</td>
                  <td className="p-4 text-sm text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {tx.date}
                  </td>
                  <td className="p-4 text-right">
                     <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View Details</button>
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
