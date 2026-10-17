import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Layers, Globe } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { CHART_DATA } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-lg shadow-xl">
        <p className="text-slate-300 text-xs mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function NetworkOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          Network Overview
        </h1>
        <p className="text-slate-400 text-sm mt-1">Status and performance metrics of the MONETA hybrid chain.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Network Topology / Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Chain Health</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300 font-medium">Public Chain</span>
              </div>
              <span className="text-green-400 text-sm font-medium uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Operational
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300 font-medium">Consortium Chain A</span>
              </div>
              <span className="text-green-400 text-sm font-medium uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Operational
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-purple-400" />
                <span className="text-slate-300 font-medium">Consortium Chain B</span>
              </div>
              <span className="text-yellow-400 text-sm font-medium uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                Syncing (98%)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="text-3xl font-bold text-white mb-1">2.4s</p>
            <p className="text-sm text-slate-500 font-medium uppercase">Avg Block Time</p>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
             <Activity className="w-8 h-8 text-blue-400 mb-3" />
            <p className="text-3xl font-bold text-white mb-1">350</p>
            <p className="text-sm text-slate-500 font-medium uppercase">Peak TPS</p>
          </div>
           <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center col-span-2">
            <p className="text-xs text-emerald-400 font-medium uppercase tracking-widest mb-1 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-full">Network Status</p>
            <p className="text-lg font-bold text-white">All Systems Operational</p>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-[400px]"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Transactions per Second (24h)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tps" name="TPS" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorTps)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-[400px]"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Transfer Volume (MNT)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="volume" name="Volume" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
