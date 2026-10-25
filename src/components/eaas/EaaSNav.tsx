import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Layers, 
  Plus, 
  BarChart2, 
  CreditCard, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  User, 
  LogOut, 
  ChevronDown, 
  Activity,
  Globe,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { UserRole } from '../../types/eaas';

export function EaaSNav() {
  const { 
    user, 
    projects, 
    currentProject, 
    setCurrentProjectId, 
    logout, 
    switchRole 
  } = useEaaS();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchRole(e.target.value as UserRole);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/eaas/dashboard', icon: Activity },
    { name: 'Projects', path: '/eaas/projects', icon: Layers },
    { name: 'Billing', path: '/eaas/billing', icon: CreditCard },
    { name: 'Audit Logs', path: '/eaas/audit-logs', icon: FileText },
    { name: 'Guides & Docs', path: '/eaas/docs', icon: BookOpen },
  ];

  return (
    <div className="border-b border-[#202328] bg-[#0A0C0E]">
      {/* Top Bar Banner for Customer Identity */}
      <div className="px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-[#202328]/60">
        <div className="flex items-center gap-3">
          <Link to="/eaas" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1677FF] flex items-center justify-center text-white">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">MONETASCAN</span>
            <span className="text-[10px] text-[#1677FF] px-1.5 py-0.5 rounded bg-[#1677FF]/15 font-mono font-semibold uppercase">
              EaaS Customer Platform
            </span>
          </Link>

          {/* Quick link back to Main Explorer */}
          <span className="text-[#202328]">|</span>
          <Link 
            to="/explorer" 
            className="text-xs text-[#A7ADB5] hover:text-white transition-colors flex items-center gap-1 font-mono"
          >
            <span>&larr; Public Explorer</span>
          </Link>
        </div>

        {/* User Session & Project Quick Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Active Project Dropdown */}
          {projects.length > 0 && (
            <div className="flex items-center gap-2 bg-[#15171A] border border-[#202328] px-2.5 py-1 rounded-lg text-xs">
              <span className="text-[#A7ADB5] font-mono text-[11px]">Project:</span>
              <select
                value={currentProject?.id || ''}
                onChange={(e) => {
                  const id = e.target.value;
                  setCurrentProjectId(id);
                  if (location.pathname.startsWith('/eaas/projects/')) {
                    navigate(`/eaas/projects/${id}`);
                  }
                }}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#15171A] text-white">
                    {p.name} ({p.mode})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Create Explorer Button */}
          <Link
            to="/eaas/projects/new"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Explorer</span>
          </Link>

          {/* Role Tester Dropdown (for checking RBAC security gates) */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#15171A] border border-[#202328] text-xs">
            <span className="text-[#A7ADB5] text-[10px] uppercase font-mono">Role:</span>
            <select
              value={user?.role || 'owner'}
              onChange={handleRoleChange}
              title="Test different customer role privileges"
              className="bg-transparent text-[#10B981] font-mono font-semibold text-xs focus:outline-none cursor-pointer uppercase"
            >
              <option value="owner" className="bg-[#15171A] text-white">Owner</option>
              <option value="admin" className="bg-[#15171A] text-white">Admin</option>
              <option value="developer" className="bg-[#15171A] text-white">Developer</option>
              <option value="viewer" className="bg-[#15171A] text-white">Viewer (Read-Only)</option>
            </select>
          </div>

          {/* User Profile / Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#202328]">
            <div className="w-6 h-6 rounded-full bg-[#202328] flex items-center justify-center text-xs font-bold text-white">
              {user ? user.name[0] : 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-medium text-white block leading-tight">{user?.name}</span>
              <span className="text-[10px] text-[#A7ADB5] font-mono block leading-tight">{user?.organization}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/eaas/login');
              }}
              title="Sign Out of Customer Session"
              className="p-1 text-[#A7ADB5] hover:text-[#FF8595] transition-colors ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="px-4 md:px-8 flex items-center gap-1 overflow-x-auto text-xs py-1">
        {navLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium whitespace-nowrap
              ${isActive 
                ? 'bg-[#15171A] text-white border-b-2 border-[#1677FF]' 
                : 'text-[#A7ADB5] hover:text-white hover:bg-[#15171A]/50'}
            `}
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.name}</span>
          </NavLink>
        ))}

        {currentProject && (
          <NavLink
            to={`/eaas/projects/${currentProject.id}`}
            className={({ isActive }) => `
              flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium whitespace-nowrap ml-auto
              ${isActive 
                ? 'bg-[#1677FF]/15 text-[#1677FF] border-b-2 border-[#1677FF]' 
                : 'text-[#A7ADB5] hover:text-white hover:bg-[#15171A]/50'}
            `}
          >
            <Sliders className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>Manage "{currentProject.name}" &rarr;</span>
          </NavLink>
        )}
      </div>
    </div>
  );
}
