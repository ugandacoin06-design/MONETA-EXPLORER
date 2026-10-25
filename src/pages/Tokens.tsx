import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Coins, Search, ShieldCheck, ArrowRight, Copy, Check, ExternalLink, Info, Filter } from 'lucide-react';
import { TOKENS, TokenItem } from '../data/mockData';
import { formatHash } from '../utils';

export function Tokens() {
  const { symbol } = useParams<{ symbol?: string }>();
  const [filterType, setFilterType] = useState<'all' | 'native' | 'stable' | 'consortium'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenItem | null>(() => {
    if (symbol) {
      return TOKENS.find(t => t.symbol.toLowerCase() === symbol.toLowerCase()) || TOKENS[0];
    }
    return null;
  });
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

  const handleCopy = (contract: string) => {
    navigator.clipboard.writeText(contract);
    setCopiedContract(contract);
    setTimeout(() => setCopiedContract(null), 2000);
  };

  const filteredTokens = TOKENS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.contract.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'native') return t.symbol === 'MNTA';
    if (filterType === 'stable') return t.symbol === 'MINT' || t.symbol === 'USDC';
    if (filterType === 'consortium') return t.symbol === 'M-CRED' || t.symbol === 'MINT';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Asset Directory</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Demo Environment</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Coins className="w-7 h-7 text-[#1677FF]" />
            Tokens & Assets
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1 max-w-2xl">
            Verified protocol assets, algorithmic stablecoins including MINT, and cross-chain representations on MONETA Chain.
          </p>
        </div>

        {/* Demo data badge */}
        <div className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] flex items-center gap-2 self-start md:self-auto font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span>
          <span>Simulated Asset Ledger</span>
        </div>
      </div>

      {/* Highlights: MNTA and MINT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MNTA Highlight */}
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#1677FF]/15 border border-[#1677FF]/30 flex items-center justify-center font-bold text-sm text-[#1677FF]">
                  M
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">MNTA · MONETA Native</h3>
                  <span className="text-xs text-[#A7ADB5]">Gas, Staking & Consensus</span>
                </div>
              </div>
              <span className="text-sm font-mono font-bold text-white">$4.85 USD</span>
            </div>
            <p className="text-xs text-[#A7ADB5] leading-relaxed mb-4">
              The foundational utility asset of MONETA Chain used for base fee settlement, validator bond staking, and consortium governance voting.
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#202328] text-xs font-mono text-[#A7ADB5]">
            <span>Circulating: 420,000,000 MNTA</span>
            <button 
              type="button" 
              onClick={() => setSelectedToken(TOKENS[0])}
              className="text-[#1677FF] hover:underline flex items-center gap-1 font-sans"
            >
              Inspect Asset &rarr;
            </button>
          </div>
        </div>

        {/* MINT Highlight */}
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center font-bold text-sm text-[#10B981]">
                  $
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">MINT · MONETA Mint</h3>
                  <span className="text-xs text-[#10B981] font-mono">Algorithmic Stablecoin · 1.0002 USD</span>
                </div>
              </div>
              <span className="text-sm font-mono font-bold text-[#10B981]">Peg: $1.00 USD</span>
            </div>
            <p className="text-xs text-[#A7ADB5] leading-relaxed mb-4">
              Protocol-governed algorithmic stablecoin backed by an over-collateralized basket (142% collateral ratio) for reliable commercial settlement.
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#202328] text-xs font-mono text-[#A7ADB5]">
            <span>Supply: 78,500,000 MINT</span>
            <button 
              type="button" 
              onClick={() => setSelectedToken(TOKENS[1])}
              className="text-[#1677FF] hover:underline flex items-center gap-1 font-sans"
            >
              Inspect MINT Specs &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#15171A] p-2 rounded-lg border border-[#202328]">
        <div className="flex items-center gap-1 text-xs">
          {(['all', 'native', 'stable', 'consortium'] as const).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                filterType === type 
                  ? 'bg-[#1677FF] text-white' 
                  : 'text-[#A7ADB5] hover:text-white hover:bg-[#1E2228]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name, symbol, contract..."
            className="pl-9 pr-3 py-1.5 bg-[#0E1012] border border-[#202328] rounded text-xs text-white placeholder-[#5D646E] w-full sm:w-64 focus:outline-none focus:border-[#1677FF]"
          />
        </div>
      </div>

      {/* Tokens Table */}
      <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0E1012] border-b border-[#202328] text-[#A7ADB5] uppercase tracking-wider font-semibold">
                <th className="px-5 py-3.5">Asset</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5 text-right">Price</th>
                <th className="px-5 py-3.5 text-right">Circulating Supply</th>
                <th className="px-5 py-3.5 text-right">Holders</th>
                <th className="px-5 py-3.5">Contract</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202328]/60">
              {filteredTokens.map((token) => (
                <tr key={token.symbol} className="hover:bg-[#191C21] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#202328] flex items-center justify-center font-bold text-white text-xs font-mono">
                        {token.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span>{token.name}</span>
                          <span className="text-[11px] text-[#A7ADB5] font-mono bg-[#202328] px-1.5 py-0.2 rounded">
                            {token.symbol}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#A7ADB5]">{token.decimals} Decimals</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#A7ADB5]">
                    <span className="px-2 py-0.5 rounded bg-[#202328] text-white text-[11px] font-medium">
                      {token.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right font-mono font-medium text-white">
                    <div>{token.price}</div>
                    {token.change24h && (
                      <div className="text-[10px] text-[#10B981]">{token.change24h} (24h)</div>
                    )}
                  </td>

                  <td className="px-5 py-4 text-right font-mono text-[#A7ADB5]">
                    <div className="text-white">{token.circulating}</div>
                    <div className="text-[10px] text-[#5D646E]">Cap: {token.totalSupply}</div>
                  </td>

                  <td className="px-5 py-4 text-right font-mono text-white">
                    {token.holders.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#A7ADB5]">{formatHash(token.contract)}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(token.contract)}
                        className="text-[#5D646E] hover:text-white p-1 rounded"
                        title="Copy contract address"
                      >
                        {copiedContract === token.contract ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedToken(token)}
                      className="px-2.5 py-1 rounded bg-[#202328] hover:bg-[#1677FF] hover:text-white text-[#A7ADB5] font-medium text-xs transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Token Detail Modal / Drawer */}
      {selectedToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setSelectedToken(null)} />
          <div className="relative w-full max-w-xl bg-[#15171A] border border-[#202328] rounded-xl p-6 shadow-2xl text-left">
            <div className="flex items-start justify-between mb-4 border-b border-[#202328] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1677FF]/20 border border-[#1677FF]/40 flex items-center justify-center font-bold text-white text-base font-mono">
                  {selectedToken.symbol.slice(0, 3)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedToken.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#202328] text-[#1677FF] font-mono">
                      {selectedToken.symbol}
                    </span>
                  </h3>
                  <p className="text-xs text-[#A7ADB5]">{selectedToken.type}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedToken(null)}
                className="text-[#A7ADB5] hover:text-white p-1 rounded hover:bg-[#202328]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#A7ADB5] mb-5 leading-relaxed bg-[#0E1012] p-3 rounded border border-[#202328]">
              {selectedToken.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-5">
              <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                <div className="text-[#A7ADB5] mb-1">Current Price</div>
                <div className="text-sm font-mono font-bold text-white">{selectedToken.price}</div>
              </div>

              <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                <div className="text-[#A7ADB5] mb-1">Circulating Supply</div>
                <div className="text-sm font-mono font-bold text-white">{selectedToken.circulating}</div>
              </div>

              <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                <div className="text-[#A7ADB5] mb-1">Total Max Supply</div>
                <div className="text-sm font-mono font-medium text-white">{selectedToken.totalSupply}</div>
              </div>

              <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                <div className="text-[#A7ADB5] mb-1">Decimals & Holders</div>
                <div className="text-sm font-mono font-medium text-white">{selectedToken.decimals} decimals · {selectedToken.holders.toLocaleString()} holders</div>
              </div>

              {selectedToken.peg && (
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <div className="text-[#A7ADB5] mb-1">Target Peg</div>
                  <div className="text-sm font-mono font-bold text-[#10B981]">{selectedToken.peg}</div>
                </div>
              )}

              {selectedToken.collateralRatio && (
                <div className="p-3 rounded bg-[#0E1012] border border-[#202328]">
                  <div className="text-[#A7ADB5] mb-1">Collateralization Ratio</div>
                  <div className="text-sm font-mono font-bold text-[#10B981]">{selectedToken.collateralRatio}</div>
                </div>
              )}
            </div>

            <div className="p-3 rounded bg-[#0E1012] border border-[#202328] mb-5 text-xs font-mono">
              <div className="text-[#A7ADB5] mb-1">Contract Address</div>
              <div className="flex items-center justify-between text-white break-all">
                <span>{selectedToken.contract}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedToken.contract)}
                  className="ml-2 text-[#1677FF] hover:underline shrink-0"
                >
                  {copiedContract === selectedToken.contract ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#202328]">
              <Link
                to={`/addresses/${selectedToken.contract}`}
                onClick={() => setSelectedToken(null)}
                className="text-xs text-[#1677FF] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>View On-Chain Contract Account</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedToken(null)}
                className="px-4 py-1.5 rounded bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
