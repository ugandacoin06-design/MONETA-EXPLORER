import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRightLeft, ArrowLeft, CheckCircle, Clock, Copy, Check, AlertCircle } from 'lucide-react';
import { LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';

export function TransactionDetail() {
  const { hash } = useParams<{ hash: string }>();
  const { role } = useRole();
  const isPublic = role === 'public';
  const [copiedHash, setCopiedHash] = useState(false);
  
  const tx = LATEST_TRANSACTIONS.find(t => t.hash.toLowerCase() === (hash || '').toLowerCase()) || {
    hash: hash || '0xa1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    from: '0x71C8360537aaC1bFa199C96dd3007049Abf1973E',
    to: '0x82D46944eFeF169c62A3a2336D04C0560a2c451A',
    amount: '1,250 MNTA',
    fee: '0.0012 MNTA',
    time: '12s ago',
    timestamp: '2026-05-24 12:46:12 UTC',
    block: 1459203,
    nonce: 142,
    status: 'success' as const,
    tokenSymbol: 'MNTA'
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(tx.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Link */}
      <div>
        <Link to="/transactions" className="text-xs font-medium text-[#1677FF] hover:underline flex items-center gap-1.5 mb-3 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Transactions
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202328] pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ArrowRightLeft className="w-7 h-7 text-[#1677FF]" />
            Transaction Details
          </h1>

          <div className="flex items-center gap-2">
            {tx.status === 'success' ? (
              <span className="px-3 py-1 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Confirmed
              </span>
            ) : tx.status === 'pending' ? (
              <span className="px-3 py-1 rounded bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/30 text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin" /> Pending In Mempool
              </span>
            ) : (
              <span className="px-3 py-1 rounded bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 text-xs font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Reverted / Failed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Details Card */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Overview & Proof Record</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">{tx.timestamp}</span>
        </div>

        {isPublic && (
          <div className="p-3.5 bg-[#0C1726] border-b border-[#1677FF]/20 text-xs text-[#7BB4FF] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
            <span>
              <strong>Privacy Layer Active:</strong> Value, fees, and internal payload memo are shielded for public inquiries according to MONETA confidentiality principles.
            </span>
          </div>
        )}

        <div className="divide-y divide-[#202328]/60 text-xs font-mono">
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">Transaction Hash:</span>
            <div className="md:col-span-3 flex items-center gap-2 text-white break-all">
              <span>{tx.hash}</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-[#1677FF] hover:underline shrink-0 text-xs font-sans"
              >
                {copiedHash ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">Included in Block:</span>
            <div className="md:col-span-3">
              <Link to={`/blocks/${tx.block}`} className="text-[#1677FF] hover:underline font-bold">
                #{formatNumber(tx.block)}
              </Link>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">From Sender:</span>
            <div className="md:col-span-3">
              {isPublic ? (
                <span className="text-[#5D646E] italic font-sans">Shielded Confidential Address ({formatHash(tx.from)})</span>
              ) : (
                <Link to={`/addresses/${tx.from}`} className="text-[#1677FF] hover:underline break-all">
                  {tx.from}
                </Link>
              )}
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">To Recipient:</span>
            <div className="md:col-span-3">
              {isPublic ? (
                <span className="text-[#5D646E] italic font-sans">Shielded Confidential Address ({formatHash(tx.to)})</span>
              ) : (
                <Link to={`/addresses/${tx.to}`} className="text-[#1677FF] hover:underline break-all">
                  {tx.to}
                </Link>
              )}
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">Settlement Value:</span>
            <div className="md:col-span-3 font-bold text-white text-sm">
              {isPublic ? (
                <span className="text-[#5D646E] font-normal font-sans bg-[#202328] px-2 py-0.5 rounded text-xs">
                  Confidential Value (Zero-Knowledge Proof Verified)
                </span>
              ) : (
                tx.amount
              )}
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">Gas & Network Fee:</span>
            <div className="md:col-span-3 text-[#A7ADB5]">
              {isPublic ? 'Confidential' : `${tx.fee} (Standard Base Tier)`}
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-sans font-medium">Account Nonce:</span>
            <div className="md:col-span-3 text-[#A7ADB5]">
              {tx.nonce}
            </div>
          </div>

          {!isPublic && (
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
              <span className="text-[#A7ADB5] font-sans font-medium">Decrypted Memo Payload:</span>
              <div className="md:col-span-3 text-white bg-[#0E1012] p-3 rounded border border-[#202328] italic font-sans">
                "Payment for Q2 consortium validation services. Invoice #4812"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
