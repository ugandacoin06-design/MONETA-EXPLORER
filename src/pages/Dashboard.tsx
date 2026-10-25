import React from 'react';
import { Link } from 'react-router-dom';
import { Box, ArrowRightLeft, Activity, ShieldCheck, Coins, Database, ArrowRight } from 'lucide-react';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS, TOKENS, NETWORK_INFO } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';
import { GlobalSearch } from '../components/GlobalSearch';

export function Dashboard() {
  const { role } = useRole();
  const isPublic = role === 'public';

  return (
    <div className="space-y-8 pb-12">
      {/* Hero & Search Header */}
      <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Network Overview</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="text-xs text-[#A7ADB5] font-mono">Consortium PBFT + ZK Rollup</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              MONETASCAN
            </h1>
            <p className="text-sm font-mono text-[#A7ADB5] mt-1 uppercase tracking-wider">
              MONETA CHAIN EXPLORER · VISIBLE TRUTH. INVISIBLE WEALTH.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="px-2.5 py-1 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono text-[#A7ADB5] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span>
              <span>Devnet (Simulated Data)</span>
            </span>
            <Link
              to="/developers"
              className="px-2.5 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs text-white transition-colors"
            >
              RPC Docs
            </Link>
          </div>
        </div>

        {/* Embedded prominent search component */}
        <div>
          <GlobalSearch placeholder="Search by Txn Hash (0x...), Address (0x...), Block Height, or Token (MNTA, MINT)..." />
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Block Height</span>
            <Box className="w-4 h-4 text-[#1677FF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            #{formatNumber(NETWORK_INFO.currentBlock)}
          </div>
          <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
            <span>Block Time: ~{NETWORK_INFO.blockTime}</span>
            <span className="text-[#10B981]">Consensus OK</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Transactions (24h)</span>
            <ArrowRightLeft className="w-4 h-4 text-[#1677FF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            1,248,512
          </div>
          <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
            <span>Peak TPS: 840</span>
            <span className="text-[#10B981]">+8.4% 24h</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Current TPS</span>
            <Activity className="w-4 h-4 text-[#1677FF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {NETWORK_INFO.averageTps} <span className="text-sm font-sans font-normal text-[#A7ADB5]">tx/s</span>
          </div>
          <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
            <span>Base Gas: 0.00018 MNTA</span>
            <span className="text-[#10B981]">Nominal</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7ADB5] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Consortium Nodes</span>
            <ShieldCheck className="w-4 h-4 text-[#1677FF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {NETWORK_INFO.activeValidators} <span className="text-sm font-sans font-normal text-[#A7ADB5]">/ {NETWORK_INFO.totalValidators}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-[#202328] text-[11px] text-[#A7ADB5] flex items-center justify-between font-mono">
            <span>Avg Uptime: 99.94%</span>
            <span className="text-[#10B981]">100% Staked</span>
          </div>
        </div>
      </div>

      {/* Featured Tokens Strip */}
      <div className="p-4 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#1677FF] shrink-0">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Ecosystem Tokens & Stablecoins</div>
            <div className="text-xs text-[#A7ADB5]">Native gas token MNTA and algorithmic currency MINT</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {TOKENS.slice(0, 3).map(token => (
            <Link
              key={token.symbol}
              to={`/tokens/${token.symbol}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0E1012] border border-[#202328] hover:border-[#1677FF] text-xs transition-colors"
            >
              <span className="font-mono font-bold text-white">{token.symbol}</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="font-mono text-[#10B981]">{token.price}</span>
            </Link>
          ))}
          <Link
            to="/tokens"
            className="text-xs text-[#1677FF] hover:underline flex items-center gap-1 font-medium pl-1"
          >
            <span>All Assets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tables: Latest Blocks & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Blocks Table */}
        <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#202328] flex justify-between items-center bg-[#0E1012]">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#1677FF]" />
              <h2 className="text-sm font-semibold text-white">Latest Blocks</h2>
            </div>
            <Link to="/blocks" className="text-xs text-[#1677FF] hover:underline font-medium">
              View All Blocks &rarr;
            </Link>
          </div>
          <div className="divide-y divide-[#202328]/60 overflow-x-auto">
            {LATEST_BLOCKS.map((block) => (
              <div key={block.height} className="px-5 py-3.5 flex items-center justify-between hover:bg-[#181B20] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                    BK
                  </div>
                  <div>
                    <Link to={`/blocks/${block.height}`} className="font-mono text-sm font-semibold text-[#1677FF] hover:underline block">
                      #{formatNumber(block.height)}
                    </Link>
                    <div className="text-[11px] text-[#A7ADB5] font-mono">
                      {block.txCount} txns · {block.time}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-white font-medium">
                    {block.validator}
                  </div>
                  <div className="text-[10px] text-[#A7ADB5] font-mono">
                    Size: {block.size}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Transactions Table */}
        <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#202328] flex justify-between items-center bg-[#0E1012]">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#1677FF]" />
              <h2 className="text-sm font-semibold text-white">Latest Transactions</h2>
            </div>
            <Link to="/transactions" className="text-xs text-[#1677FF] hover:underline font-medium">
              View All Transactions &rarr;
            </Link>
          </div>
          <div className="divide-y divide-[#202328]/60 overflow-x-auto">
            {LATEST_TRANSACTIONS.map((tx) => (
              <div key={tx.hash} className="px-5 py-3.5 flex items-center justify-between hover:bg-[#181B20] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#1677FF] shrink-0">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <Link to={`/transactions/${tx.hash}`} className="font-mono text-xs font-semibold text-[#1677FF] hover:underline block">
                      {formatHash(tx.hash)}
                    </Link>
                    <div className="text-[11px] text-[#A7ADB5] font-mono">
                      {isPublic ? 'Confidential Parties' : `${formatHash(tx.from)} → ${formatHash(tx.to)}`}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-semibold text-white">
                    {isPublic ? '••••••' : tx.amount}
                  </div>
                  <div className="text-[10px] text-[#A7ADB5] font-mono">
                    Fee: {isPublic ? '•••' : tx.fee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
