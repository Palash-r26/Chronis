import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';
import api from './api/axios';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const InsightExplorer = lazy(() => import('./pages/InsightExplorer'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import('./pages/About'));
const Developer = lazy(() => import('./pages/Developer'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center w-full">
    <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      api.get(`/api/settings/${user.id}`).then(res => {
        if (res.data.dark_mode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }).catch(err => console.error(err));
    } else {
      document.documentElement.classList.add('dark'); // default
    }
  }, [user]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col md:flex-row font-body">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className={`flex-1 ${user ? 'p-6 md:p-8' : ''}`}>
            <PageWrapper>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={!user ? <Landing /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                  <Route path="/login" element={!user ? <Login /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                  <Route path="/register" element={!user ? <Register /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                  <Route path="/about" element={<About />} />
                  <Route path="/developer" element={<Developer />} />
                  
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/insights" element={<ProtectedRoute><InsightExplorer /></ProtectedRoute>} />
                  <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageWrapper>
          </main>
        </div>
    </div>
  );
}

export default App;
