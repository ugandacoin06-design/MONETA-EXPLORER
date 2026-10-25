import React, { useState } from 'react';
import { Wallet, EyeOff, Eye, Download, Shield, Settings2, Clock } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';

export function PrivateDashboard() {
  const { role } = useRole();
  const [hideBalance, setHideBalance] = useState(false);
  const [transactions] = useState([
    { id: '1', hash: '0x3f5c...92a1', type: 'Sent', amount: '150.00 MNTA', counterparty: 'Supplier A', date: '2 mins ago', status: 'Confirmed' },
    { id: '2', hash: '0x8a1b...4b12', type: 'Received', amount: '5,000.00 MINT', counterparty: 'Client X', date: '1 hour ago', status: 'Confirmed' },
    { id: '3', hash: '0x1c9d...7d99', type: 'Sent', amount: '20.50 MNTA', counterparty: 'Consortium Fee', date: '5 hours ago', status: 'Confirmed' },
  ]);

  if (role === 'public') {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#15171A] border border-[#202328] rounded-xl text-center max-w-lg mx-auto">
        <Shield className="w-10 h-10 text-[#5D646E] mb-3" />
        <h2 className="text-base font-bold text-white mb-1">Authenticated Account Dashboard</h2>
        <p className="text-xs text-[#A7ADB5] mb-4">
          Please connect your MONETA wallet or switch to a demo authorized role (Member, Validator, Auditor) in the header.
        </p>
        <Link
          to="/access"
          className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Connect Wallet
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">User Terminal</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono capitalize">{role} Account</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Wallet className="w-7 h-7 text-[#1677FF]" />
            My Dashboard
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Authenticated overview of your private balances, token assets, and confidential transactions.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => {
            const csv = "tx_hash,type,amount,counterparty,date\n" + transactions.map(t => `${t.hash},${t.type},${t.amount},${t.counterparty},${t.date}`).join("\n");
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'moneta_account_export.csv';
            a.click();
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-white rounded-lg text-xs font-semibold transition-colors self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Activity (CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="col-span-1 md:col-span-2 p-6 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5]">Total Account Balance</span>
              <button 
                type="button"
                onClick={() => setHideBalance(!hideBalance)}
                className="p-1.5 text-[#A7ADB5] hover:text-white transition-colors rounded bg-[#0E1012] border border-[#202328]"
                title={hideBalance ? "Show balance" : "Hide balance"}
              >
                {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight mb-1">
              {hideBalance ? '••••••••' : '12,450.00'}{' '}
              <span className="text-base font-sans font-normal text-[#1677FF]">MNTA</span>
            </div>
            <div className="text-xs font-mono text-[#10B981]">
              {!hideBalance && '≈ $60,382.50 USD'}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-[#202328] mt-6">
            <button 
              type="button" 
              className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Transfer MNTA
            </button>
            <Link 
              to="/tokens"
              className="px-4 py-2 bg-[#202328] hover:bg-[#2A2E35] text-white rounded-lg text-xs font-medium transition-colors"
            >
              Token Portfolio (MINT, wBTC)
            </Link>
          </div>
        </div>

        {/* Privacy Preferences */}
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
            <Settings2 className="w-4 h-4 text-[#1677FF]" />
            Privacy Controls
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#A7ADB5]">Shield balance by default</span>
              <input 
                type="checkbox" 
                checked={hideBalance} 
                onChange={(e) => setHideBalance(e.target.checked)} 
                className="rounded accent-[#1677FF]" 
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#A7ADB5]">Mask counterparty labels</span>
              <input type="checkbox" defaultChecked className="rounded accent-[#1677FF]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#A7ADB5]">Zero-knowledge proof receipts</span>
              <input type="checkbox" defaultChecked className="rounded accent-[#1677FF]" />
            </label>
          </div>

          <div className="pt-3 border-t border-[#202328] text-[11px] text-[#5D646E] font-mono">
            State: Confidential Rollup v2
          </div>
        </div>
      </div>

      {/* Recent Authorized Transactions */}
      <div className="rounded-xl bg-[#15171A] border border-[#202328] overflow-hidden">
        <div className="p-4 bg-[#0E1012] border-b border-[#202328] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Authorized Activity History</h2>
          <span className="text-xs text-[#10B981] font-mono">Encrypted Records Decrypted</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="p-4">Tx Hash</th>
                <th className="p-4">Type</th>
                <th className="p-4">Counterparty</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-right">Age</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#191C21] transition-colors">
                  <td className="p-4 text-[#1677FF]">
                    <Link to="/transactions" className="hover:underline">
                      {tx.hash}
                    </Link>
                  </td>
                  <td className="p-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${tx.type === 'Sent' ? 'bg-[#EF4444]/15 text-[#EF4444]' : 'bg-[#10B981]/15 text-[#10B981]'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-white font-sans">{tx.counterparty}</td>
                  <td className="p-4 text-right font-bold text-white">{tx.amount}</td>
                  <td className="p-4 text-right text-[#A7ADB5] font-sans flex items-center justify-end gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5D646E]" /> {tx.date}
                  </td>
                  <td className="p-4 text-right text-[#10B981] font-sans">
                    {tx.status}
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
