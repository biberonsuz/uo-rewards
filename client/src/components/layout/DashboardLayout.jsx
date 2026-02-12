import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/layout.module.css';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <Header variant="dashboard" />
      <main className={styles.dashboard}>
        <Sidebar />
        <div className={styles.dashboardContent}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
