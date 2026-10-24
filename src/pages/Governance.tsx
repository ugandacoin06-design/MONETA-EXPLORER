import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Vote, FileText, CheckCircle, XCircle } from 'lucide-react';
import { GOVERNANCE_PROPOSALS } from '../data/mockData';

export function Governance() {
  const [votedProposals, setVotedProposals] = useState<Record<string | number, string>>({});

  const handleVote = (id: string | number, vote: string) => {
    setVotedProposals(prev => ({ ...prev, [id]: vote }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Vote className="w-6 h-6 text-blue-400" />
            Governance
          </h1>
          <p className="text-slate-400 text-sm mt-1">Consortium decision-making and on-chain voting proposals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400 mb-1">Active Proposals</p>
            <h3 className="text-3xl font-semibold text-white tracking-tight">1</h3>
         </div>
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400 mb-1">Passed Proposals</p>
            <h3 className="text-3xl font-semibold text-white tracking-tight">41</h3>
         </div>
         <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400 mb-1">Your Voting Power</p>
            <h3 className="text-3xl font-semibold text-blue-400 tracking-tight">15.2%</h3>
         </div>
      </div>

      <div className="space-y-4">
        {GOVERNANCE_PROPOSALS.map((proposal, i) => (
          <motion.div 
            key={proposal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 group hover:border-blue-500/30 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-slate-500">#{proposal.id}</span>
                  {proposal.status === 'active' ? (
                     <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium uppercase tracking-wider">
                       Active Voting
                     </span>
                  ) : proposal.status === 'passed' ? (
                     <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium uppercase tracking-wider">
                       Passed
                     </span>
                  ) : (
                     <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium uppercase tracking-wider">
                       Rejected
                     </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{proposal.title}</h3>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 
                  Proposed by <span className="text-slate-200">{proposal.creator}</span>
                </p>
              </div>

              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> {proposal.yes}% Yes</span>
                  <span className="text-slate-400 flex items-center gap-1"><XCircle className="w-3 h-3"/> {proposal.no}% No</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
                  <div className="bg-emerald-500 h-full" style={{ width: `${proposal.yes}%` }} />
                  <div className="bg-slate-700 h-full" style={{ width: `${proposal.abstain}%` }} />
                  <div className="bg-slate-500 h-full" style={{ width: `${proposal.no}%` }} />
                </div>
                <p className="text-xs text-slate-500 text-right">
                  {proposal.status === 'active' ? `Ends in ${proposal.deadline}` : 'Voting Closed'}
                </p>
              </div>
            </div>
            
            {proposal.status === 'active' && (
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                {votedProposals[proposal.id] ? (
                  <div className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    You voted {votedProposals[proposal.id]}
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleVote(proposal.id, 'Yes')}
                      className="flex-1 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors font-medium">
                      Vote Yes
                    </button>
                    <button 
                      onClick={() => handleVote(proposal.id, 'Abstain')}
                      className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-medium text-sm">
                      Abstain
                    </button>
                    <button 
                      onClick={() => handleVote(proposal.id, 'No')}
                      className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-colors font-medium">
                      Vote No
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
