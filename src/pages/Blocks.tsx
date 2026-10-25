import React, { useState } from 'react';
import { Box, Search, Filter } from 'lucide-react';
import { LATEST_BLOCKS } from '../data/mockData';
import { formatNumber, formatHash } from '../utils';
import { Link } from 'react-router-dom';

export function Blocks() {
  const [page, setPage] = useState(1);
  const [searchHeight, setSearchHeight] = useState('');
  const totalItems = 1459203;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchBlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchHeight.trim().replace(/^#/, '');
    if (clean) {
      window.location.href = `/blocks/${clean}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Ledger Blocks</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Consortium Finality</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Box className="w-7 h-7 text-[#1677FF]" />
            Blocks
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Chronological cryptographic blocks validated and committed to MONETA Chain.
          </p>
        </div>
        
        {/* Search Block Height */}
        <form onSubmit={handleSearchBlock} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
            <input 
              type="text" 
              value={searchHeight}
              onChange={(e) => setSearchHeight(e.target.value)}
              placeholder="Jump to block height..." 
              className="pl-9 pr-3 py-1.5 bg-[#15171A] border border-[#202328] rounded-lg text-xs text-white placeholder-[#5D646E] focus:outline-none focus:border-[#1677FF] font-mono w-48 sm:w-56"
            />
          </div>
          <button 
            type="submit"
            className="px-3 py-1.5 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            Go
          </button>
        </form>
      </div>

      {/* Blocks Table */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0E1012] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3.5">Block Height</th>
                <th className="px-5 py-3.5">Block Hash</th>
                <th className="px-5 py-3.5">Age</th>
                <th className="px-5 py-3.5 text-right">Transactions</th>
                <th className="px-5 py-3.5">Validator</th>
                <th className="px-5 py-3.5 text-right">Size</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {Array.from({ length: 15 }).map((_, i) => {
                const block = LATEST_BLOCKS[i % LATEST_BLOCKS.length];
                const height = block.height - i;
                
                return (
                  <tr key={`${block.hash}-${i}`} className="hover:bg-[#191C21] transition-colors">
                    <td className="px-5 py-4">
                      <Link to={`/blocks/${height}`} className="text-[#1677FF] hover:underline font-bold text-sm">
                        #{formatNumber(height)}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-[#A7ADB5] text-[11px]">
                      {formatHash(block.hash)}
                    </td>

                    <td className="px-5 py-4 text-[#A7ADB5] font-sans">
                      {block.time}
                    </td>

                    <td className="px-5 py-4 text-right text-white font-bold">
                      {block.txCount}
                    </td>

                    <td className="px-5 py-4 font-sans">
                      <span className="px-2 py-0.5 rounded bg-[#202328] text-white text-[11px] font-medium">
                        {block.validator}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right text-[#A7ADB5]">
                      {block.size}
                    </td>

                    <td className="px-5 py-4 text-right font-sans">
                      <span className="text-[#10B981] font-medium text-xs">
                        Confirmed
                      </span>
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
            Showing {itemsPerPage * (page - 1) + 1} - {Math.min(itemsPerPage * page, totalItems)} of {formatNumber(totalItems)} blocks (Simulated Devnet)
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
