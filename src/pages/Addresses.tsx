import React, { useState } from 'react';
import { Wallet, Search, ArrowRight, ShieldCheck, Coins, Database } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { formatHash } from '../utils';

const KNOWN_ACCOUNTS = [
  {
    name: 'Genesis Protocol Treasury',
    address: '0x71C8360537aaC1bFa199C96dd3007049Abf1973E',
    type: 'Core Infrastructure',
    balance: '125,000,000 MNTA',
    txCount: 8421
  },
  {
    name: 'Consortium Validator Pool',
    address: '0x99B167520e53a99E256F8e93Ab1F1864a789124C',
    type: 'Consensus Bond',
    balance: '48,500,000 MNTA',
    txCount: 14205
  },
  {
    name: 'MINT Stablecoin Reserve Contract',
    address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    type: 'Algorithmic Reserve',
    balance: '78,500,000 MINT',
    txCount: 9310
  },
  {
    name: 'Liquidity Reserve Gateway',
    address: '0x82D46944eFeF169c62A3a2336D04C0560a2c451A',
    type: 'Settlement Pool',
    balance: '15,200,000 MNTA',
    txCount: 6512
  },
  {
    name: 'Cross-Chain wBTC Custody Bridge',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    type: 'Bridge Gateway',
    balance: '1,250 wBTC',
    txCount: 1940
  }
];

export function Addresses() {
  const [inputAddress, setInputAddress] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAddress.trim()) {
      navigate(`/addresses/${inputAddress.trim()}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Account Explorer</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Addresses & Contracts</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Wallet className="w-7 h-7 text-[#1677FF]" />
            Addresses & Contracts
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1">
            Inspect public ledger accounts, validator bonds, token contracts, and consortium reserves.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
            <input 
              type="text" 
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="Search address (0x...)..." 
              className="pl-9 pr-3 py-1.5 bg-[#15171A] border border-[#202328] rounded-lg text-xs text-white placeholder-[#5D646E] focus:outline-none focus:border-[#1677FF] font-mono w-48 sm:w-64"
            />
          </div>
          <button 
            type="submit"
            className="px-3 py-1.5 bg-[#1677FF] hover:bg-[#1366DB] text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            Lookup
          </button>
        </form>
      </div>

      {/* Verified Core Protocol Accounts */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 bg-[#0E1012] border-b border-[#202328] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Verified Core Protocol Accounts & Contracts</h2>
          <span className="text-xs text-[#A7ADB5] font-mono">Consortium Registry</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0A0C0E] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3.5">Account / Entity</th>
                <th className="px-5 py-3.5">Address</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5 text-right">Holdings Balance</th>
                <th className="px-5 py-3.5 text-right">Activity</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60 font-mono">
              {KNOWN_ACCOUNTS.map((acc) => (
                <tr key={acc.address} className="hover:bg-[#191C21] transition-colors">
                  <td className="px-5 py-4 font-sans">
                    <div className="font-semibold text-white text-sm">{acc.name}</div>
                  </td>

                  <td className="px-5 py-4 text-[#1677FF]">
                    <Link to={`/addresses/${acc.address}`} className="hover:underline">
                      {formatHash(acc.address)}
                    </Link>
                  </td>

                  <td className="px-5 py-4 font-sans text-[#A7ADB5]">
                    <span className="px-2 py-0.5 rounded bg-[#202328] text-white text-[11px]">
                      {acc.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right font-bold text-white">
                    {acc.balance}
                  </td>

                  <td className="px-5 py-4 text-right text-[#A7ADB5]">
                    {acc.txCount.toLocaleString()} txns
                  </td>

                  <td className="px-5 py-4 text-right font-sans">
                    <Link
                      to={`/addresses/${acc.address}`}
                      className="px-2.5 py-1 rounded bg-[#202328] hover:bg-[#1677FF] hover:text-white text-[#A7ADB5] font-medium text-xs transition-colors"
                    >
                      Inspect
                    </Link>
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
