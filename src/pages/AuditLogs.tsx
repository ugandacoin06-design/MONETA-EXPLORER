import React, { useState } from 'react';
import { ShieldAlert, Download, FileText, Search } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';

export function AuditLogs() {
  const { role } = useRole();
  const [filterQuery, setFilterQuery] = useState('');

  if (role !== 'auditor' && role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#15171A] border border-[#202328] rounded-xl text-center max-w-lg mx-auto">
        <ShieldAlert className="w-10 h-10 text-[#EF4444] mb-3" />
        <h2 className="text-base font-bold text-white mb-1">Auditor Credentials Required</h2>
        <p className="text-xs text-[#A7ADB5] mb-4">
          Regulatory audit logs and forensic records are restricted to Auditor or Admin roles.
        </p>
        <Link
          to="/access"
          className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Select Auditor Role
        </Link>
      </div>
    );
  }

  const logs = [
    { id: 'AL-0912', timestamp: '2026-05-24 12:45:11', actor: 'Admin (0x99...a1f)', action: 'Updated Privacy Policy', status: 'Success' },
    { id: 'AL-0911', timestamp: '2026-05-24 11:30:22', actor: 'Member Node Alpha', action: 'Exported Transaction History', status: 'Success' },
    { id: 'AL-0910', timestamp: '2026-05-24 10:15:05', actor: 'Unknown (0x12...b99)', action: 'Failed Login Attempt', status: 'Failed' },
    { id: 'AL-0909', timestamp: '2026-05-24 09:00:00', actor: 'System', action: 'Consensus Phase Commit (PBFT Invariant Check)', status: 'Success' },
    { id: 'AL-0908', timestamp: '2026-05-23 16:20:41', actor: 'Member Node Beta', action: 'Changed Privacy Settings (Global Hide)', status: 'Success' },
  ];

  const filteredLogs = logs.filter(l => 
    l.actor.toLowerCase().includes(filterQuery.toLowerCase()) || 
    l.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#8A38F5] font-semibold">Regulatory Compliance</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Immutable Audit Trail</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="w-7 h-7 text-[#1677FF]" />
            System Audit Logs
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Cryptographic forensic logs of consortium actions, administrative events, and state mutations.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => {
              const csv = "log_id,timestamp,actor,action,status\n" + logs.map(l => `${l.id},${l.timestamp},${l.actor},${l.action},${l.status}`).join("\n");
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'audit_logs.csv';
              a.click();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#15171A] border border-[#202328] rounded-lg text-xs font-semibold text-white hover:bg-[#202328] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2 bg-[#15171A] border border-[#202328] rounded-lg">
        <Search className="w-4 h-4 text-[#5D646E] ml-2" />
        <input 
          type="text" 
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter audit logs by actor, action, or ID..." 
          className="bg-transparent border-none focus:outline-none text-white w-full text-xs placeholder-[#5D646E]"
        />
      </div>

      <div className="rounded-xl bg-[#15171A] border border-[#202328] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#202328] text-[#A7ADB5] bg-[#0E1012] font-semibold uppercase tracking-wider">
                <th className="p-4">Log ID</th>
                <th className="p-4">Timestamp (UTC)</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action Description</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#191C21] transition-colors">
                  <td className="p-4 text-[#A7ADB5]">{log.id}</td>
                  <td className="p-4 text-white whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 text-[#1677FF] font-sans">{log.actor}</td>
                  <td className="p-4 text-white font-sans">{log.action}</td>
                  <td className="p-4 text-right font-sans">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${log.status === 'Success' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
