import React from 'react';
import { Link } from 'react-router-dom';
import { ServerOff, RefreshCw, ArrowLeft } from 'lucide-react';
import { EaaSNav } from '../../components/eaas/EaaSNav';

export function EaaSServiceUnavailable() {
  return (
    <div className="space-y-8 pb-16">
      <EaaSNav />
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#15171A] border border-[#202328] flex items-center justify-center mx-auto text-[#E5A93C]">
          <ServerOff className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E5A93C] font-semibold">
            HTTP 503 Maintenance
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Service Temporarily Unavailable
          </h1>
          <p className="text-xs text-[#A7ADB5] mt-2 leading-relaxed">
            Downstream MONETA CHAIN consortium nodes or the EaaS container orchestrator are undergoing scheduled maintenance or failover recovery.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
          <Link
            to="/explorer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Explorer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
