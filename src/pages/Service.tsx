import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Scale, 
  Globe, 
  User, 
  Server, 
  ShieldCheck, 
  Check, 
  Minus, 
  Search, 
  Zap, 
  Lock, 
  Layers, 
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';

export function Service() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto pt-6 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#15171A] border border-[#202328] text-xs font-mono text-[#A7ADB5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
          <span>MONETASCAN · SERVICE ARCHITECTURE & EAAS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          THE EXPLORER THAT DOESN'T EXPLOIT.<br />
          <span className="text-[#A7ADB5]">THE SERVICE THAT SERVES ALL.</span>
        </h1>

        <p className="text-lg sm:text-xl font-bold text-white tracking-widest uppercase">
          VISIBLE TRUTH. INVISIBLE WEALTH.
        </p>

        <p className="text-sm md:text-base text-[#A7ADB5] max-w-2xl mx-auto leading-relaxed">
          From public blockchain verification to authorized private network activity, MONETASCAN is designed to give every participant the right information, at the right level of access.<br /><br />
          <span className="text-white font-medium">Explore the network. Verify the truth. Protect what matters.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/eaas"
            className="px-6 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Launch EaaS Platform</span>
          </Link>
          <Link
            to="/explorer"
            className="px-6 py-2.5 bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors"
          >
            Public Explorer
          </Link>
        </div>
      </div>

      {/* The Problem */}
      <div className="p-8 md:p-12 rounded-xl bg-[#15171A] border border-[#202328] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#E5A93C] font-semibold font-mono">The Problem</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">THE BLOCKCHAIN INDUSTRY HAS A BLIND SPOT.</h2>
          <p className="text-sm text-[#A7ADB5]">
            Blockchain explorers have traditionally taken one of two polar extremes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#0E1012] border border-[#202328] space-y-4">
            <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#EF4444]">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">THE GLASS HOUSE</h3>
            <p className="text-xs text-white font-medium">Public explorers can make blockchain activity highly visible.</p>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Balances, addresses, transactions, and transaction relationships become available for anyone to inspect, analyze, and profile.
            </p>
            <div className="text-xs font-bold text-[#EF4444] uppercase tracking-wide pt-2 border-t border-[#202328]">
              Transparency can become exposure.
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[#0E1012] border border-[#202328] space-y-4">
            <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#A7ADB5]">
              <EyeOff className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">THE BLACK BOX</h3>
            <p className="text-xs text-white font-medium">Private systems take the opposite approach.</p>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Data remains behind restricted infrastructure, but outsiders have no ability to independently verify what is happening.
            </p>
            <div className="text-xs font-bold text-[#A7ADB5] uppercase tracking-wide pt-2 border-t border-[#202328]">
              Privacy can become opacity.
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[#0E1012] border border-[#1677FF]/40 space-y-4">
            <div className="w-8 h-8 rounded bg-[#1677FF]/15 flex items-center justify-center text-[#1677FF]">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">THE GAP</h3>
            <p className="text-xs text-white font-medium">Businesses, regulators, developers, and individuals need something better.</p>
            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              They need to verify that the network is functioning correctly without unnecessarily exposing sensitive commercial data.
            </p>
            <div className="text-xs font-bold text-[#1677FF] uppercase tracking-wide pt-2 border-t border-[#202328]">
              MONETASCAN bridges that gap.
            </div>
          </div>
        </div>
      </div>

      {/* Role-Adaptive Intelligence */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold font-mono">Role-Adaptive Gateway</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">ROLE-ADAPTIVE INTELLIGENCE FOR THE HYBRID AGE.</h2>
          <p className="text-sm text-[#A7ADB5]">
            Instead of presenting every visitor with the same data dump, the experience adapts according to cryptographic authorization and role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex gap-4">
            <div className="w-9 h-9 rounded bg-[#202328] flex items-center justify-center text-[#1677FF] shrink-0 mt-1">
              <Globe className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Public · See the Network</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Public visitors can explore authorized blockchain information: blocks, network activity, public transactions, validators, network status, blockchain statistics, and cryptographic verification data.
              </p>
              <div className="text-xs text-[#1677FF] font-medium pt-1">
                Verify the network without accessing information you are not authorized to see.
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex gap-4">
            <div className="w-9 h-9 rounded bg-[#202328] flex items-center justify-center text-[#10B981] shrink-0 mt-1">
              <User className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">MONETA Users · See Your Activity</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Connect an authorized wallet to access information associated with your account: account state, authorized transaction history, token balances (MNTA, MINT), staking bonds, and personal network actions.
              </p>
              <div className="text-xs text-[#10B981] font-medium pt-1">
                Your access. Your information. Your control.
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex gap-4">
            <div className="w-9 h-9 rounded bg-[#202328] flex items-center justify-center text-[#E5A93C] shrink-0 mt-1">
              <Server className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Validators · Operate the Network</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Validators require deeper operational visibility: node status, block proposal participation, performance telemetry, consensus rounds, and operational alerts.
              </p>
              <div className="text-xs text-[#E5A93C] font-medium pt-1">
                Everything you need to understand your role in securing MONETA Chain.
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex gap-4">
            <div className="w-9 h-9 rounded bg-[#202328] flex items-center justify-center text-[#8A38F5] shrink-0 mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Auditors & Institutions · Verify with Authority</h3>
              <p className="text-xs text-[#A7ADB5] leading-relaxed">
                Authorized auditors access information permitted by their credentials: audit records, authorized transaction records, aggregated statistics, and compliance-oriented reports.
              </p>
              <div className="text-xs text-[#8A38F5] font-medium pt-1">
                Deep verification without unnecessary exposure.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Capability Matrix */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-[#0E1012] border-b border-[#202328] text-center">
          <h2 className="text-base font-bold text-white">THE MONETA ADVANTAGE: CAPABILITY MATRIX</h2>
          <p className="text-xs text-[#A7ADB5] mt-0.5">One explorer. Multiple levels of authorized visibility.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-6 py-3.5">Capability</th>
                <th className="px-6 py-3.5">Public</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Validator</th>
                <th className="px-6 py-3.5">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60">
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Network Status</td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
              </tr>
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Blocks & Consensus</td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
              </tr>
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Public Transactions</td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
              </tr>
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Personal Account Activity</td>
                <td className="px-6 py-3.5 text-[#5D646E]"><Minus className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#1677FF] font-medium font-mono text-[11px]">Authorized</td>
              </tr>
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Validator Operational Data</td>
                <td className="px-6 py-3.5 text-[#A7ADB5]">Limited</td>
                <td className="px-6 py-3.5 text-[#A7ADB5]">Limited</td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#1677FF] font-medium font-mono text-[11px]">Authorized</td>
              </tr>
              <tr className="hover:bg-[#191C21] transition-colors">
                <td className="px-6 py-3.5 font-medium text-white">Audit & Compliance Logs</td>
                <td className="px-6 py-3.5 text-[#5D646E]"><Minus className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#5D646E]"><Minus className="w-4 h-4" /></td>
                <td className="px-6 py-3.5 text-[#A7ADB5]">Limited</td>
                <td className="px-6 py-3.5 text-[#10B981]"><Check className="w-4 h-4" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-[#0E1012] border-t border-[#202328] text-center text-[11px] text-[#A7ADB5]">
          Access is determined by cryptographic authorization—not curiosity.
        </div>
      </div>
    </div>
  );
}
