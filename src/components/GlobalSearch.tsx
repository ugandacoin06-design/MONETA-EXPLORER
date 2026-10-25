import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Box, 
  ArrowRightLeft, 
  Wallet, 
  Coins, 
  X, 
  Loader2, 
  ArrowRight, 
  CornerDownLeft, 
  AlertCircle,
  History,
  Trash2
} from 'lucide-react';
import { LATEST_BLOCKS, LATEST_TRANSACTIONS, TOKENS, VALIDATORS } from '../data/mockData';
import { 
  useSearchHistory, 
  formatTimeAgo, 
  SearchItemType, 
  SearchHistoryItem 
} from '../utils/searchHistory';
import { formatHash, formatNumber } from '../utils';

export type SearchCategory = 'all' | 'blocks' | 'transactions' | 'addresses' | 'tokens';

interface GlobalSearchProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
  placeholder?: string;
  className?: string;
}

export function GlobalSearch({
  isOpen = false,
  onClose,
  isModal = false,
  placeholder = "Search by Address / Txn Hash / Block / Token (e.g. MNTA, MINT)...",
  className = ""
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { history, addSearch, removeItem, clearAll, hasHistory } = useSearchHistory();

  // Focus input when opened as modal
  useEffect(() => {
    if (isModal && isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setErrorMessage(null);
    }
  }, [isModal, isOpen]);

  // Handle clicking outside inline search to close dropdown
  useEffect(() => {
    if (isModal) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModal]);

  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();
  const cleanNumber = trimmed.replace(/^#/, '');

  // Filter history items matching the active category and current query
  const matchingHistory = history.filter(item => {
    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'blocks' && item.type !== 'block') return false;
      if (activeCategory === 'transactions' && item.type !== 'transaction') return false;
      if (activeCategory === 'addresses' && item.type !== 'address') return false;
      if (activeCategory === 'tokens' && item.type !== 'token') return false;
    }
    // Query filter
    if (!trimmed) return true;
    return (
      item.query.toLowerCase().includes(lower) ||
      item.displayLabel.toLowerCase().includes(lower)
    );
  });

  // Derive suggested results based on input
  const getResults = () => {
    if (!trimmed) return [];

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'block' | 'transaction' | 'address' | 'token';
      path: string;
      badge: string;
      rawQuery: string;
    }> = [];

    // 1. Check Tokens
    if (activeCategory === 'all' || activeCategory === 'tokens') {
      TOKENS.forEach(t => {
        if (t.symbol.toLowerCase().includes(lower) || t.name.toLowerCase().includes(lower) || t.contract.toLowerCase() === lower) {
          results.push({
            id: `token-${t.symbol}`,
            title: `${t.symbol} — ${t.name}`,
            subtitle: `Supply: ${t.totalSupply} · Price: ${t.price}`,
            category: 'token',
            path: `/tokens/${t.symbol}`,
            badge: 'Token',
            rawQuery: t.symbol
          });
        }
      });
    }

    // 2. Check Blocks (number or hash)
    if (activeCategory === 'all' || activeCategory === 'blocks') {
      if (/^\d+$/.test(cleanNumber)) {
        const height = parseInt(cleanNumber, 10);
        results.push({
          id: `block-${height}`,
          title: `Block #${height.toLocaleString()}`,
          subtitle: `Inspect block height #${height}`,
          category: 'block',
          path: `/blocks/${height}`,
          badge: 'Block Height',
          rawQuery: `#${height}`
        });
      }
      LATEST_BLOCKS.forEach(b => {
        if (b.hash.toLowerCase().includes(lower) && !results.some(r => r.id === `block-${b.height}`)) {
          results.push({
            id: `block-${b.height}`,
            title: `Block #${b.height.toLocaleString()}`,
            subtitle: `Hash: ${b.hash.slice(0, 16)}... · Validator: ${b.validator}`,
            category: 'block',
            path: `/blocks/${b.height}`,
            badge: 'Block',
            rawQuery: b.hash
          });
        }
      });
    }

    // 3. Check Transactions (hash)
    if (activeCategory === 'all' || activeCategory === 'transactions') {
      LATEST_TRANSACTIONS.forEach(tx => {
        if (tx.hash.toLowerCase().includes(lower)) {
          results.push({
            id: `tx-${tx.hash}`,
            title: `Tx ${tx.hash.slice(0, 18)}...`,
            subtitle: `From: ${tx.from.slice(0, 10)}... · Amount: ${tx.amount}`,
            category: 'transaction',
            path: `/transactions/${tx.hash}`,
            badge: 'Transaction',
            rawQuery: tx.hash
          });
        }
      });

      if (lower.startsWith('0x') && lower.length >= 10 && !results.some(r => r.category === 'transaction')) {
        results.push({
          id: `tx-direct-${lower}`,
          title: `Tx ${lower.slice(0, 20)}...`,
          subtitle: `Inspect transaction record on MONETA Chain`,
          category: 'transaction',
          path: `/transactions/${trimmed}`,
          badge: 'Transaction Hash',
          rawQuery: trimmed
        });
      }
    }

    // 4. Check Addresses
    if (activeCategory === 'all' || activeCategory === 'addresses') {
      VALIDATORS.forEach(v => {
        if (v.address.toLowerCase().includes(lower) || v.name.toLowerCase().includes(lower)) {
          results.push({
            id: `addr-${v.address}`,
            title: `${v.name} (${v.address.slice(0, 12)}...)`,
            subtitle: `Validator Node · ${v.votingPower} voting power`,
            category: 'address',
            path: `/addresses/${v.address}`,
            badge: 'Validator',
            rawQuery: v.address
          });
        }
      });

      if (lower.startsWith('0x') && lower.length >= 10 && !results.some(r => r.category === 'address')) {
        results.push({
          id: `addr-direct-${lower}`,
          title: `Address ${lower.slice(0, 16)}...`,
          subtitle: `Inspect balance and activity for this public address`,
          category: 'address',
          path: `/addresses/${trimmed}`,
          badge: 'Address',
          rawQuery: trimmed
        });
      }
    }

    return results;
  };

  const results = getResults();

  const handleSelectHistoryItem = (item: SearchHistoryItem) => {
    addSearch(item.query, item.path, item.type, item.displayLabel);
    setIsLoading(true);
    if (onClose) onClose();
    setIsFocused(false);
    navigate(item.path);
    setIsLoading(false);
  };

  const handleSelectResult = (
    path: string, 
    type?: SearchItemType, 
    title?: string, 
    searchQuery?: string
  ) => {
    const q = searchQuery || trimmed;
    addSearch(q, path, type, title);
    setIsLoading(true);
    if (onClose) onClose();
    setIsFocused(false);
    navigate(path);
    setIsLoading(false);
  };

  const handleExecuteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!trimmed) return;

    setIsLoading(true);

    const cleanNum = trimmed.replace(/^#/, '');
    const isNumber = /^\d+$/.test(cleanNum);
    const isHex = /^0x[a-fA-F0-9]+$/i.test(trimmed);
    const upper = trimmed.toUpperCase();
    const tokenMatch = TOKENS.find(t => t.symbol.toUpperCase() === upper);

    if (tokenMatch) {
      addSearch(tokenMatch.symbol, `/tokens/${tokenMatch.symbol}`, 'token', `${tokenMatch.symbol} · ${tokenMatch.name}`);
      if (onClose) onClose();
      setIsFocused(false);
      navigate(`/tokens/${tokenMatch.symbol}`);
      setIsLoading(false);
      return;
    }

    if (isNumber) {
      const height = parseInt(cleanNum, 10);
      addSearch(`#${height}`, `/blocks/${height}`, 'block', `Block #${formatNumber(height)}`);
      if (onClose) onClose();
      setIsFocused(false);
      navigate(`/blocks/${height}`);
      setIsLoading(false);
      return;
    }

    if (isHex) {
      if (trimmed.length === 66 || trimmed.length === 64) {
        addSearch(trimmed, `/transactions/${trimmed}`, 'transaction', `Tx ${formatHash(trimmed)}`);
        if (onClose) onClose();
        setIsFocused(false);
        navigate(`/transactions/${trimmed}`);
        setIsLoading(false);
        return;
      } else if (trimmed.length === 42 || trimmed.length === 40) {
        addSearch(trimmed, `/addresses/${trimmed}`, 'address', `Address ${formatHash(trimmed)}`);
        if (onClose) onClose();
        setIsFocused(false);
        navigate(`/addresses/${trimmed}`);
        setIsLoading(false);
        return;
      }
    }

    // If first result exists, go to it
    if (results.length > 0) {
      const first = results[0];
      handleSelectResult(first.path, first.category, first.title, first.rawQuery);
      return;
    }

    // Otherwise navigate to general search page and save to history
    if (trimmed.length >= 2) {
      addSearch(trimmed, `/search?q=${encodeURIComponent(trimmed)}`, 'general', trimmed);
      if (onClose) onClose();
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setErrorMessage("Unrecognized search format. Enter a Block Height (e.g. 1459203), Tx Hash (0x...), Address (0x...), or Token (MNTA, MINT).");
  };

  // Helper to render type icons
  const renderTypeIcon = (type: SearchItemType) => {
    switch (type) {
      case 'block':
        return <Box className="w-4 h-4 text-[#1677FF]" />;
      case 'transaction':
        return <ArrowRightLeft className="w-4 h-4 text-[#10B981]" />;
      case 'address':
        return <Wallet className="w-4 h-4 text-[#E5A93C]" />;
      case 'token':
        return <Coins className="w-4 h-4 text-[#8B5CF6]" />;
      default:
        return <Search className="w-4 h-4 text-[#A7ADB5]" />;
    }
  };

  const showDropdown = isModal || (isFocused && (hasHistory || trimmed.length > 0));

  const content = (
    <div className={`w-full ${isModal ? 'bg-[#15171A] border border-[#202328] rounded-xl shadow-2xl overflow-hidden' : 'relative'}`}>
      {/* Category Tabs */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-[#202328] bg-[#0E1012] text-xs">
        {(['all', 'blocks', 'transactions', 'addresses', 'tokens'] as SearchCategory[]).map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActiveCategory(cat);
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded transition-colors uppercase tracking-wider font-medium text-[11px] ${
              activeCategory === cat 
                ? 'bg-[#1677FF] text-white' 
                : 'text-[#A7ADB5] hover:text-white hover:bg-[#1A1D21]'
            }`}
          >
            {cat}
          </button>
        ))}
        {isModal && onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="ml-auto text-[#A7ADB5] hover:text-white p-1 rounded hover:bg-[#1A1D21] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Input row */}
      <form onSubmit={handleExecuteSearch} className="relative flex items-center px-4 py-3 bg-[#15171A]">
        <Search className="w-5 h-5 text-[#A7ADB5] shrink-0 mr-3" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setErrorMessage(null);
            setSelectedIndex(0);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder-[#5D646E] text-sm md:text-base focus:outline-none font-sans"
        />
        {query && (
          <button 
            type="button" 
            onClick={() => {
              setQuery('');
              setErrorMessage(null);
              inputRef.current?.focus();
            }} 
            className="text-[#A7ADB5] hover:text-white p-1 mr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!trimmed || isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1677FF] hover:bg-[#1366DB] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded transition-colors shrink-0"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CornerDownLeft className="w-3.5 h-3.5" />}
          <span>Search</span>
        </button>
      </form>

      {/* Error state */}
      {errorMessage && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2B1115] border-t border-[#4E1C24] text-[#FF8595] text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Dropdown panel for both modal and inline when focused */}
      {showDropdown && (
        <div className={`${!isModal ? 'absolute top-full left-0 right-0 z-50 mt-1 rounded-b-xl border border-[#202328] shadow-2xl' : 'border-t border-[#202328]'} bg-[#121417] max-h-80 overflow-y-auto divide-y divide-[#202328]/60`}>
          
          {/* SECTION 1: Matching live results when query is present */}
          {trimmed && (
            <div>
              <div className="px-4 py-2 bg-[#0E1012] flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#A7ADB5]">
                <span>Live Matches ({results.length})</span>
                <span className="font-mono text-[10px] text-[#5D646E]">Enter to navigate</span>
              </div>
              {results.length > 0 ? (
                results.map((item, idx) => {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectResult(item.path, item.category, item.title, item.rawQuery)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                        idx === selectedIndex ? 'bg-[#1C2026]' : 'hover:bg-[#181B20]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded bg-[#202328] flex items-center justify-center shrink-0">
                          {renderTypeIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] text-[#A7ADB5] bg-[#202328] px-1.5 py-0.5 rounded font-mono">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-xs text-[#A7ADB5] font-mono truncate">{item.subtitle}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A7ADB5] shrink-0 ml-2" />
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-4 text-center text-xs text-[#A7ADB5]">
                  <p>No exact dataset match for "{trimmed}".</p>
                  <button
                    type="button"
                    onClick={handleExecuteSearch}
                    className="mt-2 text-[#1677FF] hover:underline inline-flex items-center gap-1"
                  >
                    Execute full query parser &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: Recent Searches from LocalStorage */}
          {matchingHistory.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-[#0E1012] flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#A7ADB5]">
                <div className="flex items-center gap-1.5 text-white">
                  <History className="w-3.5 h-3.5 text-[#1677FF]" />
                  <span>Recent Searches</span>
                  <span className="text-[10px] text-[#5D646E] font-normal font-mono">
                    ({matchingHistory.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#A7ADB5] hover:text-[#FF8595] transition-colors lowercase"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>clear all</span>
                </button>
              </div>

              <div className="divide-y divide-[#202328]/40">
                {matchingHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectHistoryItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelectHistoryItem(item);
                    }}
                    className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#181B20] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded bg-[#202328] flex items-center justify-center shrink-0">
                        {renderTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-xs md:text-sm font-mono truncate flex items-center gap-2">
                          <span className="group-hover:text-[#1677FF] transition-colors">{item.displayLabel}</span>
                          <span className="text-[10px] text-[#A7ADB5] bg-[#202328] px-1.5 py-0.2 rounded uppercase font-sans">
                            {item.type}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#5D646E] font-mono truncate flex items-center gap-1.5">
                          <span>{item.query}</span>
                          <span>·</span>
                          <span className="text-[#A7ADB5]">{formatTimeAgo(item.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-2 shrink-0">
                      <button
                        type="button"
                        title="Remove from history"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="p-1 text-[#5D646E] hover:text-[#FF8595] rounded hover:bg-[#202328] transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: Empty State & Quick Query Suggestions when no history */}
          {!trimmed && matchingHistory.length === 0 && (
            <div className="p-5 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#A7ADB5]">
                <History className="w-4 h-4 text-[#5D646E]" />
                <span>No recent searches yet. Search for blocks, addresses, or transactions to save them here.</span>
              </div>
              <div className="pt-1">
                <span className="text-[11px] uppercase tracking-wider text-[#5D646E] font-semibold block mb-2 font-mono">
                  Quick Explorer Samples:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectResult('/blocks/1459203', 'block', 'Block #1,459,203', '1459203')}
                    className="px-2.5 py-1 rounded bg-[#1A1D21] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-white hover:text-[#1677FF] transition-colors flex items-center gap-1.5"
                  >
                    <Box className="w-3 h-3 text-[#1677FF]" />
                    <span>Block #1,459,203</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectResult('/tokens/MINT', 'token', 'MINT · Moneta Interlocking Token', 'MINT')}
                    className="px-2.5 py-1 rounded bg-[#1A1D21] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-white hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5"
                  >
                    <Coins className="w-3 h-3 text-[#8B5CF6]" />
                    <span>MINT Stablecoin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectResult('/tokens/MNTA', 'token', 'MNTA · Moneta Native Token', 'MNTA')}
                    className="px-2.5 py-1 rounded bg-[#1A1D21] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-white hover:text-[#1677FF] transition-colors flex items-center gap-1.5"
                  >
                    <Coins className="w-3 h-3 text-[#1677FF]" />
                    <span>MNTA Native</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectResult('/addresses/0x71C8360537aaC1bFa199C96dd3007049Abf1973E', 'address', 'Address 0x71C836...1973E', '0x71C8360537aaC1bFa199C96dd3007049Abf1973E')}
                    className="px-2.5 py-1 rounded bg-[#1A1D21] hover:bg-[#202328] border border-[#202328] text-xs font-mono text-white hover:text-[#E5A93C] transition-colors flex items-center gap-1.5"
                  >
                    <Wallet className="w-3 h-3 text-[#E5A93C]" />
                    <span>Address 0x71C...</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick shortcuts footer */}
          <div className="px-4 py-2 border-t border-[#202328] bg-[#0E1012] flex items-center justify-between text-[11px] text-[#A7ADB5]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#5D646E]">Queries are stored locally on your device</span>
            </div>
            {isModal && (
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className="bg-[#202328] px-1.5 py-0.5 rounded text-white">ESC</span>
                <span>to close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
        <div 
          className="fixed inset-0" 
          onClick={onClose} 
          aria-hidden="true" 
        />
        <div className={`relative w-full max-w-2xl ${className}`}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {content}
    </div>
  );
}
