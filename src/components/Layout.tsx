import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  ArrowRightLeft, 
  Wallet, 
  ShieldCheck, 
  Vote, 
  Activity, 
  Settings, 
  Bell, 
  User, 
  Menu,
  X,
  BarChart2,
  Users,
  FileText,
  Globe,
  Home,
  BookOpen,
  Search,
  Coins,
  Code
} from 'lucide-react';
import { cn } from '../utils';
import { useRole, Role } from '../context/RoleContext';
import { GlobalSearch } from './GlobalSearch';
import { NetworkBadge } from './NetworkBadge';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  // Listen for Cmd+K or Ctrl+K or / to open global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Overview', path: '/explorer', icon: Activity },
    { name: 'Blocks', path: '/blocks', icon: Box },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Tokens', path: '/tokens', icon: Coins },
    { name: 'Addresses', path: '/addresses', icon: Wallet },
    { name: 'Validators', path: '/validators', icon: ShieldCheck },
    { name: 'Network Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Developer Spec', path: '/developers', icon: Code },
    { name: 'Service', path: '/service', icon: BookOpen },
    { name: 'Ecosystem', path: '/ecosystem', icon: Globe },
    ...(role !== 'public' ? [{ name: 'My Dashboard', path: '/my-dashboard', icon: User }] : []),
    ...(role !== 'public' ? [{ name: 'Consortium', path: '/consortium', icon: Users }] : []),
    ...(['auditor', 'admin'].includes(role) ? [{ name: 'Audit Logs', path: '/audit-logs', icon: FileText }] : []),
    { name: 'Governance', path: '/governance', icon: Vote },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-[#FFFFFF] overflow-hidden font-sans">
      {/* Global Search Modal */}
      <GlobalSearch 
        isModal={true} 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0A0C0E] border-r border-[#202328] relative z-20 shrink-0">
        {/* Brand Lockup */}
        <div className="flex flex-col justify-center px-6 h-20 border-b border-[#202328]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#1677FF] flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">MONETASCAN</span>
              <span className="text-[10px] text-[#A7ADB5] font-mono tracking-wider uppercase block mt-1">MONETA CHAIN EXPLORER</span>
            </div>
          </Link>
        </div>
        
        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-xs font-medium",
                isActive 
                  ? "bg-[#1677FF]/15 text-[#1677FF] font-semibold border-l-2 border-[#1677FF]" 
                  : "text-[#A7ADB5] hover:bg-[#15171A] hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer with Network Status */}
        <div className="p-4 border-t border-[#202328] bg-[#070809]">
          <div className="p-3 rounded-lg bg-[#15171A] border border-[#202328]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#A7ADB5] font-mono uppercase tracking-wider">Network</span>
              <span className="w-2 h-2 rounded-full bg-[#E5A93C]" title="Simulated Devnet"></span>
            </div>
            <div className="text-xs font-semibold text-white">Devnet / Simulated</div>
            <div className="text-[11px] text-[#A7ADB5] font-mono mt-0.5">Block: 1,459,203</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        {/* Topbar */}
        <header className="h-16 bg-[#0A0C0E]/95 backdrop-blur-md border-b border-[#202328] flex items-center justify-between px-4 md:px-8 z-10 sticky top-0 shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button 
              className="md:hidden p-2 text-[#A7ADB5] hover:text-white rounded"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Global Search Button / Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-[#15171A] hover:bg-[#1A1D22] border border-[#202328] rounded-lg text-xs text-[#A7ADB5] transition-colors group cursor-text"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-[#A7ADB5] group-hover:text-white transition-colors shrink-0" />
                <span className="truncate">Search Tx Hash, Address, Block, or Token...</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-[#5D646E] bg-[#0E1012] px-1.5 py-0.5 rounded border border-[#202328] shrink-0">
                <span>⌘K</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-4 ml-4">
            {/* Network / RPC Connection Badge */}
            <NetworkBadge />

            {/* Role Demo Switcher */}
            <div className="hidden xl:flex items-center gap-2">
              <span className="text-[10px] text-[#A7ADB5] uppercase tracking-wider font-mono">Role:</span>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="bg-[#15171A] border border-[#202328] rounded text-white text-xs py-1 px-2 focus:outline-none focus:border-[#1677FF] font-mono"
              >
                <option value="public">Public</option>
                <option value="member">Member</option>
                <option value="validator">Validator</option>
                <option value="auditor">Auditor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Link 
              to="/notifications" 
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#15171A] border border-[#202328] hover:bg-[#1C2026] text-[#A7ADB5] hover:text-white transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
            </Link>

            {/* Wallet / Access Button */}
            <Link 
              to="/access" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold transition-colors shrink-0"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{role === 'public' ? 'Connect Wallet' : `Wallet: ${role}`}</span>
              <span className="sm:hidden">Connect</span>
            </Link>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <aside className="relative flex w-64 max-w-sm flex-1 flex-col bg-[#0A0C0E] border-r border-[#202328]">
              <div className="flex h-16 items-center justify-between px-6 border-b border-[#202328]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#1677FF] flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rotate-45"></div>
                  </div>
                  <span className="text-base font-bold text-white">MONETASCAN</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1 text-[#A7ADB5] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                      isActive 
                        ? "bg-[#1677FF]/15 text-[#1677FF] font-semibold" 
                        : "text-[#A7ADB5] hover:bg-[#15171A] hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-[#202328] bg-[#070809]">
                <div className="text-[11px] text-[#A7ADB5] font-mono mb-2">Simulated Devnet Active</div>
                <Link
                  to="/access"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-2 text-center rounded bg-[#1677FF] text-white text-xs font-semibold"
                >
                  Connect Wallet
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050505]">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>

        {/* Quiet Minimal Footer */}
        <footer className="px-6 py-4 border-t border-[#202328] bg-[#070809] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A7ADB5]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider">MONETASCAN</span>
            <span>·</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#5D646E]">Visible Truth. Invisible Wealth.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/developers" className="hover:text-white transition-colors">RPC Spec</Link>
            <Link to="/tokens" className="hover:text-white transition-colors">Tokens</Link>
            <Link to="/service" className="hover:text-white transition-colors">Service</Link>
            <Link to="/ecosystem" className="hover:text-white transition-colors">Ecosystem</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
