import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Box, 
  ArrowRightLeft, 
  Wallet, 
  Coins, 
  AlertCircle, 
  ArrowRight, 
  CornerDownLeft,
  History,
  Trash2,
  X
} from 'lucide-react';
import { formatHash, formatNumber } from '../utils';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS, TOKENS, VALIDATORS } from '../data/mockData';
import { useSearchHistory, formatTimeAgo, SearchItemType } from '../utils/searchHistory';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [newQuery, setNewQuery] = useState(query);
  const navigate = useNavigate();

  const { history, addSearch, removeItem, clearAll, hasHistory } = useSearchHistory();

  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();
  const cleanNumber = trimmed.replace(/^#/, '');

  // Record this query into search history on mount/query change
  useEffect(() => {
    if (trimmed) {
      addSearch(trimmed, `/search?q=${encodeURIComponent(trimmed)}`, 'general', trimmed);
    }
  }, [trimmed, addSearch]);

  // Keep input in sync with URL
  useEffect(() => {
    setNewQuery(query);
  }, [query]);

  // Find actual matches from our dataset
  const matchedTokens = TOKENS.filter(t => 
    t.symbol.toLowerCase() === lower || 
    t.name.toLowerCase().includes(lower) || 
    t.contract.toLowerCase() === lower
  );

  const matchedBlocks = LATEST_BLOCKS.filter(b => 
    (/^\d+$/.test(cleanNumber) && b.height === parseInt(cleanNumber, 10)) ||
    b.hash.toLowerCase() === lower ||
    b.hash.toLowerCase().includes(lower)
  );

  const matchedTransactions = LATEST_TRANSACTIONS.filter(tx =>
    tx.hash.toLowerCase() === lower ||
    tx.hash.toLowerCase().includes(lower) ||
    tx.from.toLowerCase() === lower ||
    tx.to.toLowerCase() === lower
  );

  const matchedValidators = VALIDATORS.filter(v =>
    v.address.toLowerCase() === lower ||
    v.name.toLowerCase().includes(lower)
  );

  const hasMatches = matchedTokens.length > 0 || matchedBlocks.length > 0 || matchedTransactions.length > 0 || matchedValidators.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuery.trim()) {
      addSearch(newQuery.trim(), `/search?q=${encodeURIComponent(newQuery.trim())}`, 'general', newQuery.trim());
      navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }
  };

  const renderTypeIcon = (type: SearchItemType) => {
    switch (type) {
      case 'block':
        return <Box className="w-3.5 h-3.5 text-[#1677FF]" />;
      case 'transaction':
        return <ArrowRightLeft className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'address':
        return <Wallet className="w-3.5 h-3.5 text-[#E5A93C]" />;
      case 'token':
        return <Coins className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      default:
        return <SearchIcon className="w-3.5 h-3.5 text-[#A7ADB5]" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Search Resolution</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">Query Parser</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <SearchIcon className="w-7 h-7 text-[#1677FF]" />
          Search Results
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#A7ADB5]">
          <span>Evaluated query:</span>
          <code className="text-white font-mono bg-[#15171A] border border-[#202328] px-2.5 py-0.5 rounded text-xs break-all">
            {query || '(empty query)'}
          </code>
        </div>
      </div>

      {/* Query Search Bar for immediate refinements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 bg-[#15171A] p-2 rounded-xl border border-[#202328]">
            <div className="relative flex-1">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
              <input
                type="text"
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                placeholder="Search by block, tx hash, address, or token..."
                className="w-full pl-9 pr-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-sm text-white placeholder-[#5D646E] focus:outline-none focus:border-[#1677FF]"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* If matches found */}
          {hasMatches ? (
            <div className="space-y-6 pt-2">
              {/* Matched Tokens */}
              {matchedTokens.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5] flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#1677FF]" /> Tokens & Assets ({matchedTokens.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedTokens.map(token => (
                      <div key={token.symbol} className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{token.name}</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#202328] text-[#1677FF]">{token.symbol}</span>
                          </div>
                          <p className="text-xs text-[#A7ADB5] mt-1">{token.type} · Price: {token.price}</p>
                        </div>
                        <Link
                          to={`/tokens/${token.symbol}`}
                          onClick={() => addSearch(token.symbol, `/tokens/${token.symbol}`, 'token', `${token.symbol} · ${token.name}`)}
                          className="px-3 py-1.5 rounded bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#1366DB] transition-colors"
                        >
                          View Token
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Blocks */}
              {matchedBlocks.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5] flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#1677FF]" /> Blocks ({matchedBlocks.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedBlocks.map(block => (
                      <div key={block.height} className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold font-mono text-white">Block #{formatNumber(block.height)}</span>
                          <p className="text-xs text-[#A7ADB5] mt-1">Hash: {formatHash(block.hash)} · {block.txCount} txns</p>
                          <span className="text-[11px] text-[#5D646E] font-mono">Validator: {block.validator}</span>
                        </div>
                        <Link
                          to={`/blocks/${block.height}`}
                          onClick={() => addSearch(`#${block.height}`, `/blocks/${block.height}`, 'block', `Block #${formatNumber(block.height)}`)}
                          className="px-3 py-1.5 rounded bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#1366DB] transition-colors"
                        >
                          View Block
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Transactions */}
              {matchedTransactions.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5] flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-[#1677FF]" /> Transactions ({matchedTransactions.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedTransactions.map(tx => (
                      <div key={tx.hash} className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold font-mono text-white">{formatHash(tx.hash)}</span>
                          <p className="text-xs text-[#A7ADB5] mt-1 font-mono">From: {formatHash(tx.from)} → To: {formatHash(tx.to)}</p>
                          <span className="text-[11px] text-[#10B981] font-mono font-medium">Value: {tx.amount}</span>
                        </div>
                        <Link
                          to={`/transactions/${tx.hash}`}
                          onClick={() => addSearch(tx.hash, `/transactions/${tx.hash}`, 'transaction', `Tx ${formatHash(tx.hash)}`)}
                          className="px-3 py-1.5 rounded bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#1366DB] transition-colors"
                        >
                          View Tx
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Addresses/Validators */}
              {matchedValidators.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A7ADB5] flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#1677FF]" /> Accounts & Validators ({matchedValidators.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedValidators.map(val => (
                      <div key={val.id} className="p-5 rounded-xl bg-[#15171A] border border-[#202328] flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-white">{val.name}</span>
                          <p className="text-xs text-[#A7ADB5] mt-1 font-mono">{formatHash(val.address)}</p>
                          <span className="text-[11px] text-[#5D646E]">Voting Power: {val.votingPower}</span>
                        </div>
                        <Link
                          to={`/addresses/${val.address}`}
                          onClick={() => addSearch(val.address, `/addresses/${val.address}`, 'address', `Address ${val.name}`)}
                          className="px-3 py-1.5 rounded bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#1366DB] transition-colors"
                        >
                          View Address
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not-found state */
            <div className="p-8 md:p-12 rounded-xl bg-[#15171A] border border-[#202328] text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#202328] flex items-center justify-center mx-auto text-[#A7ADB5]">
                <AlertCircle className="w-6 h-6 text-[#E5A93C]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2">No Verified Record Found</h2>
                <p className="text-xs text-[#A7ADB5] leading-relaxed max-w-lg mx-auto">
                  MONETASCAN searched blocks, transactions, addresses, and tokens, but found no record matching <code className="text-white font-mono bg-[#0E1012] px-1.5 py-0.5 rounded">{query}</code> in the current network state.
                </p>
              </div>

              <div className="p-4 rounded bg-[#0E1012] border border-[#202328] text-left text-xs text-[#A7ADB5] space-y-2 font-mono max-w-lg mx-auto">
                <div className="font-semibold text-white font-sans text-xs">Supported Search Formats:</div>
                <div>• <strong className="text-white">Block Height:</strong> e.g. 1459203 or #1459203</div>
                <div>• <strong className="text-white">Transaction Hash:</strong> 64-character hex string starting with 0x</div>
                <div>• <strong className="text-white">Public Address:</strong> 40-character hex string starting with 0x</div>
                <div>• <strong className="text-white">Token Identifier:</strong> MNTA, MINT, USDC, wBTC, M-CRED</div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-[#5D646E] block mb-3 font-sans">Try searching one of these sample records:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addSearch('#1459203', '/blocks/1459203', 'block', 'Block #1,459,203');
                      navigate('/blocks/1459203');
                    }}
                    className="px-3 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs font-mono text-[#1677FF] transition-colors"
                  >
                    Block #1459203
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addSearch('MINT', '/tokens/MINT', 'token', 'MINT · Moneta Interlocking Token');
                      navigate('/tokens/MINT');
                    }}
                    className="px-3 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs font-mono text-[#1677FF] transition-colors"
                  >
                    Token MINT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const sampleHash = '0xa1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d';
                      addSearch(sampleHash, `/transactions/${sampleHash}`, 'transaction', `Tx ${formatHash(sampleHash)}`);
                      navigate(`/transactions/${sampleHash}`);
                    }}
                    className="px-3 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs font-mono text-[#1677FF] transition-colors"
                  >
                    Tx 0xa1b2...5c6d
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const sampleAddr = '0x71C8360537aaC1bFa199C96dd3007049Abf1973E';
                      addSearch(sampleAddr, `/addresses/${sampleAddr}`, 'address', `Address ${formatHash(sampleAddr)}`);
                      navigate(`/addresses/${sampleAddr}`);
                    }}
                    className="px-3 py-1 rounded bg-[#202328] hover:bg-[#2A2E35] text-xs font-mono text-[#1677FF] transition-colors"
                  >
                    Address 0x71C...
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Search History on Device */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#1677FF]" />
                <h3 className="text-sm font-semibold text-white">Local Search History</h3>
              </div>
              {hasHistory && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-1 text-[11px] text-[#A7ADB5] hover:text-[#FF8595] transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[#A7ADB5] leading-relaxed">
              Your recent queries are saved privately in your browser’s LocalStorage for instant access.
            </p>

            {hasHistory ? (
              <div className="space-y-2 pt-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      addSearch(item.query, item.path, item.type, item.displayLabel);
                      navigate(item.path);
                    }}
                    className="p-2.5 rounded-lg bg-[#0E1012] border border-[#202328] hover:border-[#1677FF]/50 transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded bg-[#1A1D21] flex items-center justify-center shrink-0">
                        {renderTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono font-medium text-white group-hover:text-[#1677FF] truncate">
                          {item.displayLabel}
                        </div>
                        <div className="text-[10px] text-[#5D646E] font-mono flex items-center gap-1">
                          <span className="uppercase">{item.type}</span>
                          <span>·</span>
                          <span>{formatTimeAgo(item.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      title="Remove query"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="p-1 text-[#5D646E] hover:text-[#FF8595] rounded hover:bg-[#1A1D21] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] text-center text-xs text-[#5D646E]">
                No search history recorded yet.
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] space-y-2">
            <span className="text-white font-semibold block font-sans">Quick Shortcuts</span>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Global Search Dialog</span>
              <span className="px-1.5 py-0.5 rounded bg-[#202328] text-white">Cmd + K</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Quick Input Focus</span>
              <span className="px-1.5 py-0.5 rounded bg-[#202328] text-white">/</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
