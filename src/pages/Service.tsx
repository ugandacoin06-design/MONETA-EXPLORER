import React from 'react';
import { motion } from 'motion/react';
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
  LayoutDashboard
} from 'lucide-react';

export function Service() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h1 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-8">Moneta Explorer</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            THE EXPLORER THAT DOESN'T EXPLOIT.<br />
            THE SERVICE THAT SERVES ALL.
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-400 mb-8 tracking-wide">
            VISIBLE TRUTH. INVISIBLE WEALTH.
          </h3>
          <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            From public blockchain verification to authorized private network activity, MONETA Explorer is designed to give every participant the right information, at the right level of access.<br /><br />
            <span className="text-white font-medium">Explore the network. Verify the truth. Protect what matters.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/explorer" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 font-bold text-sm tracking-wide rounded-lg hover:bg-slate-200 transition-colors">
              EXPLORE MONETA CHAIN
            </Link>
            <Link to="/access" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold text-sm tracking-wide rounded-lg hover:bg-slate-800 transition-colors">
              CONNECT WALLET
            </Link>
          </div>
        </motion.div>
      </div>

      {/* The Problem */}
      <div className="py-24 border-t border-slate-800/60 bg-slate-900/20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-4">The Problem</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">THE BLOCKCHAIN INDUSTRY HAS A BLIND SPOT.</h3>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">Blockchain explorers have traditionally taken one of two approaches.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <Eye className="w-8 h-8 text-rose-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">THE GLASS HOUSE</h4>
              <p className="text-sm text-slate-300 font-medium mb-4">Public explorers can make blockchain activity highly visible.</p>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Balances, addresses, transactions, and transaction relationships may become available for anyone to inspect and analyze.
              </p>
              <p className="text-sm font-bold text-rose-400 uppercase tracking-wide">Transparency can become exposure.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <EyeOff className="w-8 h-8 text-slate-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">THE BLACK BOX</h4>
              <p className="text-sm text-slate-300 font-medium mb-4">Private systems take the opposite approach.</p>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Data remains behind restricted infrastructure, but outsiders may have little ability to independently verify what is happening.
              </p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Privacy can become opacity.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 border-t-4 border-t-blue-500">
              <Scale className="w-8 h-8 text-blue-400 mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">THE GAP</h4>
              <p className="text-sm text-slate-300 font-medium mb-4">Businesses, consortiums, regulators, developers, and individuals need something better.</p>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                They need to verify that the network is functioning correctly without unnecessarily exposing sensitive information.
              </p>
              <p className="text-sm font-bold text-blue-400 uppercase tracking-wide">MONETA Explorer bridges that gap.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Service: Role-Adaptive Intelligence */}
      <div className="py-24 px-4 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-4">Our Service</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">ROLE-ADAPTIVE INTELLIGENCE FOR THE HYBRID AGE.</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              MONETA Explorer is designed as a unified gateway into the MONETA Chain ecosystem.<br />
              Instead of presenting every visitor with the same information, the experience can adapt according to authorization and role.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Public</h4>
                <p className="text-lg font-medium text-slate-300 mb-4">SEE THE NETWORK.</p>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Public visitors can explore authorized blockchain information such as blocks, network activity, public transactions, validators, network status, blockchain statistics, and cryptographic verification data.
                </p>
                <p className="text-sm font-bold text-blue-400">Verify the network without accessing information you are not authorized to see.</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">MONETA Users</h4>
                <p className="text-lg font-medium text-slate-300 mb-4">SEE YOUR MONETA ACTIVITY.</p>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Connect an authorized wallet to access information associated with your account. This may include account information, authorized transaction history, balances, staking information, and personal network activity.
                </p>
                <p className="text-sm font-bold text-emerald-400">Your access. Your information. Your control.</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Server className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Validators</h4>
                <p className="text-lg font-medium text-slate-300 mb-4">OPERATE THE NETWORK.</p>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Validators require deeper operational visibility. The experience provides access to validator status, block participation, performance metrics, consensus information, validation events, and operational alerts.
                </p>
                <p className="text-sm font-bold text-violet-400">Everything you need to understand your role in securing MONETA Chain.</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Auditors & Institutions</h4>
                <p className="text-lg font-medium text-slate-300 mb-4">VERIFY WITH AUTHORITY.</p>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Authorized institutions can access information permitted by their credentials, including audit records, authorized transaction information, network activity, aggregated statistics, and compliance reports.
                </p>
                <p className="text-sm font-bold text-amber-400">Deep verification without unnecessary exposure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes MONETA Explorer Different */}
      <div className="py-24 px-4 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">WHAT MAKES MONETA EXPLORER DIFFERENT?</h2>
            <p className="text-xl text-blue-400 font-bold tracking-wide mb-2">WE DON'T JUST SHOW DATA.</p>
            <p className="text-xl text-blue-400 font-bold tracking-wide">WE RESPECT CONTEXT.</p>
          </div>

          <div className="space-y-12">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl font-black text-slate-800 leading-none">01</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">HYBRID NETWORK VISIBILITY</h4>
                <p className="text-slate-400 leading-relaxed mb-4">
                  MONETA Explorer is designed to make the network's operational state understandable. Users can see relevant network information, validator activity, block production, and consensus status through an intuitive interface.
                </p>
                <p className="font-bold text-slate-300 uppercase tracking-widest text-sm">Complex infrastructure becomes understandable.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl font-black text-slate-800 leading-none">02</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">PRIVACY-AWARE EXPLORATION</h4>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Not every piece of blockchain information needs to be publicly exposed. MONETA Explorer is designed around controlled visibility so that public information remains accessible while restricted information remains available only to authorized users.
                </p>
                <p className="font-bold text-slate-300 uppercase tracking-widest text-sm">Transparency where it belongs. Privacy where it matters.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl font-black text-slate-800 leading-none">03</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">SECURITY-FIRST ACCESS</h4>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Private information should never be exposed simply because someone knows how to search for it. MONETA Explorer is designed around authentication, authorization, cryptographic protection, and strict access controls.
                </p>
                <p className="font-bold text-slate-300 uppercase tracking-widest text-sm">Your permissions determine what you can see.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row gap-8 items-start">
              <div className="text-6xl font-black text-slate-800 leading-none">04</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">ROLE-FIRST EXPERIENCE</h4>
                <p className="text-slate-400 leading-relaxed mb-4">
                  A public visitor doesn't need a validator dashboard. A validator doesn't need the same interface as an auditor. An auditor doesn't need the same experience as an ordinary user.
                </p>
                <p className="font-bold text-slate-300 uppercase tracking-widest text-sm">DIFFERENT ROLES REQUIRE DIFFERENT VIEWS.</p>
                <p className="text-slate-400 mt-4 leading-relaxed">The interface can adapt to the user's authorized role and capabilities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Moneta Advantage (Table) */}
      <div className="py-24 px-4 border-t border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">THE MONETA ADVANTAGE</h2>
            <p className="text-xl text-slate-400">ONE EXPLORER. MULTIPLE LEVELS OF VISIBILITY.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="p-6 font-bold text-white tracking-wider">Capability</th>
                  <th className="p-6 font-bold text-slate-300 tracking-wider">Public</th>
                  <th className="p-6 font-bold text-slate-300 tracking-wider">User</th>
                  <th className="p-6 font-bold text-slate-300 tracking-wider">Validator</th>
                  <th className="p-6 font-bold text-slate-300 tracking-wider">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Network Status</td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Blocks</td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Public Transactions</td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Personal Activity</td>
                  <td className="p-6"><Minus className="w-5 h-5 text-slate-600" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6 text-sm text-blue-400 font-medium">Authorized</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Validator Data</td>
                  <td className="p-6 text-sm text-slate-400">Limited</td>
                  <td className="p-6 text-sm text-slate-400">Limited</td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                  <td className="p-6 text-sm text-blue-400 font-medium">Authorized</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Audit Information</td>
                  <td className="p-6"><Minus className="w-5 h-5 text-slate-600" /></td>
                  <td className="p-6"><Minus className="w-5 h-5 text-slate-600" /></td>
                  <td className="p-6 text-sm text-slate-400">Limited</td>
                  <td className="p-6"><Check className="w-5 h-5 text-emerald-500" /></td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-medium text-slate-300">Private Information</td>
                  <td className="p-6"><Minus className="w-5 h-5 text-slate-600" /></td>
                  <td className="p-6 text-sm text-blue-400 font-medium">Authorized</td>
                  <td className="p-6 text-sm text-blue-400 font-medium">Authorized</td>
                  <td className="p-6 text-sm text-blue-400 font-medium">Authorized</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-400 mt-8 font-medium">Access is determined by authorization—not curiosity.</p>
        </div>
      </div>

      {/* Built for Ecosystem & Performance Grid */}
      <div className="py-24 px-4 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto space-y-32">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">BUILT FOR THE MONETA ECOSYSTEM</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
              MONETA Explorer is designed to become more than a transaction search engine.<br/>
              It is the discovery and verification interface connecting users with MONETA Chain.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { title: 'DISCOVER', desc: 'Understand the network.' },
                { title: 'SEARCH', desc: 'Find authorized information.' },
                { title: 'VERIFY', desc: 'Inspect cryptographic data.' },
                { title: 'MONITOR', desc: 'Follow activity in real time.' },
                { title: 'CONNECT', desc: 'Interact with ecosystem.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                  <h4 className="text-sm font-bold text-white mb-3 tracking-wider">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">PERFORMANCE. CLARITY. SECURITY.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
              A blockchain explorer should not make users wait to understand what is happening. MONETA Explorer is designed for:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <Search className="w-6 h-6 text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">FAST SEARCH</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Quick discovery of blocks, transactions, addresses, and network information.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <Layers className="w-6 h-6 text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">RESPONSIVE DESIGN</h4>
                <p className="text-xs text-slate-400 leading-relaxed">A consistent experience across desktop, tablet, and mobile.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <Zap className="w-6 h-6 text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">REAL-TIME INFORMATION</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Network information designed to update as blockchain activity occurs.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <Lock className="w-6 h-6 text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">SECURE ACCESS</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Authentication and authorization designed to protect restricted information.</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <LayoutDashboard className="w-6 h-6 text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">SIMPLE INTERFACE</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Powerful blockchain infrastructure presented through an understandable interface.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Our Principle & Future */}
      <div className="py-32 px-4 border-t border-slate-800/60 text-center">
        <div className="max-w-4xl mx-auto space-y-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">PROVE THE NETWORK.<br/>PROTECT THE PARTICIPANT.</h2>
            <p className="text-xl text-slate-400 mb-8 font-medium max-w-2xl mx-auto">
              MONETA Explorer is built around a simple idea: Blockchain transparency should not require unnecessary financial exposure.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <span className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">Observable Network</span>
              <span className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">Verifiable System</span>
              <span className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">Accountable Infrastructure</span>
              <span className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">Protected Privacy</span>
            </div>
          </div>

          <div className="pt-20 border-t border-slate-800/60">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">THE FUTURE OF BLOCKCHAIN EXPLORATION</h3>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
              The next generation of blockchain infrastructure will serve more than anonymous observers. It will serve:
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
               {['INDIVIDUALS', 'BUSINESSES', 'VALIDATORS', 'DEVELOPERS', 'INSTITUTIONS', 'AUDITORS', 'REGULATORS'].map(label => (
                 <span key={label} className="px-5 py-2.5 bg-blue-900/20 text-blue-400 font-bold tracking-widest text-sm rounded border border-blue-500/20">
                   {label}
                 </span>
               ))}
            </div>
            
            <p className="text-xl font-bold text-white mb-4">MONETA Explorer is designed for that future.</p>
            <p className="text-lg text-slate-400 italic">A future where blockchain information is not simply public or private. It is purposefully accessible.</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-32 px-4 text-center border-t border-slate-800/60 relative overflow-hidden bg-slate-900/40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-2xl h-64 bg-emerald-600/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
            DON'T CHOOSE BETWEEN TRUST AND SAFETY.<br/>
            <span className="text-emerald-400">CHOOSE A BETTER WAY.</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-slate-400 font-medium mb-16">
            <span>Explore the network.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Verify the blockchain.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Understand the infrastructure.</span> <span className="hidden sm:inline text-slate-700">•</span>
            <span>Protect what matters.</span>
          </div>
          
          <p className="text-2xl font-bold text-white tracking-widest mb-4 uppercase">VISIBLE TRUTH. INVISIBLE WEALTH.</p>
          <p className="text-slate-400 mb-12 font-medium tracking-wide">MONETA EXPLORER - YOUR WINDOW INTO MONETA CHAIN.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/explorer" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-bold text-sm tracking-wide rounded-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">
              START EXPLORING →
            </Link>
            <Link to="/access" className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 border border-slate-700 text-white font-bold text-sm tracking-wide rounded-lg hover:bg-slate-700 transition-colors">
              CONNECT WALLET →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
