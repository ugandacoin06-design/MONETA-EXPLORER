import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  Hexagon, 
  Search, 
  LayoutDashboard, 
  Box, 
  ArrowRightLeft, 
  Wallet, 
  ShieldCheck, 
  Vote, 
  Activity, 
  Settings, 
  Bell, 
  ChevronDown, 
  User, 
  Menu,
  X,
  BarChart2,
  Users,
  FileText,
  Globe,
  Home,
  BookOpen
} from 'lucide-react';
import { cn } from '../utils';
import { useRole, Role } from '../context/RoleContext';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Service', path: '/service', icon: BookOpen },
    { name: 'Explorer', path: '/explorer', icon: LayoutDashboard },
    { name: 'Ecosystem', path: '/ecosystem', icon: Globe },
    ...(role !== 'public' ? [{ name: 'My Dashboard', path: '/my-dashboard', icon: User }] : []),
    ...(role !== 'public' ? [{ name: 'Consortium', path: '/consortium', icon: Users }] : []),
    ...(['auditor', 'admin'].includes(role) ? [{ name: 'Audit Logs', path: '/audit-logs', icon: FileText }] : []),
    { name: 'Blocks', path: '/blocks', icon: Box },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Addresses', path: '/addresses', icon: Wallet },
    { name: 'Validators', path: '/validators', icon: ShieldCheck },
    { name: 'Governance', path: '/governance', icon: Vote },
    { name: 'Network Overview', path: '/network', icon: Activity },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#020617]/80 backdrop-blur-xl border-r border-slate-800 relative z-20">
        <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MONETA</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                isActive 
                  ? "bg-blue-600/10 text-blue-400" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Network Status</span>
             </div>
             <p className="text-sm font-semibold text-white">Mainnet Active</p>
             <p className="text-xs text-slate-500 mt-1">Block: 1,459,203</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-[#020617]/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-96 pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all sm:text-sm"
                placeholder="Search by Tx Hash / Address / Block..."
              />
            </form>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Role Demo Switcher */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Demo Role:</span>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="bg-slate-900 border border-slate-700 rounded-md text-slate-300 text-sm py-1 px-2 focus:outline-none focus:border-blue-500"
              >
                <option value="public">Public</option>
                <option value="member">Member</option>
                <option value="validator">Validator</option>
                <option value="auditor">Auditor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Link to="/notifications" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"></span>
            </Link>

            {/* Access Role Badge */}
            <Link to="/access" className="flex items-center gap-2 pl-4 border-l border-slate-800 hover:opacity-80 transition-opacity">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${role === 'public' ? 'bg-slate-800 border-slate-700' : 'bg-blue-600/20 border-blue-500/30'}`}>
                <User className={`w-4 h-4 ${role === 'public' ? 'text-slate-400' : 'text-blue-400'}`} />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white capitalize">{role}</p>
                <p className="text-xs text-blue-400">{role === 'public' ? 'Not Logged In' : 'Logged In'}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <aside className="relative flex w-64 max-w-sm flex-1 flex-col bg-[#020617] border-r border-slate-800 transform transition-transform duration-300">
              <div className="flex h-20 items-center justify-between px-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rotate-45"></div>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">MONETA</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="px-4 py-4 md:hidden">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    placeholder="Search block/tx/address..."
                  />
                </form>
              </div>

              <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium",
                      isActive 
                        ? "bg-blue-600/10 text-blue-400" 
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                     <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Network Status</span>
                   </div>
                   <p className="text-sm font-semibold text-white">Mainnet Active</p>
                   <p className="text-xs text-slate-500 mt-1">Block: 1,459,203</p>
                </div>
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#020617]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
