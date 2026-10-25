import React, { useState } from 'react';
import { ArrowRightLeft, Search, Filter } from 'lucide-react';
import { LATEST_TRANSACTIONS } from '../data/mockData';
import { formatHash } from '../utils';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

export function Transactions() {
  const [page, setPage] = useState(1);
  const [searchTx, setSearchTx] = useState('');
  const { role } = useRole();
  const isPublic = role === 'public';
  
  const totalItems = 3284501;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTx.trim()) {
      window.location.href = `/transactions/${searchTx.trim()}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Ledger Activity</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Verifiable State Transitions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ArrowRightLeft className="w-7 h-7 text-[#1677FF]" />
            Transactions
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Cryptographically authenticated transfers, contract interactions, and settlement calls on MONETA Chain.
          </p>
        </div>
        
        {/* Search Transaction Hash */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
            <input 
              type="text" 
              value={searchTx}
              onChange={(e) => setSearchTx(e.target.value)}
              placeholder="Search by Tx Hash (0x...)..." 
              className="pl-9 pr-3 py-1.5 bg-[#15171A] border border-[#202328] rounded-lg text-xs text-white placeholder-[#5D646E] focus:outline-none focus:border-[#1677FF] font-mono w-48 sm:w-64"
            />
          </div>
          <button 
            type="submit"
            className="px-3 py-1.5 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            Find
          </button>
        </form>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0E1012] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3.5">Tx Hash</th>
                <th className="px-5 py-3.5">Age</th>
                <th className="px-5 py-3.5">From</th>
                <th className="px-5 py-3.5">To</th>
                <th className="px-5 py-3.5 text-right">Value</th>
                <th className="px-5 py-3.5 text-right">Tx Fee</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {Array.from({ length: 15 }).map((_, i) => {
                const tx = LATEST_TRANSACTIONS[i % LATEST_TRANSACTIONS.length];
                
                return (
                  <tr key={`${tx.hash}-${i}`} className="hover:bg-[#191C21] transition-colors">
                    <td className="px-5 py-4">
                      <Link to={`/transactions/${tx.hash}`} className="text-[#1677FF] hover:underline font-semibold text-xs">
                        {tx.hash.substring(0, 18)}...
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-[#A7ADB5] font-sans">
                      {tx.time}
                    </td>

                    <td className="px-5 py-4 text-[#A7ADB5]">
                      {isPublic ? (
                        <span className="text-[#5D646E] font-sans italic text-[11px]">Confidential</span>
                      ) : (
                        <Link to={`/addresses/${tx.from}`} className="hover:text-white transition-colors">
                          {formatHash(tx.from)}
                        </Link>
                      )}
                    </td>

                    <td className="px-5 py-4 text-[#A7ADB5]">
                      {isPublic ? (
                        <span className="text-[#5D646E] font-sans italic text-[11px]">Confidential</span>
                      ) : (
                        <Link to={`/addresses/${tx.to}`} className="hover:text-white transition-colors">
                          {formatHash(tx.to)}
                        </Link>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-white">
                      {isPublic ? (
                        <span className="text-[#5D646E] bg-[#202328] px-2 py-0.5 rounded text-[11px] font-sans">••••••</span>
                      ) : (
                        tx.amount
                      )}
                    </td>

                    <td className="px-5 py-4 text-right text-[#A7ADB5]">
                      {isPublic ? '•••' : tx.fee}
                    </td>

                    <td className="px-5 py-4 text-right font-sans">
                      {tx.status === 'success' ? (
                        <span className="text-[#10B981] font-semibold text-xs">
                          Success
                        </span>
                      ) : tx.status === 'pending' ? (
                        <span className="text-[#E5A93C] font-semibold text-xs">
                          Pending
                        </span>
                      ) : (
                        <span className="text-[#EF4444] font-semibold text-xs">
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Bar */}
        <div className="p-4 bg-[#0E1012] border-t border-[#202328] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7ADB5]">
          <span>
            Showing {itemsPerPage * (page - 1) + 1} - {Math.min(itemsPerPage * page, totalItems)} of {totalItems.toLocaleString()} transactions (Simulated Devnet)
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] hover:bg-[#202328] text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Previous
            </button>
            <span className="px-2 text-white font-mono">Page {page} / {totalPages.toLocaleString()}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] hover:bg-[#202328] text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
