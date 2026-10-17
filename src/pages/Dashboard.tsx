import React from 'react';
import { Link } from 'react-router-dom';
import { Box, ArrowRightLeft, Activity, Users, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';
import { useRole } from '../context/RoleContext';

function StatCard({ title, value, icon: Icon, delay }: { title: string, value: string, icon: any, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800 flex flex-col"
    >
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{title}</span>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className="mt-auto pt-4 text-emerald-400 text-xs flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
        Network Active
      </div>
    </motion.div>
  );
}

export function Dashboard() {
  const { role } = useRole();
  const isPublic = role === 'public';

  return (
    <div className="space-y-8 pb-12">
      {/* Hero / Global Search Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          MONETA <span className="text-blue-400">Explorer</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg mb-8">
          The hybrid consortium blockchain for transparent and secure enterprise operations. Search the public and consortium chains instantly.
        </p>

        <div className="max-w-3xl md:hidden mb-8">
           <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
                if(input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
                }
              }}
              className="relative flex items-center w-full"
            >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              name="search"
              type="text"
              className="block w-full pl-12 pr-4 py-4 border border-slate-700 rounded-xl leading-5 bg-slate-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-lg"
              placeholder="Search by Tx Hash / Address / Block..."
            />
            <button type="submit" className="absolute right-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              Search
            </button>
          </form>
        </div>
      </motion.div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Block Height" value="1,459,203" icon={Box} delay={0.1} />
        <StatCard title="Transactions (24h)" value="1.24M" icon={ArrowRightLeft} delay={0.2} />
        <StatCard title="TPS" value="350" icon={Activity} delay={0.3} />
        <StatCard title="Active Validators" value="42" icon={Users} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Blocks */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 0.5 }}
           className="col-span-1 lg:col-span-1 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 flex flex-col"
        >
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Latest Blocks</h3>
            <Link to="/blocks" className="text-xs text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {LATEST_BLOCKS.map((block) => (
              <div key={block.height} className="px-6 py-4 flex items-center justify-between hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                    BK
                  </div>
                  <div>
                    <Link to={`/blocks/${block.height}`} className="font-mono text-sm text-white hover:text-blue-400 block">
                      #{formatNumber(block.height)}
                    </Link>
                    <div className="text-xs text-slate-500">{block.txCount} transactions • {block.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-slate-400">
                    Validator: <span className="text-blue-400">{block.validator}</span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono">0x8f2...e34b</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Latest Transactions */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 0.6 }}
           className="col-span-1 lg:col-span-1 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 flex flex-col"
        >
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {LATEST_TRANSACTIONS.map((tx) => (
              <div key={tx.hash} className="px-6 py-4 flex items-center justify-between hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <Link to={`/transactions/${tx.hash}`} className="font-mono text-sm text-white hover:text-emerald-400 block">
                      {formatHash(tx.hash)}
                    </Link>
                    <div className="text-xs text-slate-500">From {isPublic ? 'Confidential' : formatHash(tx.from)} To {isPublic ? 'Confidential' : formatHash(tx.to)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{isPublic ? '••••••' : tx.amount}</div>
                  <div className="text-[10px] text-slate-500">{isPublic ? '•••' : tx.fee} Gas Fee</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
