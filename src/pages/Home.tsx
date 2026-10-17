import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  ShieldCheck, 
  Users, 
  Box, 
  ArrowRightLeft, 
  Activity, 
  Server,
  Lock,
  Globe,
  CheckCircle2
} from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-8">Moneta Explorer</h1>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            VISIBLE TRUTH.<br/>
            <span className="text-slate-500">INVISIBLE WEALTH.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
            Explore the Network. Verify the Truth. Protect What Matters.
          </p>
          <p className="text-base text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            MONETA Explorer is the official window into MONETA Chain—giving the world a clear view of network activity, blocks, transactions, validators, and blockchain integrity while respecting the privacy of the people and organizations using the network.<br/><br/>
            See the truth of the chain without exposing what should remain private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explorer" className="px-8 py-3.5 bg-white text-slate-900 font-bold text-sm tracking-wide rounded-lg hover:bg-slate-200 transition-colors">
              EXPLORE MONETA CHAIN
            </Link>
            <Link to="/access" className="px-8 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold text-sm tracking-wide rounded-lg hover:bg-slate-800 transition-colors">
              CONNECT WALLET
            </Link>
          </div>
        </motion.div>
      </div>

      {/* The Network, Made Visible */}
      <div className="py-24 border-t border-slate-800/60 bg-slate-900/20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h3 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-6">The Network, Made Visible.</h3>
          <p className="text-3xl md:text-4xl font-bold text-white mb-16">Everything happening on MONETA Chain should be verifiable.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            {[
              "Explore blocks.",
              "Track transactions.",
              "Verify network activity.",
              "Monitor validators.",
              "Inspect blockchain data.",
              "Follow network performance."
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
          
          <p className="text-xl font-bold text-slate-300 mt-16 tracking-wide">One interface. One source of truth.</p>
        </motion.div>
      </div>

      {/* Your Window into MONETA Chain (Roles) */}
      <div className="py-24 px-4 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">YOUR WINDOW INTO MONETA CHAIN</h3>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              MONETA Explorer transforms complex blockchain infrastructure into a simple, powerful experience. Whether you're a new user discovering MONETA, an organization monitoring its activity, a validator securing the network, or an auditor verifying blockchain records, Explorer provides the information appropriate to your role.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-colors">
              <Globe className="w-8 h-8 text-blue-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">PUBLIC</h4>
              <p className="text-sm text-slate-400 font-medium mb-4">Discover the network without needing an account.</p>
              <p className="text-sm text-slate-500">View publicly available blockchain information, network activity, blocks, validators, and transaction records.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <Users className="w-8 h-8 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">USERS</h4>
              <p className="text-sm text-slate-400 font-medium mb-4">Connect your MONETA wallet.</p>
              <p className="text-sm text-slate-500">Access the information associated with your account and authorized activity across the ecosystem.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-violet-500/30 transition-colors">
              <Server className="w-8 h-8 text-violet-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">VALIDATORS</h4>
              <p className="text-sm text-slate-400 font-medium mb-4">Monitor node and consensus operations.</p>
              <p className="text-sm text-slate-500">Monitor validator performance, blocks, network participation, and consensus-related information.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 transition-colors">
              <ShieldCheck className="w-8 h-8 text-amber-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">AUDITORS</h4>
              <p className="text-sm text-slate-400 font-medium mb-4">Verify and audit network compliance.</p>
              <p className="text-sm text-slate-500">Access authorized blockchain information needed for verification, reporting, and compliance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Without Unnecessary Exposure */}
      <div className="py-32 px-4 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white">TRANSPARENCY WITHOUT UNNECESSARY EXPOSURE</h3>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-lg text-slate-400 leading-relaxed">Traditional blockchain explorers can make financial activity completely visible.</p>
            <p className="text-lg text-slate-400 leading-relaxed">Enterprise systems can go in the opposite direction, making information difficult to independently verify.</p>
          </div>
          
          <p className="text-xl font-bold text-slate-200 mt-12">MONETA Explorer is built around a different principle:</p>
          
          <div className="p-10 border border-slate-800 my-12 bg-[#020617] rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
             <h4 className="text-2xl md:text-3xl font-black text-blue-400 mb-8 tracking-wide">VERIFY WHAT MATTERS.<br/>PROTECT WHAT MATTERS.</h4>
             <div className="space-y-4 relative z-10">
               <p className="text-lg text-slate-300 font-medium">Blockchain transparency should prove that the system works.</p>
               <p className="text-lg text-slate-300 font-medium">Privacy should protect information that does not need to be public.</p>
             </div>
          </div>
          
          <p className="text-2xl font-bold text-white">MONETA Explorer brings both principles together.</p>
        </div>
      </div>

      {/* Explore the Chain */}
      <div className="py-24 px-4 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-16 text-center">EXPLORE THE CHAIN</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Box className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">BLOCKS</h4>
                <p className="text-slate-400 mb-4">Follow the latest blocks produced by MONETA Chain.</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Block Height · Timestamp · Validator · Transactions · Status</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <ArrowRightLeft className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">TRANSACTIONS</h4>
                <p className="text-slate-400 mb-4">Search and inspect authorized transaction information through a simple interface.</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Transaction Hash · Status · Block · Time · Network Data</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">VALIDATORS</h4>
                <p className="text-slate-400 mb-4">Discover the participants responsible for helping secure and operate the network.</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Validator Status · Activity · Performance · Network Participation</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">NETWORK</h4>
                <p className="text-slate-400 mb-4">See the current state of MONETA Chain.</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Network Status · Block Production · Transaction Activity · Validators</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Built for Trust / One Chain */}
      <div className="py-24 px-4 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-2">BUILT FOR TRUST</h3>
            <div className="w-12 h-1 bg-blue-600 rounded-full mb-6"></div>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>MONETA Explorer isn't simply a blockchain search engine.</p>
              <p>It is designed to become the verification layer of the MONETA ecosystem.</p>
              <p>Every block represents network activity.</p>
              <p>Every transaction represents movement within the ecosystem.</p>
              <p>Every cryptographic proof contributes to a verifiable history.</p>
              <p className="text-white font-medium">The Explorer brings that history to life.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-2">ONE CHAIN. ONE TRUTH.</h3>
            <div className="w-12 h-1 bg-emerald-600 rounded-full mb-6"></div>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>MONETA Chain is building infrastructure for a connected digital economy.</p>
              <p>MONETA Explorer gives that infrastructure a public face.</p>
              <p>From individual users to businesses, developers, validators, institutions, and auditors, everyone deserves a reliable way to understand what is happening on the network.</p>
              <p className="text-white font-medium">MONETA Explorer makes the blockchain understandable.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-32 px-4 text-center border-t border-slate-800/60 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-2xl h-64 bg-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">DISCOVER MONETA CHAIN</h3>
          <p className="text-2xl text-slate-300 mb-12">
            Don't just trust the network. <span className="text-blue-400 font-bold">Verify it.</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-slate-400 font-medium mb-16 max-w-2xl mx-auto">
            <span>Explore blocks.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Follow transactions.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Monitor the network.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Discover the ecosystem.</span>
          </div>
          
          <p className="text-2xl font-bold text-white tracking-widest mb-12 uppercase">
            Visible Truth. Invisible Wealth.
          </p>
          <p className="text-slate-400 mb-8 font-medium">Welcome to MONETA Explorer.</p>
          
          <Link to="/explorer" className="inline-block px-10 py-4 bg-blue-600 text-white font-bold text-sm tracking-wide rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            EXPLORE NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
