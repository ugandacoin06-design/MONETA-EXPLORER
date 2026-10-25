import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { BarChart as BarChartIcon, TrendingUp, TrendingDown, Users, Activity, Fuel } from 'lucide-react';
import { CHART_DATA, NETWORK_INFO } from '../data/mockData';

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#15171A] border border-[#202328] p-3 rounded-lg shadow-xl text-xs font-mono">
        <p className="text-[#A7ADB5] mb-1">{label} UTC</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="font-semibold text-white">
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Telemetry & Metrics</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Performance Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BarChartIcon className="w-7 h-7 text-[#1677FF]" />
            Network Analytics
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Aggregated metrics on throughput, gas utilization, transaction volume, and wallet activity.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] flex items-center gap-2 self-start md:self-auto font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
          <span>Aggregated Telemetry (Devnet)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[ 
          { label: 'Active Wallets (30d)', value: '45,210', icon: Users, diff: '+12.4%', up: true },
          { label: '30-Day Volume', value: '18,420,000 tx', icon: Activity, diff: '+5.4%', up: true },
          { label: 'Base Gas Target', value: '0.00018 MNTA', icon: Fuel, diff: '-2.1%', up: false },
          { label: 'Validator Staking Yield', value: '6.8% APR', icon: TrendingUp, diff: '+0.5%', up: true }
        ].map((stat, i) => (
          <div 
            key={i}
            className="bg-[#15171A] border border-[#202328] rounded-xl p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-[#1677FF]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-2">{stat.value}</div>
            <div className={`text-xs font-mono flex items-center gap-1 ${stat.up ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {stat.diff} vs prior window
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Transaction Volume (24 Hours)</h2>
            <span className="text-xs font-mono text-[#A7ADB5]">Hourly aggregated</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202328" vertical={false} />
                <XAxis dataKey="time" stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="volume" name="Transactions" fill="#1677FF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Throughput (TPS Rate)</h2>
            <span className="text-xs font-mono text-[#A7ADB5]">Avg: 350 tx/s</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202328" vertical={false} />
                <XAxis dataKey="time" stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CUSTOM_TOOLTIP />} />
                <Line type="monotone" dataKey="tps" name="Transactions / sec" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
