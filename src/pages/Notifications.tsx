import React, { useState } from 'react';
import { Bell, Box, ArrowRightLeft, ShieldAlert, Vote, CheckCircle2 } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'block', title: 'New Consortium Block Committed', desc: 'Block #1,459,203 mined successfully by MonetaNode-01.', time: '2 mins ago', icon: Box },
  { id: 2, type: 'alert', title: 'Large Settlement Movement', desc: 'Settlement of 50,000 MNTA verified across consortium partition.', time: '15 mins ago', icon: ArrowRightLeft },
  { id: 3, type: 'validator', title: 'Consensus Round Completed', desc: 'All 42 active validators signed state root commitment.', time: '1 hour ago', icon: CheckCircle2 },
  { id: 4, type: 'gov', title: 'New Protocol Proposal MIP-43', desc: 'MIP-43: Propose increase of block gas target for zero-knowledge verify operations.', time: '3 hours ago', icon: Vote },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Feed</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Consortium Alerts</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Bell className="w-7 h-7 text-[#1677FF]" />
            Notifications & Event Stream
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Real-time feed of network state transitions, proposal alerts, and validator operational events.
          </p>
        </div>
        <button 
          type="button"
          onClick={() => setNotifications([])}
          className="px-3 py-1.5 bg-[#15171A] hover:bg-[#202328] text-[#A7ADB5] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#202328] disabled:opacity-40"
          disabled={notifications.length === 0}
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-[#202328]/60">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div 
                  key={notif.id}
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                  className="p-5 hover:bg-[#191C21] transition-colors flex gap-4 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#202328] flex items-center justify-center text-[#1677FF] shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white truncate">{notif.title}</h3>
                      <span className="text-xs font-mono text-[#A7ADB5] shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-[#A7ADB5] leading-relaxed">{notif.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-[#A7ADB5] text-xs">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-30 text-[#A7ADB5]" />
            <p>All notifications have been reviewed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
