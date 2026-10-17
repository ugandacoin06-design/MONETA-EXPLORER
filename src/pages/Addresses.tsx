import React from 'react';
import { Wallet, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function Addresses() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Wallet className="w-6 h-6 text-blue-400" />
            Addresses
          </h1>
          <p className="text-slate-400 text-sm mt-1">Explore top accounts, balances, and token holdings.</p>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <Search className="w-12 h-12 text-slate-700 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Search an Address</h3>
        <p className="text-slate-400 max-w-sm mb-6">Enter a MONETA wallet address to view its full transaction history, balance, and analytics.</p>
        <form 
          onSubmit={(e) => {
             e.preventDefault();
             const input = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
             if(input.value.trim()) {
               navigate(`/search?q=${encodeURIComponent(input.value)}`);
             }
          }}
          className="relative w-full max-w-md"
        >
           <input 
             name="search"
             type="text" 
             placeholder="0x..." 
             className="w-full pl-4 pr-32 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
           />
           <button type="submit" className="absolute right-1 top-1 bottom-1 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
             Explore
           </button>
        </form>
      </motion.div>
    </div>
  );
}
