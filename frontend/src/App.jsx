import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InsightExplorer from './pages/InsightExplorer';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import PageWrapper from './components/PageWrapper';
import api from './api/axios';
import { useEffect } from 'react';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>;
  }

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

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col font-body">
      {user && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <main className={`flex-1 overflow-y-auto ${user ? 'p-6' : ''}`}>
            <PageWrapper>
              <Routes>
                <Route path="/" element={!user ? <Landing /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                <Route path="/login" element={!user ? <Login /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                <Route path="/register" element={!user ? <Register /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
                <Route path="/about" element={<About />} />
                
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/insights" element={<ProtectedRoute><InsightExplorer /></ProtectedRoute>} />
                <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageWrapper>
          </main>
          {!user && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default App;
