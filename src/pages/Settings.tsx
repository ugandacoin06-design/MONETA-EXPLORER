import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Shield, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState('dark');
  const [compactMode, setCompactMode] = useState(false);
  const [liveStreaming, setLiveStreaming] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <SettingsIcon className="w-6 h-6 text-blue-400" />
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your explorer preferences and notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'appearance' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" /> Appearance
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'notifications' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('language')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'language' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Globe className="w-4 h-4" /> Language & Region
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'privacy' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Shield className="w-4 h-4" /> Privacy & Security
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {activeTab === 'appearance' && (
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Theme Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setTheme('dark')}
                  className={`border-2 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-colors ${theme === 'dark' ? 'border-blue-500 bg-slate-900' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}
                >
                  <Moon className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-300'}`}>Dark</span>
                </div>
                <div 
                  onClick={() => setTheme('light')}
                  className={`border-2 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-colors ${theme === 'light' ? 'border-blue-500 bg-slate-900' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}
                >
                  <Sun className={`w-8 h-8 ${theme === 'light' ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-white' : 'text-slate-300'}`}>Light</span>
                </div>
                <div 
                  onClick={() => setTheme('system')}
                  className={`border-2 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-colors ${theme === 'system' ? 'border-blue-500 bg-slate-900' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}
                >
                  <Monitor className={`w-8 h-8 ${theme === 'system' ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${theme === 'system' ? 'text-white' : 'text-slate-300'}`}>System Match</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-white font-medium">Compact Layout</h3>
                    <p className="text-sm text-slate-500">Decrease spacing for data-dense screens.</p>
                  </div>
                  <div 
                    onClick={() => setCompactMode(!compactMode)}
                    className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${compactMode ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${compactMode ? 'bg-white right-1' : 'bg-slate-400 left-1'}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-white font-medium">Live Data Streaming</h3>
                    <p className="text-sm text-slate-500">Automatically update metrics without refreshing.</p>
                  </div>
                  <div 
                    onClick={() => setLiveStreaming(!liveStreaming)}
                    className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${liveStreaming ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${liveStreaming ? 'bg-white right-1' : 'bg-slate-400 left-1'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab !== 'appearance' && (
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
              <p className="text-slate-500">This settings module is still in development.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
