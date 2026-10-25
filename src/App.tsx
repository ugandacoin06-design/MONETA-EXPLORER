import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Blocks } from './pages/Blocks';
import { BlockDetail } from './pages/BlockDetail';
import { Transactions } from './pages/Transactions';
import { TransactionDetail } from './pages/TransactionDetail';
import { Tokens } from './pages/Tokens';
import { Developers } from './pages/Developers';
import { Validators } from './pages/Validators';
import { NetworkOverview } from './pages/NetworkOverview';
import { Governance } from './pages/Governance';
import { Addresses } from './pages/Addresses';
import { AddressDetail } from './pages/AddressDetail';
import { Settings } from './pages/Settings';
import { SearchResults } from './pages/SearchResults';
import { AccessRole } from './pages/AccessRole';
import { Analytics } from './pages/Analytics';
import { Notifications } from './pages/Notifications';
import { RoleProvider } from './context/RoleContext';
import { EaaSProvider } from './context/EaaSContext';
import { PrivateDashboard } from './pages/PrivateDashboard';
import { Consortium } from './pages/Consortium';
import { AuditLogs } from './pages/AuditLogs';
import { Ecosystem } from './pages/Ecosystem';
import { Service } from './pages/Service';

// EaaS Customer Platform Pages
import { EaaSLanding } from './pages/eaas/EaaSLanding';
import { EaaSAuth } from './pages/eaas/EaaSAuth';
import { EaaSDashboard } from './pages/eaas/EaaSDashboard';
import { ProjectsDirectory } from './pages/eaas/ProjectsDirectory';
import { CreateProjectWizard } from './pages/eaas/CreateProjectWizard';
import { ProjectDetail } from './pages/eaas/ProjectDetail';
import { EaaSBilling } from './pages/eaas/EaaSBilling';
import { EaaSDocs } from './pages/eaas/EaaSDocs';
import { EaaSAccessDenied } from './pages/eaas/EaaSAccessDenied';
import { EaaSSessionExpired } from './pages/eaas/EaaSSessionExpired';
import { EaaSServiceUnavailable } from './pages/eaas/EaaSServiceUnavailable';

export default function App() {
  return (
    <RoleProvider>
      <EaaSProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explorer" element={<Dashboard />} />
            <Route path="service" element={<Service />} />
            <Route path="ecosystem" element={<Ecosystem />} />
            <Route path="my-dashboard" element={<PrivateDashboard />} />
            <Route path="consortium" element={<Consortium />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="blocks" element={<Blocks />} />
            <Route path="blocks/:id" element={<BlockDetail />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/:hash" element={<TransactionDetail />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="tokens/:symbol" element={<Tokens />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="addresses/:address" element={<AddressDetail />} />
            <Route path="validators" element={<Validators />} />
            <Route path="governance" element={<Governance />} />
            <Route path="network" element={<NetworkOverview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="developers" element={<Developers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="access" element={<AccessRole />} />
            <Route path="notifications" element={<Notifications />} />

            {/* EaaS Customer Platform Routes */}
            <Route path="eaas" element={<EaaSLanding />} />
            <Route path="eaas/login" element={<EaaSAuth />} />
            <Route path="eaas/register" element={<EaaSAuth />} />
            <Route path="eaas/dashboard" element={<EaaSDashboard />} />
            <Route path="eaas/projects" element={<ProjectsDirectory />} />
            <Route path="eaas/projects/new" element={<CreateProjectWizard />} />
            <Route path="eaas/projects/:projectId" element={<ProjectDetail />} />
            <Route path="eaas/billing" element={<EaaSBilling />} />
            <Route path="eaas/docs" element={<EaaSDocs />} />
            <Route path="eaas/api-docs" element={<EaaSDocs />} />
            <Route path="eaas/audit-logs" element={<ProjectDetail />} />
            <Route path="eaas/access-denied" element={<EaaSAccessDenied />} />
            <Route path="eaas/session-expired" element={<EaaSSessionExpired />} />
            <Route path="eaas/service-unavailable" element={<EaaSServiceUnavailable />} />
          </Route>
        </Routes>
      </EaaSProvider>
    </RoleProvider>
  );
}
