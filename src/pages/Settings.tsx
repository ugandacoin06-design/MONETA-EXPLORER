import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Monitor, Bell, Shield, Globe } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [compactMode, setCompactMode] = useState(false);
  const [liveStreaming, setLiveStreaming] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#202328] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">User Terminal</span>
          <span className="text-[#A7ADB5]">·</span>
          <span className="text-xs text-[#A7ADB5] font-mono">Configuration</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-7 h-7 text-[#1677FF]" />
          Explorer Settings
        </h1>
        <p className="text-sm text-[#A7ADB5] mt-1">
          Customize explorer display options, streaming preferences, and telemetry filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-1">
          <button 
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === 'appearance' ? 'bg-[#1677FF]/15 text-[#1677FF] border-l-2 border-[#1677FF]' : 'text-[#A7ADB5] hover:bg-[#15171A] hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" /> Appearance & Theme
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === 'privacy' ? 'bg-[#1677FF]/15 text-[#1677FF] border-l-2 border-[#1677FF]' : 'text-[#A7ADB5] hover:bg-[#15171A] hover:text-white'}`}
          >
            <Shield className="w-4 h-4" /> Privacy & Visibility
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === 'notifications' ? 'bg-[#1677FF]/15 text-[#1677FF] border-l-2 border-[#1677FF]' : 'text-[#A7ADB5] hover:bg-[#15171A] hover:text-white'}`}
          >
            <Bell className="w-4 h-4" /> Alert Subscriptions
          </button>
        </div>

        <div className="lg:col-span-2">
          {activeTab === 'appearance' && (
            <div className="bg-[#15171A] border border-[#202328] rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-white mb-2">Display Theme</h2>
                <p className="text-xs text-[#A7ADB5] mb-4">
                  MONETASCAN uses a black-first minimal color palette designed for high contrast and data legibility.
                </p>
                <div className="p-4 rounded-lg bg-[#0E1012] border border-[#202328] flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1677FF]/20 flex items-center justify-center text-[#1677FF]">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Moneta Obsidian (Default)</div>
                    <div className="text-[11px] text-[#A7ADB5] font-mono">Palette: #050505 · #15171A · #202328 · #1677FF</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#202328]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-white">Compact Data Grids</h3>
                    <p className="text-[11px] text-[#A7ADB5]">Compress table row heights for dense financial auditing.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="rounded accent-[#1677FF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-white">Simulated Stream Telemetry</h3>
                    <p className="text-[11px] text-[#A7ADB5]">Simulate real-time mempool additions in demonstration mode.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={liveStreaming}
                    onChange={(e) => setLiveStreaming(e.target.checked)}
                    className="rounded accent-[#1677FF]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'appearance' && (
            <div className="bg-[#15171A] border border-[#202328] rounded-xl p-8 text-center text-xs text-[#A7ADB5]">
              Configuration settings for {activeTab} are active according to your session role permissions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
