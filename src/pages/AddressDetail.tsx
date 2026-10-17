import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wallet, ArrowLeft, ArrowRightLeft, Copy, QrCode, TrendingUp, TrendingDown, Activity, Check, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';

const ACTIVITY_DATA = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 19 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 22 },
  { day: 'Sat', count: 30 },
  { day: 'Sun', count: 28 },
];

export function AddressDetail() {
  const { address } = useParams<{ address: string }>();
  const displayAddress = address || '0x71C...973E';
  const [copied, setCopied] = useState(false);
  const { role } = useRole();
  const isPublic = role === 'public';
  const isAuditor = role === 'auditor';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isPublic) {
    return (
      <div className="space-y-6">
        <div>
          <Link to="/addresses" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Address Search
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Wallet className="w-6 h-6 text-blue-400" />
              Address Details
            </h1>
          </div>
          <p className="text-slate-300 font-mono text-sm mt-2 break-all">{displayAddress}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <ShieldAlert className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Private Address</h2>
          <p className="text-slate-400 max-w-md text-center">
            This address has activity, but the details are private on the public network view. Log in if this is your address to see details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/addresses" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Address Search
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Wallet className="w-6 h-6 text-blue-400" />
            Address Details {isAuditor && <span className="text-sm px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 ml-2">Auditor View</span>}
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} 
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors cursor-not-allowed opacity-50">
              <QrCode className="w-4 h-4" /> QR Code
            </button>
          </div>
        </div>
        <p className="text-slate-300 font-mono text-sm mt-2 break-all">{displayAddress}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-center"
        >
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Balance</span>
          <div className="text-3xl font-bold text-white tracking-tight">
            {isAuditor ? 'Hidden' : '12,500'} <span className="text-lg text-blue-400">{isAuditor ? '' : 'MNT'}</span>
          </div>
          <div className="mt-4 text-emerald-400 text-sm flex items-center gap-1 font-medium">
             {!isAuditor && '$45,250.00 USD'}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6"
        >
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4 block">Token Holdings</span>
          <div className="space-y-3 text-sm text-slate-300">
            {isAuditor ? (
              <p className="text-slate-500 text-xs mt-2">Individual holdings hidden for Auditor view.</p>
            ) : (
               <>
                <div className="flex items-center justify-between">
                  <span>Wrapped BTC</span>
                  <span className="font-medium text-white">0.5 wBTC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>USDC</span>
                  <span className="font-medium text-white">1,200.00 USDC</span>
                </div>
               </>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider block">Stats</span>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400"><TrendingUp className="w-4 h-4 text-emerald-400" /> Total Received</span>
            <span className="text-white font-medium">{isAuditor ? 'Aggregated: ~50k MNT' : '45,000 MNT'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400"><TrendingDown className="w-4 h-4 text-rose-400" /> Total Sent</span>
            <span className="text-white font-medium">{isAuditor ? 'Aggregated: ~30k MNT' : '32,500 MNT'}</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-medium">
                  <th className="px-6 py-4">Hash</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Block</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {LATEST_TRANSACTIONS.map((tx, i) => (
                  <tr key={tx.hash} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm">
                      <Link to={`/transactions/${tx.hash}`} className="text-blue-400 hover:text-blue-300">
                        {formatHash(tx.hash)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        Transfer
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-400 font-mono hover:underline cursor-pointer">1459{203 - i}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">
                       {isAuditor ? (
                         <span className="text-slate-500">Aggregated View</span>
                       ) : (
                         i % 2 === 0 ? <span className="text-emerald-400">+{tx.amount}</span> : <span className="text-rose-400">-{tx.amount}</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
            <Activity className="w-5 h-5 text-blue-400" />
            Activity (Last 7 Days)
          </div>
          <div className="flex-1 min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="count" name="Transactions" stroke="#3b82f6" strokeWidth={2} fillOpacity={0.2} fill="#3b82f6" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
