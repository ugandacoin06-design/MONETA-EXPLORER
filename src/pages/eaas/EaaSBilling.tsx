import React from 'react';
import { CreditCard, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, Code } from 'lucide-react';
import { EaaSNav } from '../../components/eaas/EaaSNav';
import { BILLING_PLANS } from '../../data/eaasData';
import { BACKEND_CONTRACTS } from '../../services/eaasClient';

export function EaaSBilling() {
  const billingContract = BACKEND_CONTRACTS.billingSync;

  return (
    <div className="space-y-8 pb-20">
      <EaaSNav />

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#202328] pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Financial & Subscription</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">Tiered Quotas</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-[#1677FF]" />
            Subscription & Billing Plans
          </h1>
          <p className="text-xs text-[#A7ADB5] mt-1">
            Manage your organization's explorer capacity, support SLA, and dedicated node quotas.
          </p>
        </div>

        {/* Clear Notice: Live Billing Integration Unavailable */}
        <div className="p-5 rounded-xl bg-[#1A1813] border border-[#E5A93C]/50 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-[#E5A93C] font-bold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>PAYMENT GATEWAY BACKEND INTEGRATION STATUS: CURRENTLY UNAVAILABLE</span>
          </div>
          <p className="text-white leading-relaxed">
            As a frontend-only platform, live credit card processing, automated recurring invoices, and Stripe webhook synchronization require a live backend payment microservice. No fraudulent mock transactions or simulated payments will be triggered.
          </p>
          <div className="p-3 rounded bg-[#0E1012] border border-[#202328] font-mono text-[11px] text-[#A7ADB5] space-y-1">
            <div className="text-white font-semibold">Required Backend Endpoint:</div>
            <div><strong className="text-[#1677FF]">GET/POST {billingContract.endpoint}</strong></div>
            <div className="text-[10px] text-[#5D646E]">{billingContract.description}</div>
          </div>
        </div>

        {/* Available Tier Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BILLING_PLANS.map(plan => (
            <div
              key={plan.id}
              className="p-6 rounded-xl bg-[#15171A] border border-[#202328] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1677FF] font-bold">
                    {plan.tier}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{plan.name}</h3>
                  <div className="text-lg font-bold font-mono text-white mt-2">
                    {plan.monthlyFee}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#A7ADB5] pt-2 border-t border-[#202328]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Up to <strong className="text-white">{plan.includedProjects}</strong> hosted explorers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span><strong className="text-white font-mono">{plan.monthlyRequests.toLocaleString()}</strong> monthly API calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{plan.supportLevel}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  disabled
                  className="w-full py-2 bg-[#202328] text-[#5D646E] text-xs font-semibold rounded-lg cursor-not-allowed text-center"
                >
                  Payment Backend Offline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
