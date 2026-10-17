import React, { useState } from 'react';
import { Bell, Box, ArrowRightLeft, ShieldAlert, Vote } from 'lucide-react';
import { motion } from 'motion/react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'block', title: 'New Consortium Block Mined', desc: 'Block #1,459,203 mined successfully by Partner-Gov.', time: '2 mins ago', icon: Box, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, type: 'alert', title: 'Large Transaction Alert', desc: 'Transfer of 50,000 MNT detected from 0x99B to 0x11A.', time: '15 mins ago', icon: ArrowRightLeft, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { id: 3, type: 'validator', title: 'Validator Offline', desc: 'Global-Trust node has missed 50 consecutive blocks.', time: '1 hour ago', icon: ShieldAlert, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 4, type: 'gov', title: 'New Governance Proposal', desc: 'MIP-43: Add new bridging protocol to Ethereum mainnet.', time: '3 hours ago', icon: Vote, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 5, type: 'block', title: 'Consortium Chain Synced', desc: 'Consortium Chain B has fully synced and matches global state.', time: '5 hours ago', icon: Box, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-400" />
            Notifications & Activity
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time alerts for network events and consortium updates.</p>
        </div>
        <button 
          onClick={() => setNotifications([])}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 disabled:opacity-50"
          disabled={notifications.length === 0}
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {notifications.map((notif, index) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="p-6 hover:bg-white/5 transition-colors flex gap-4 relative group cursor-pointer"
              >
                {index === 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-md" />}
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.bg}`}>
                  <notif.icon className={`w-6 h-6 ${notif.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white">{notif.title}</h3>
                    <span className="text-xs text-slate-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-400">{notif.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>You have no new notifications.</p>
          </div>
        )}
        <div className="p-4 border-t border-slate-800 text-center">
          <button className="text-blue-400 text-sm font-medium hover:underline disabled:opacity-50" disabled={notifications.length === 0}>Load More Notifications</button>
        </div>
      </div>
    </div>
  );
}
