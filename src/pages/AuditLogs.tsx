import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Download, FileText, Search } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export function AuditLogs() {
  const { role } = useRole();

  if (role !== 'auditor' && role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ShieldAlert className="w-12 h-12 text-slate-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-slate-400">This area is restricted to Auditors and Admins.</p>
      </div>
    );
  }

  const logs = [
    { id: 'AL-0912', timestamp: '2026-05-24 12:45:11', actor: 'Admin (0x99...a1f)', action: 'Updated Privacy Policy', status: 'Success' },
    { id: 'AL-0911', timestamp: '2026-05-24 11:30:22', actor: 'Member Node Alpha', action: 'Exported Transaction History', status: 'Success' },
    { id: 'AL-0910', timestamp: '2026-05-24 10:15:05', actor: 'Unknown (0x12...b99)', action: 'Failed Login Attempt', status: 'Failed' },
    { id: 'AL-0909', timestamp: '2026-05-24 09:00:00', actor: 'System', action: 'Consensus Phase Switch (PoA -> PoS)', status: 'Success' },
    { id: 'AL-0908', timestamp: '2026-05-23 16:20:41', actor: 'Member Node Beta', action: 'Changed Privacy Settings (Global Hide)', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Audit Logs</h1>
          <p className="text-slate-400 text-sm">Chronological record of consortium actions for compliance and forensics.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors">
            <FileText className="w-4 h-4" />
            Generate Compliance PDF
          </button>
        </div>
      </div>

       <div className="flex items-center gap-2 p-2 bg-slate-900/50 border border-slate-800 rounded-lg">
          <Search className="w-5 h-5 text-slate-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search by actor, action, or ID..." 
            className="bg-transparent border-none focus:outline-none text-slate-200 w-full text-sm placeholder-slate-600"
          />
       </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-sm text-slate-500 bg-slate-900/80">
                <th className="p-4 font-medium">Log ID</th>
                <th className="p-4 font-medium">Timestamp (UTC)</th>
                <th className="p-4 font-medium">Actor</th>
                <th className="p-4 font-medium">Action Description</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{log.id}</td>
                  <td className="p-4 text-sm text-slate-300 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 text-sm font-medium text-blue-400">{log.actor}</td>
                  <td className="p-4 text-sm text-slate-200">{log.action}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-800 flex items-center justify-center text-sm">
           <button className="text-blue-400 hover:text-blue-300 font-medium disabled:opacity-50 transition-colors">Load More Logs</button>
        </div>
      </motion.div>
    </div>
  );
}
