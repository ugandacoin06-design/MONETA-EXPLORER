import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { BarChart as BarChartIcon, TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { CHART_DATA } from '../data/mockData';

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
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

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BarChartIcon className="w-6 h-6 text-blue-400" />
          Analytics Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">Deep insights into network usage, fees, and growth trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Total active Wallets', value: '45,210', icon: Users, diff: '+12%', up: true },
          { label: 'Transactions (30d)', value: '18.4M', icon: Activity, diff: '+5.4%', up: true },
          { label: 'Avg Base Fee', value: '0.00018 MNT', icon: TrendingDown, diff: '-2.1%', up: false },
          { label: 'Validator Revenue', value: '1.2M MNT', icon: TrendingUp, diff: '+8.7%', up: true }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-slate-600" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
            <div className={`text-xs font-medium flex items-center gap-1 ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stat.diff} {stat.up ? 'from last month' : 'from last month'}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-[350px]"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Transaction Volume (30 Days)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip content={<CUSTOM_TOOLTIP />} />
              <Bar dataKey="volume" name="Volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-[350px]"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Active Wallet Growth</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip content={<CUSTOM_TOOLTIP />} />
              <Line type="monotone" dataKey="volume" name="Wallets" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
