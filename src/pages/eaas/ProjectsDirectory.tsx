import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Plus, 
  Search, 
  Globe, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Lock, 
  Activity,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { formatNumber } from '../../utils';
import { EaaSNav } from '../../components/eaas/EaaSNav';
import { NetworkMode } from '../../types/eaas';

export function ProjectsDirectory() {
  const { projects, networks } = useEaaS();
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | NetworkMode>('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.slug.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesMode = filterMode === 'all' || p.mode === filterMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-8 pb-16">
      <EaaSNav />

      <div className="px-4 md:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Project Management</span>
              <span className="text-[#A7ADB5]">·</span>
              <span className="text-xs text-[#A7ADB5] font-mono">Directory & Indexers</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Layers className="w-7 h-7 text-[#1677FF]" />
              Explorer Projects Directory
            </h1>
            <p className="text-xs text-[#A7ADB5] mt-1">
              All hosted explorer instances provisioned across your organization’s access scopes.
            </p>
          </div>

          <Link
            to="/eaas/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors shadow shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Explorer</span>
          </Link>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#15171A] p-3 rounded-xl border border-[#202328]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name, slug, or keywords..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0E1012] border border-[#202328] rounded-lg text-xs text-white placeholder-[#5D646E] focus:outline-none focus:border-[#1677FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#A7ADB5] font-mono">Mode:</span>
            {(['all', 'public', 'consortium', 'private'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  filterMode === mode 
                    ? 'bg-[#1677FF] text-white font-semibold' 
                    : 'bg-[#0E1012] text-[#A7ADB5] hover:text-white border border-[#202328]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List/Table */}
        {filteredProjects.length > 0 ? (
          <div className="divide-y divide-[#202328] border border-[#202328] rounded-xl bg-[#15171A] overflow-hidden">
            {filteredProjects.map((p) => {
              const net = networks.find(n => n.id === p.networkId);
              let modeColor = 'text-[#1677FF] bg-[#1677FF]/15 border-[#1677FF]/30';
              if (p.mode === 'consortium') modeColor = 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
              if (p.mode === 'private') modeColor = 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30';

              return (
                <div key={p.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#181B20] transition-colors">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base font-bold text-white tracking-tight">{p.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${modeColor}`}>
                        {p.mode}
                      </span>
                      <span className="text-xs text-[#10B981] font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        {p.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#A7ADB5] max-w-2xl">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#5D646E] pt-1">
                      <span>Network: <strong className="text-[#A7ADB5] font-sans">{net?.name || p.networkId}</strong></span>
                      <span>Slug: <strong className="text-[#A7ADB5]">{p.slug}</strong></span>
                      <span>Domains: <strong className="text-[#A7ADB5]">{p.domains.length} configured</strong></span>
                      <span>API Traffic: <strong className="text-[#A7ADB5]">{formatNumber(p.usage.currentRequests)} reqs</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to={`/eaas/projects/${p.id}`}
                      className="px-4 py-2 bg-[#202328] hover:bg-[#2A2E35] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Configure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center border border-[#202328] rounded-xl bg-[#15171A] space-y-4">
            <Layers className="w-10 h-10 text-[#5D646E] mx-auto" />
            <h3 className="text-base font-bold text-white">No Explorer Projects Match Filter</h3>
            <p className="text-xs text-[#A7ADB5] max-w-md mx-auto">
              No projects found for the current query or network mode. Adjust your search parameters or provision a new explorer.
            </p>
            <button
              type="button"
              onClick={() => { setSearch(''); setFilterMode('all'); }}
              className="px-4 py-2 bg-[#202328] text-xs text-white rounded-lg hover:bg-[#2A2E35]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
