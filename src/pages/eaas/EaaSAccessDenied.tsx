import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { EaaSNav } from '../../components/eaas/EaaSNav';

export function EaaSAccessDenied() {
  return (
    <div className="space-y-8 pb-16">
      <EaaSNav />
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#2B1115] border border-[#4E1C24] flex items-center justify-center mx-auto text-[#FF8595]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8595] font-semibold">
            HTTP 403 Forbidden
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Access Denied
          </h1>
          <p className="text-xs text-[#A7ADB5] mt-2 leading-relaxed">
            Your authenticated customer role does not possess the requisite permissions to access this explorer project or perform this operation.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] text-left font-mono space-y-1">
          <div>• Private Vaults require <strong className="text-white">Admin</strong> or <strong className="text-white">Owner</strong>.</div>
          <div>• Key generation requires <strong className="text-white">Developer</strong> or higher.</div>
          <div>• Switch your role in the topbar to test permission scopes.</div>
        </div>

        <div className="pt-2">
          <Link
            to="/eaas/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
