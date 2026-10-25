import { useState, useEffect, useCallback } from 'react';
import { TOKENS } from '../data/mockData';
import { formatHash, formatNumber } from '../utils';

export type SearchItemType = 'block' | 'transaction' | 'address' | 'token' | 'general';

export interface SearchHistoryItem {
  id: string;
  query: string;
  displayLabel: string;
  type: SearchItemType;
  path: string;
  timestamp: number;
}

const STORAGE_KEY = 'monetascan_search_history_v1';
const MAX_HISTORY_ITEMS = 8;
const HISTORY_CHANGE_EVENT = 'monetascan_history_change';

// Format relative time concisely
export function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 45) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// Inspect query to classify its category, destination path, and human-friendly display label
export function classifySearchQuery(rawQuery: string): {
  type: SearchItemType;
  path: string;
  displayLabel: string;
} {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();
  const cleanNumber = query.replace(/^#/, '');

  // 1. Known Tokens
  const upper = query.toUpperCase();
  const tokenMatch = TOKENS.find(
    (t) => t.symbol.toUpperCase() === upper || t.name.toLowerCase() === lower
  );
  if (tokenMatch) {
    return {
      type: 'token',
      path: `/tokens/${tokenMatch.symbol}`,
      displayLabel: `${tokenMatch.symbol} · ${tokenMatch.name}`,
    };
  }

  // 2. Block Height (#123 or 123)
  if (/^\d+$/.test(cleanNumber)) {
    const height = parseInt(cleanNumber, 10);
    return {
      type: 'block',
      path: `/blocks/${height}`,
      displayLabel: `Block #${formatNumber(height)}`,
    };
  }

  // 3. Hex Strings (Tx Hash, Block Hash, or Address)
  if (query.startsWith('0x') || /^[a-fA-F0-9]+$/.test(query)) {
    const normalized = query.startsWith('0x') ? query : `0x${query}`;
    
    // Address (40 or 42 chars)
    if (normalized.length === 42) {
      return {
        type: 'address',
        path: `/addresses/${normalized}`,
        displayLabel: `Address ${formatHash(normalized)}`,
      };
    }

    // Tx or Block Hash (64 or 66 chars)
    if (normalized.length === 66) {
      return {
        type: 'transaction',
        path: `/transactions/${normalized}`,
        displayLabel: `Tx ${formatHash(normalized)}`,
      };
    }
  }

  // Default to general search
  return {
    type: 'general',
    path: `/search?q=${encodeURIComponent(query)}`,
    displayLabel: query,
  };
}

export function loadSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) => item && typeof item.query === 'string' && typeof item.path === 'string'
      );
    }
    return [];
  } catch (err) {
    console.error('Failed to read search history from localStorage:', err);
    return [];
  }
}

export function saveSearchHistory(items: SearchHistoryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_HISTORY_ITEMS)));
    window.dispatchEvent(new CustomEvent(HISTORY_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to save search history to localStorage:', err);
  }
}

export function recordSearch(
  query: string,
  explicitPath?: string,
  explicitType?: SearchItemType,
  explicitLabel?: string
): SearchHistoryItem[] {
  const trimmed = query.trim();
  if (!trimmed) return loadSearchHistory();

  const current = loadSearchHistory();
  const classified = classifySearchQuery(trimmed);

  const finalPath = explicitPath || classified.path;
  const finalType = explicitType || classified.type;
  const finalLabel = explicitLabel || classified.displayLabel;

  // Filter out any existing item with same query or path to avoid duplicates
  const filtered = current.filter(
    (item) => item.query.toLowerCase() !== trimmed.toLowerCase() && item.path !== finalPath
  );

  const newItem: SearchHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    query: trimmed,
    displayLabel: finalLabel,
    type: finalType,
    path: finalPath,
    timestamp: Date.now(),
  };

  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
  saveSearchHistory(updated);
  return updated;
}

export function removeSearchHistoryItem(id: string): SearchHistoryItem[] {
  const current = loadSearchHistory();
  const updated = current.filter((item) => item.id !== id);
  saveSearchHistory(updated);
  return updated;
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(HISTORY_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to clear search history:', err);
  }
}

// React Hook for components
export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => loadSearchHistory());

  const refresh = useCallback(() => {
    setHistory(loadSearchHistory());
  }, []);

  useEffect(() => {
    refresh();

    const handleCustomChange = () => refresh();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        refresh();
      }
    };

    window.addEventListener(HISTORY_CHANGE_EVENT, handleCustomChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(HISTORY_CHANGE_EVENT, handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refresh]);

  const addSearch = useCallback(
    (query: string, path?: string, type?: SearchItemType, label?: string) => {
      return recordSearch(query, path, type, label);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    return removeSearchHistoryItem(id);
  }, []);

  const clearAll = useCallback(() => {
    clearSearchHistory();
  }, []);

  return {
    history,
    addSearch,
    removeItem,
    clearAll,
    hasHistory: history.length > 0,
  };
}
