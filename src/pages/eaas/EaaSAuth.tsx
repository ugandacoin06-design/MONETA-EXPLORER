import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Key
} from 'lucide-react';
import { useEaaS } from '../../context/EaaSContext';
import { UserRole } from '../../types/eaas';

export function EaaSAuth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('enterprise-lead@moneta-consortium.org');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [organization, setOrganization] = useState('Apex Consortium Financial');
  const [mfaCode, setMfaCode] = useState('849201');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, user } = useEaaS();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please provide a valid enterprise or institutional email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, selectedRole);
      navigate('/eaas/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickRole = (role: UserRole, sampleEmail: string) => {
    setEmail(sampleEmail);
    setSelectedRole(role);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#1677FF] flex items-center justify-center mx-auto text-white shadow-lg">
          <Layers className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {isRegister ? 'Register Customer Account' : 'Sign In to EaaS Console'}
        </h1>
        <p className="text-xs text-[#A7ADB5]">
          Manage and configure your hosted MONETASCAN explorers
        </p>
      </div>

      {/* Main Form Box */}
      <div className="p-6 md:p-8 rounded-xl bg-[#15171A] border border-[#202328] space-y-6">
        {error && (
          <div className="p-3 rounded bg-[#2B1115] border border-[#4E1C24] text-[#FF8595] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-[#A7ADB5] mb-1 font-medium">Organization / Consortium Entity</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Apex Financial, Global Node Labs"
                className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[#A7ADB5] mb-1 font-medium">Work / Enterprise Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A7ADB5] mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white focus:outline-none focus:border-[#1677FF]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A7ADB5] mb-1 font-medium">Customer Role Access</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono focus:outline-none focus:border-[#1677FF]"
            >
              <option value="owner">Owner (Full administrative & billing control)</option>
              <option value="admin">Admin (Configuration, API keys, team management)</option>
              <option value="developer">Developer (API keys, RPC testing, metrics)</option>
              <option value="viewer">Viewer (Read-only project dashboard)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-[#A7ADB5] mb-1">
              <span className="font-medium">MFA Security Code (Time-based OTP)</span>
              <span className="text-[#10B981] text-[10px] flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" /> Enabled
              </span>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D646E]" />
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                maxLength={6}
                className="w-full pl-9 pr-3 py-2 bg-[#0E1012] border border-[#202328] rounded-lg text-white font-mono tracking-widest focus:outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#1677FF] hover:bg-[#1366DB] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            <span>{isRegister ? 'Complete Registration' : 'Authenticate & Enter Console'}</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#1677FF] hover:underline"
          >
            {isRegister ? 'Already have an EaaS account? Sign in' : 'Need an explorer for your consortium? Register here'}
          </button>
        </div>
      </div>

      {/* Quick Test Role Presets */}
      <div className="p-4 rounded-xl bg-[#0E1012] border border-[#202328] space-y-2 text-xs">
        <span className="text-[#A7ADB5] font-semibold block font-mono text-[11px] uppercase">
          Quick-Switch Demo Profiles:
        </span>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => handleQuickRole('owner', 'marcus.vance@apex-consortium.org')}
            className="p-2 rounded bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-left text-white transition-colors"
          >
            <span className="text-[#10B981] font-bold block">Owner</span>
            <span className="text-[#A7ADB5] text-[10px] truncate block">Full Privileges</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickRole('viewer', 'david.ross@compliance-auditors.org')}
            className="p-2 rounded bg-[#15171A] hover:bg-[#202328] border border-[#202328] text-left text-white transition-colors"
          >
            <span className="text-[#E5A93C] font-bold block">Viewer</span>
            <span className="text-[#A7ADB5] text-[10px] truncate block">Read-Only Guard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
