import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  ArrowRightLeft, 
  Activity, 
  ShieldCheck, 
  Globe, 
  Users, 
  Server, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Coins
} from 'lucide-react';
import { GlobalSearch } from '../components/GlobalSearch';

export function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto pt-6 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#15171A] border border-[#202328] text-xs font-mono text-[#A7ADB5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
          <span>MONETASCAN · MONETA CHAIN EXPLORER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          VISIBLE TRUTH.<br />
          <span className="text-[#A7ADB5]">INVISIBLE WEALTH.</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-white max-w-2xl mx-auto">
          Explore the Network. Verify the Truth. Protect What Matters.
        </p>

        <p className="text-sm md:text-base text-[#A7ADB5] max-w-2xl mx-auto leading-relaxed">
          MONETASCAN is the official window into MONETA Chain—giving the world a clear view of network activity, blocks, transactions, validators, and blockchain integrity while respecting the privacy of the people and organizations using the network.
        </p>

        {/* Global Search Component directly in Hero */}
        <div className="max-w-2xl mx-auto pt-2">
          <GlobalSearch placeholder="Search Txn Hash (0x...), Address (0x...), Block Height, or Token (MNTA, MINT)..." />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/explorer"
            className="px-6 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors"
          >
            Explore MONETA Chain
          </Link>
          <Link
            to="/access"
            className="px-6 py-2.5 bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors"
          >
            Connect Wallet
          </Link>
        </div>
      </div>

      {/* The Network, Made Visible */}
      <div className="p-8 md:p-12 rounded-xl bg-[#15171A] border border-[#202328] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold font-mono">Verifiable Architecture</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">THE NETWORK, MADE VISIBLE.</h2>
          <p className="text-sm text-[#A7ADB5]">
            Everything happening on MONETA Chain should be verifiable. One interface. One source of truth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto text-xs font-medium">
          {[
            "Explore blocks.",
            "Track transactions.",
            "Verify network activity.",
            "Monitor validators.",
            "Inspect blockchain data.",
            "Follow network performance."
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded bg-[#0E1012] border border-[#202328] text-white">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Role-Adaptive Intelligence */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold font-mono">Role-Adaptive Visibility</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">YOUR WINDOW INTO MONETA CHAIN</h2>
          <p className="text-sm text-[#A7ADB5]">
            MONETASCAN transforms complex blockchain infrastructure into a simple, powerful experience suited to your authorized role.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#1677FF]">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">PUBLIC</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Discover the network without needing an account. View publicly available blockchain information, network activity, blocks, validators, and transaction records.
              </p>
            </div>
            <Link to="/explorer" className="mt-4 pt-3 border-t border-[#202328] text-xs text-[#1677FF] hover:underline flex items-center gap-1 font-medium">
              Explore Public Chain &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#10B981]">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">USERS</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Connect your MONETA wallet and access information associated with your account, token holdings, and authorized ecosystem activity.
              </p>
            </div>
            <Link to="/access" className="mt-4 pt-3 border-t border-[#202328] text-xs text-[#10B981] hover:underline flex items-center gap-1 font-medium">
              Connect Account &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#E5A93C]">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">VALIDATORS</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Monitor validator performance, blocks proposed, network participation, and consensus-related information across consortium nodes.
              </p>
            </div>
            <Link to="/validators" className="mt-4 pt-3 border-t border-[#202328] text-xs text-[#E5A93C] hover:underline flex items-center gap-1 font-medium">
              View Validator Nodes &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#8A38F5]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">AUDITORS</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Access authorized blockchain information needed for cryptographic verification, regulatory reporting, and compliance auditing.
              </p>
            </div>
            <Link to="/access" className="mt-4 pt-3 border-t border-[#202328] text-xs text-[#8A38F5] hover:underline flex items-center gap-1 font-medium">
              Auditor Portal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Core Principle Banner */}
      <div className="p-8 md:p-12 rounded-xl bg-[#0A0C0E] border border-[#202328] text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#1677FF] font-mono font-semibold">
          Transparency Without Unnecessary Exposure
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white max-w-xl mx-auto">
          VERIFY WHAT MATTERS. PROTECT WHAT MATTERS.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left text-xs">
          <div className="p-4 rounded bg-[#15171A] border border-[#202328] text-[#A7ADB5] space-y-1">
            <div className="font-semibold text-white">Blockchain Transparency</div>
            <p>Proves that consensus is valid, state transitions are cryptographically sealed, and double-spending is impossible.</p>
          </div>
          <div className="p-4 rounded bg-[#15171A] border border-[#202328] text-[#A7ADB5] space-y-1">
            <div className="font-semibold text-white">Privacy Protection</div>
            <p>Shields commercial relationships, private corporate balances, and institutional positions that do not need to be public.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
