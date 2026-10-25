import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, LogIn, ArrowRight } from 'lucide-react';

export function EaaSSessionExpired() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#15171A] border border-[#202328] flex items-center justify-center mx-auto text-[#E5A93C]">
        <Clock className="w-8 h-8" />
      </div>

      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#E5A93C] font-semibold">
          Security Timeout
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
          Session Expired
        </h1>
        <p className="text-xs text-[#A7ADB5] mt-2 leading-relaxed">
          Your customer session token has expired to protect your organization's explorer configurations and API credentials.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/eaas/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span>Re-Authenticate Session</span>
        </Link>
      </div>
    </div>
  );
}
