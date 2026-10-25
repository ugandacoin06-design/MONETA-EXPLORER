import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wallet, ArrowLeft, ArrowRightLeft, Copy, QrCode, TrendingUp, TrendingDown, Activity, Check, ShieldAlert, Coins } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LATEST_TRANSACTIONS, TOKENS } from '../data/mockData';
import { formatHash } from '../utils';
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
  const displayAddress = address || '0x71C8360537aaC1bFa199C96dd3007049Abf1973E';
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const { role } = useRole();
  const isPublic = role === 'public';
  const isAuditor = role === 'auditor';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Link */}
      <div>
        <Link to="/addresses" className="text-xs font-medium text-[#1677FF] hover:underline flex items-center gap-1.5 mb-3 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Addresses
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202328] pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Wallet className="w-7 h-7 text-[#1677FF]" />
              Address Details
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-[#A7ADB5] font-mono break-all bg-[#15171A] border border-[#202328] px-2.5 py-1 rounded">
                {displayAddress}
              </span>
              <button 
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-medium rounded transition-colors shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="px-2.5 py-1 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-medium rounded transition-colors shrink-0 flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR</span>
              </button>
            </div>
          </div>

          {isAuditor && (
            <span className="px-3 py-1 rounded bg-[#8A38F5]/15 text-[#8A38F5] border border-[#8A38F5]/30 text-xs font-mono self-start sm:self-auto">
              Auditor Compliance View
            </span>
          )}
        </div>
      </div>

      {/* QR Code view toggle */}
      {showQr && (
        <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="p-4 bg-white rounded-lg mb-3">
            {/* Simple SVG QR Code representation */}
            <div className="w-36 h-36 border-4 border-black flex items-center justify-center p-2">
              <div className="grid grid-cols-6 gap-1 w-full h-full">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className={`${(i % 2 === 0 || i % 7 === 0) ? 'bg-black' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs font-mono text-[#A7ADB5] break-all">{displayAddress}</p>
          <button
            type="button"
            onClick={() => setShowQr(false)}
            className="mt-3 text-xs text-[#1677FF] hover:underline"
          >
            Hide QR Code
          </button>
        </div>
      )}

      {/* Public Confidentiality Notice or Stats Grid */}
      {isPublic ? (
        <div className="p-8 rounded-xl bg-[#15171A] border border-[#202328] text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-[#202328] flex items-center justify-center mx-auto text-[#1677FF]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Shielded Account Information</h2>
            <p className="text-xs text-[#A7ADB5] mt-1 leading-relaxed">
              This address has verified transactions committed to MONETA Chain, but balance balances and individual holdings are shielded on the unauthenticated public network layer.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/access"
              className="px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Connect Wallet to Access Authorized Account</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A7ADB5]">Primary Balance</span>
            <div className="text-2xl font-bold font-mono text-white tracking-tight my-2">
              12,500 <span className="text-sm font-sans font-normal text-[#1677FF]">MNTA</span>
            </div>
            <div className="text-xs font-mono text-[#10B981] pt-2 border-t border-[#202328]">
              ≈ $60,625.00 USD
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A7ADB5]">Associated Tokens</span>
            <div className="space-y-1.5 my-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#A7ADB5]">MINT Stablecoin:</span>
                <span className="text-white font-bold">14,200.00 MINT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7ADB5]">Wrapped BTC:</span>
                <span className="text-white font-bold">0.50 wBTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7ADB5]">Bridged USDC:</span>
                <span className="text-white font-bold">5,000.00 USDC</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#202328]">
              <Link to="/tokens" className="text-xs text-[#1677FF] hover:underline">
                View all token balances &rarr;
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A7ADB5]">Cumulative Activity</span>
            <div className="space-y-1.5 my-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#A7ADB5] flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-[#10B981]" /> Received:</span>
                <span className="text-white">45,000 MNTA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7ADB5] flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5 text-[#EF4444]" /> Sent:</span>
                <span className="text-white">32,500 MNTA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7ADB5]">Total Nonce:</span>
                <span className="text-white font-bold">142 calls</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#202328] text-xs text-[#A7ADB5] font-mono">
              Last active 12s ago
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Table */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Transactions for this Account</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">Verified Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3">Tx Hash</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Block</th>
                <th className="px-5 py-3 text-right">Value</th>
                <th className="px-5 py-3 text-right">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60">
              {LATEST_TRANSACTIONS.map((tx, idx) => (
                <tr key={tx.hash} className="hover:bg-[#191C21] transition-colors">
                  <td className="px-5 py-3.5">
                    <Link to={`/transactions/${tx.hash}`} className="text-[#1677FF] hover:underline font-semibold">
                      {formatHash(tx.hash)}
                    </Link>
                  </td>

                  <td className="px-5 py-3.5 font-sans">
                    <span className="px-2 py-0.5 rounded bg-[#202328] text-[#A7ADB5] text-[11px]">
                      {idx % 2 === 0 ? 'Transfer' : 'Contract Call'}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <Link to={`/blocks/${tx.block}`} className="text-[#1677FF] hover:underline">
                      #{tx.block}
                    </Link>
                  </td>

                  <td className="px-5 py-3.5 text-right font-bold text-white">
                    {isPublic ? '••••••' : (idx % 2 === 0 ? `+${tx.amount}` : `-${tx.amount}`)}
                  </td>

                  <td className="px-5 py-3.5 text-right text-[#A7ADB5]">
                    {isPublic ? '•••' : tx.fee}
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
