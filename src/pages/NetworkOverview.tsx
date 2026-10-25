import React from 'react';
import { Activity, Zap, Layers, Globe } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { CHART_DATA, NETWORK_INFO } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
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

export function NetworkOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Consortium Topology</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">State Commitment</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Activity className="w-7 h-7 text-[#1677FF]" />
          Network Topology & Health
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1">
          Operational status of public verification rollup and consortium settlement chains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topology */}
        <div className="bg-[#15171A] border border-[#202328] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#1677FF]" />
            <h2 className="text-sm font-semibold text-white">Partition Health</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#0E1012] rounded-lg border border-[#202328]">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#1677FF]" />
                <span className="text-white text-xs font-medium">Public Verification Rollup</span>
              </div>
              <span className="text-[#10B981] text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                Operational
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3.5 bg-[#0E1012] rounded-lg border border-[#202328]">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#1677FF]" />
                <span className="text-white text-xs font-medium">Consortium Partition A (Gross Settlement)</span>
              </div>
              <span className="text-[#10B981] text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                Operational
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3.5 bg-[#0E1012] rounded-lg border border-[#202328]">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#1677FF]" />
                <span className="text-white text-xs font-medium">Consortium Partition B (Identity Registry)</span>
              </div>
              <span className="text-[#10B981] text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                Operational
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5 flex flex-col justify-center items-center text-center">
            <Zap className="w-6 h-6 text-[#1677FF] mb-2" />
            <p className="text-3xl font-bold font-mono text-white mb-1">2.4s</p>
            <p className="text-xs text-[#A7ADB5] font-medium uppercase font-mono">Block Time</p>
          </div>
          <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5 flex flex-col justify-center items-center text-center">
            <Activity className="w-6 h-6 text-[#1677FF] mb-2" />
            <p className="text-3xl font-bold font-mono text-white mb-1">350</p>
            <p className="text-xs text-[#A7ADB5] font-medium uppercase font-mono">Nominal TPS</p>
          </div>
          <div className="bg-[#15171A] border border-[#202328] rounded-xl p-4 flex flex-col justify-center items-center text-center col-span-2">
            <p className="text-xs text-[#10B981] font-mono mb-1">Devnet Simulator Environment</p>
            <p className="text-sm font-semibold text-white">All Protocol Invariants Passing</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5">
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Throughput (TPS Rate)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202328" vertical={false} />
                <XAxis dataKey="time" stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="tps" name="TPS" stroke="#1677FF" strokeWidth={2} fillOpacity={0.15} fill="#1677FF" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#15171A] border border-[#202328] rounded-xl p-5">
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Transfer Volume (MNTA)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202328" vertical={false} />
                <XAxis dataKey="time" stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#5D646E" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" name="Volume" fill="#1677FF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
