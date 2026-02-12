import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MixpanelProvider from './components/analytics/MixpanelProvider';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AddressesPage from './pages/AddressesPage';

function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: 48, textAlign: 'center', opacity: 0.5 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, textTransform: 'uppercase' }}>{title}</h2>
      <p style={{ marginTop: 16 }}>Coming soon</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MixpanelProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/addresses" element={<AddressesPage />} />
              <Route path="/payments" element={<PlaceholderPage title="Payments" />} />
              <Route path="/orders" element={<PlaceholderPage title="Order History" />} />
              <Route path="/wishlist" element={<PlaceholderPage title="Wish List" />} />
              <Route path="/favourites" element={<PlaceholderPage title="Favourites" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MixpanelProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
