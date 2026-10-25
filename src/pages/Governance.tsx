import React, { useState } from 'react';
import { Vote, FileText, CheckCircle, XCircle } from 'lucide-react';
import { GOVERNANCE_PROPOSALS } from '../data/mockData';

export function Governance() {
  const [votedProposals, setVotedProposals] = useState<Record<string | number, string>>({});

  const handleVote = (id: string | number, vote: string) => {
    setVotedProposals(prev => ({ ...prev, [id]: vote }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Consortium Governance</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">MIP Proposals</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Vote className="w-7 h-7 text-[#1677FF]" />
          Governance & Protocol Proposals
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1">
          On-chain voting by authenticated consortium participants and validator operators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
          <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Active Proposals</p>
          <h3 className="text-2xl font-bold font-mono text-white tracking-tight">1</h3>
        </div>
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
          <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Passed Proposals</p>
          <h3 className="text-2xl font-bold font-mono text-[#10B981] tracking-tight">41</h3>
        </div>
        <div className="p-5 rounded-xl bg-[#15171A] border border-[#202328]">
          <p className="text-xs font-semibold text-[#A7ADB5] uppercase tracking-wider mb-1">Consortium Quorum</p>
          <h3 className="text-2xl font-bold font-mono text-[#1677FF] tracking-tight">66.7%</h3>
        </div>
      </div>

      <div className="space-y-4">
        {GOVERNANCE_PROPOSALS.map((proposal) => (
          <div 
            key={proposal.id}
            className="p-6 rounded-xl bg-[#15171A] border border-[#202328] space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-[#202328] px-2 py-0.5 rounded">
                    {proposal.id}
                  </span>
                  {proposal.status === 'active' ? (
                    <span className="px-2 py-0.5 rounded bg-[#1677FF]/15 text-[#1677FF] text-xs font-semibold uppercase font-mono">
                      Active Voting
                    </span>
                  ) : proposal.status === 'passed' ? (
                    <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] text-xs font-semibold uppercase font-mono">
                      Passed & Enacted
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#202328] text-[#A7ADB5] text-xs font-semibold uppercase font-mono">
                      Rejected
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{proposal.title}</h3>
                <p className="text-xs text-[#A7ADB5] flex items-center gap-2 font-mono">
                  <FileText className="w-3.5 h-3.5 text-[#5D646E]" /> 
                  Proposed by: <span className="text-white">{proposal.creator}</span>
                </p>
              </div>

              <div className="w-full md:w-64 space-y-2 font-mono">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#10B981]">{proposal.yes}% Yes</span>
                  <span className="text-[#EF4444]">{proposal.no}% No</span>
                </div>
                <div className="w-full h-2 rounded bg-[#0E1012] overflow-hidden flex border border-[#202328]">
                  <div className="bg-[#10B981] h-full" style={{ width: `${proposal.yes}%` }} />
                  <div className="bg-[#202328] h-full" style={{ width: `${proposal.abstain}%` }} />
                  <div className="bg-[#EF4444] h-full" style={{ width: `${proposal.no}%` }} />
                </div>
                <p className="text-[11px] text-[#A7ADB5] text-right font-sans">
                  {proposal.status === 'active' ? `Ends in ${proposal.deadline}` : 'Voting Finalized'}
                </p>
              </div>
            </div>
            
            {proposal.status === 'active' && (
              <div className="pt-4 border-t border-[#202328] flex flex-col sm:flex-row gap-3">
                {votedProposals[proposal.id] ? (
                  <div className="flex-1 py-2 rounded bg-[#0E1012] border border-[#202328] text-white text-xs font-mono flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    Vote Recorded: {votedProposals[proposal.id]}
                  </div>
                ) : (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleVote(proposal.id, 'Yes')}
                      className="flex-1 py-2 rounded bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/30 transition-colors text-xs font-semibold font-mono"
                    >
                      Vote Yes
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleVote(proposal.id, 'Abstain')}
                      className="flex-1 py-2 rounded bg-[#202328] hover:bg-[#2A2E35] text-white transition-colors text-xs font-medium font-mono"
                    >
                      Abstain
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleVote(proposal.id, 'No')}
                      className="flex-1 py-2 rounded bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] border border-[#EF4444]/30 transition-colors text-xs font-semibold font-mono"
                    >
                      Vote No
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
