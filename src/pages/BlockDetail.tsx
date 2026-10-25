import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, ArrowLeft, Clock, ShieldCheck, Database, Layers, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';

export function BlockDetail() {
  const { id } = useParams<{ id: string }>();
  const height = parseInt(id || '1459203', 10);
  const [copiedHash, setCopiedHash] = useState(false);
  
  // Find block or generate deterministic mock details
  const block = LATEST_BLOCKS.find(b => b.height === height) || {
    height,
    hash: `0x3f5ca982e041e48f729bb9c4a896d8e23f044d08129a738c8241b712c7519a2b`,
    txCount: 142,
    validator: 'MonetaNode-01',
    size: '25.4 KB',
    time: '12s ago',
    timestamp: '2026-05-24 12:46:12 UTC',
    gasUsed: '1,248,910',
    gasLimit: '15,000,000',
    status: 'confirmed' as const
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(block.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Link */}
      <div>
        <Link to="/blocks" className="text-xs font-medium text-[#1677FF] hover:underline flex items-center gap-1.5 mb-3 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blocks
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202328] pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Box className="w-7 h-7 text-[#1677FF]" />
            Block #{formatNumber(block.height)}
          </h1>

          {/* Quick Prev / Next Navigator */}
          <div className="flex items-center gap-2">
            <Link
              to={`/blocks/${height - 1}`}
              className="px-3 py-1.5 rounded bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-[#A7ADB5] hover:text-white flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </Link>
            <Link
              to={`/blocks/${height + 1}`}
              className="px-3 py-1.5 rounded bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-[#A7ADB5] hover:text-white flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Block Information Card */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Block Properties</h2>
          <span className="text-xs text-[#10B981] font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            Finalized Block
          </span>
        </div>

        <div className="divide-y divide-[#202328]/60 text-xs">
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Block Height:</span>
            <span className="md:col-span-3 text-white font-mono font-bold text-sm">
              #{formatNumber(block.height)}
            </span>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Cryptographic Hash:</span>
            <div className="md:col-span-3 flex items-center gap-2 font-mono text-white break-all">
              <span>{block.hash}</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-[#1677FF] hover:underline shrink-0 text-xs"
              >
                {copiedHash ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Timestamp:</span>
            <span className="md:col-span-3 text-[#A7ADB5] flex items-center gap-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#5D646E]" />
              {block.timestamp} ({block.time})
            </span>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Proposing Validator:</span>
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#202328] text-white font-mono">
                {block.validator}
              </span>
              <Link to="/validators" className="text-[#1677FF] hover:underline text-xs">
                Inspect Validator &rarr;
              </Link>
            </div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Transactions:</span>
            <span className="md:col-span-3 text-white font-mono">
              {block.txCount} transactions verified in this block
            </span>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Gas Usage / Limit:</span>
            <span className="md:col-span-3 text-white font-mono">
              {block.gasUsed} / {block.gasLimit} ({(1248910 / 15000000 * 100).toFixed(1)}%)
            </span>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-2">
            <span className="text-[#A7ADB5] font-medium">Payload Size:</span>
            <span className="md:col-span-3 text-[#A7ADB5] font-mono">
              {block.size}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions in this Block */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-6 py-3.5 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Transactions in Block #{block.height}</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">Displaying verified batch</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3">Tx Hash</th>
                <th className="px-5 py-3">From</th>
                <th className="px-5 py-3">To</th>
                <th className="px-5 py-3 text-right">Value</th>
                <th className="px-5 py-3 text-right">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {LATEST_TRANSACTIONS.map((tx) => (
                <tr key={tx.hash} className="hover:bg-[#191C21] transition-colors">
                  <td className="px-5 py-3.5">
                    <Link to={`/transactions/${tx.hash}`} className="text-[#1677FF] hover:underline font-semibold">
                      {formatHash(tx.hash)}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[#A7ADB5]">
                    {formatHash(tx.from)}
                  </td>
                  <td className="px-5 py-3.5 text-[#A7ADB5]">
                    {formatHash(tx.to)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-white font-semibold">
                    {tx.amount}
                  </td>
                  <td className="px-5 py-3.5 text-right text-[#A7ADB5]">
                    {tx.fee}
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
