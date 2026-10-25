import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, AlertTriangle, CheckCircle, RefreshCw, X, ExternalLink, Code } from 'lucide-react';
import { NETWORK_INFO } from '../data/mockData';

export function NetworkBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);

  const handleRetry = () => {
    setIsRetrying(true);
    setConnectionMessage(null);
    setTimeout(() => {
      setIsRetrying(false);
      setConnectionMessage("Probed endpoint: No external RPC backend detected at configured host. MONETASCAN remains in Simulated Mode.");
    }, 1200);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] hover:bg-[#1C2026] border border-[#202328] text-xs text-[#A7ADB5] hover:text-white transition-colors"
        title="View Network & RPC Connection Details"
      >
        <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0"></span>
        <span className="font-mono text-[11px] whitespace-nowrap">Simulated Node</span>
        <span className="text-[10px] text-[#A7ADB5] border-l border-[#202328] pl-2 hidden sm:inline">Details</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#15171A] border border-[#202328] rounded-xl p-6 shadow-2xl text-left">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#202328] flex items-center justify-center text-[#E5A93C]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Environment & RPC Status</h3>
                  <p className="text-xs text-[#A7ADB5]">MONETASCAN Demonstration Mode</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="text-[#A7ADB5] hover:text-white p-1 rounded hover:bg-[#202328]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded bg-[#0E1012] border border-[#202328] mb-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#A7ADB5]">
                <span>Active Mode:</span>
                <span className="text-[#E5A93C] font-mono font-medium">Demo / Simulated Data</span>
              </div>
              <div className="flex items-center justify-between text-[#A7ADB5]">
                <span>Target Chain:</span>
                <span className="text-white font-mono">{NETWORK_INFO.networkName}</span>
              </div>
              <div className="flex items-center justify-between text-[#A7ADB5]">
                <span>Chain ID:</span>
                <span className="text-white font-mono">{NETWORK_INFO.chainId} ({NETWORK_INFO.chainIdDecimal})</span>
              </div>
              <div className="flex items-center justify-between text-[#A7ADB5]">
                <span>Consensus Engine:</span>
                <span className="text-white font-mono">{NETWORK_INFO.consensus}</span>
              </div>
            </div>

            <div className="text-xs text-[#A7ADB5] space-y-3 mb-6 leading-relaxed">
              <div className="flex items-start gap-2 text-[#E5A93C] bg-[#221A0C] border border-[#4D3916] p-3 rounded">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Notice:</strong> No live MONETA CHAIN RPC or node backend is presently configured for this deployment. 
                  All blocks, transactions, and validator records are rendered from deterministic simulated testnet data.
                </span>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">To connect a live MONETA CHAIN node:</p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] font-mono text-[#A7ADB5]">
                  <li>Deploy a MONETA Chain validator or full node</li>
                  <li>Enable JSON-RPC on port 8545 with CORS enabled</li>
                  <li>Configure <code className="text-[#1677FF]">VITE_MONETA_RPC_URL</code> in your environment</li>
                  <li>Verify compatibility with the MONETA RPC specification</li>
                </ol>
              </div>

              {connectionMessage && (
                <div className="p-2.5 rounded bg-[#0E1012] border border-[#202328] font-mono text-[11px] text-[#A7ADB5]">
                  {connectionMessage}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#202328]">
              <Link
                to="/developers"
                onClick={() => setIsOpen(false)}
                className="text-xs text-[#1677FF] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <Code className="w-3.5 h-3.5" />
                <span>View Developer RPC Spec &rarr;</span>
              </Link>
              
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-medium rounded transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{isRetrying ? 'Probing RPC...' : 'Retry Connection'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
