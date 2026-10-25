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
import { PrivateDashboard } from './pages/PrivateDashboard';
import { Consortium } from './pages/Consortium';
import { AuditLogs } from './pages/AuditLogs';
import { Ecosystem } from './pages/Ecosystem';
import { Service } from './pages/Service';

export default function App() {
  return (
    <RoleProvider>
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
        </Route>
      </Routes>
    </RoleProvider>
  );
}
