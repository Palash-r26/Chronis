import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import MetricCard from '../components/MetricCard';
import TrendChart from '../components/TrendChart';
import { Footprints, Moon, Smartphone, BrainCircuit } from 'lucide-react';
import AdminUserSelector from '../components/AdminUserSelector';

const Dashboard = () => {
  const { user, globalUserView } = useAuth();
  const selectedUser = globalUserView || user?.linked_user_id || 'U1';
  const [dashboardData, setDashboardData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        const [dashRes, timeRes] = await Promise.all([
          api.get(`/api/dashboard/${selectedUser}`),
          api.get(`/api/timeline/${selectedUser}`)
        ]);
        setDashboardData(dashRes.data);
        setTimelineData(timeRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setError(error.response?.data?.detail || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedUser]);

  if (loading && !dashboardData) {
    return <div className="flex h-full items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-display font-bold">Welcome back, {user?.name?.split(' ')[0]}</h2>
          <p className="text-textSecondary mt-1">Here is the latest data for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
        </div>
        <AdminUserSelector />
      </div>

      {error ? (
        <div className="glass-panel p-8 rounded-2xl text-center text-warning">
          <p className="text-xl font-medium">{error}</p>
        </div>
      ) : dashboardData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Avg Steps (7d)" 
              value={dashboardData.averages.steps.toLocaleString()} 
              icon={Footprints} 
              change={dashboardData.recent_changes.find(c => c.metric === 'Steps')}
              confidence={dashboardData.confidence.days_tracked}
            />
            <MetricCard 
              title="Avg Sleep" 
              value={dashboardData.averages.sleep} 
              unit="hrs"
              icon={Moon} 
              change={dashboardData.recent_changes.find(c => c.metric === 'Sleep')}
              confidence={dashboardData.confidence.days_tracked}
            />
            <MetricCard 
              title="Avg Screen Time" 
              value={dashboardData.averages.screen_time} 
              unit="hrs"
              icon={Smartphone} 
              change={dashboardData.recent_changes.find(c => c.metric === 'Screen')}
              confidence={dashboardData.confidence.days_tracked}
            />
            <MetricCard 
              title="Avg Deep Work" 
              value={dashboardData.averages.deep_work} 
              unit="hrs"
              icon={BrainCircuit} 
              change={dashboardData.recent_changes.find(c => c.metric === 'Deep Work')}
              confidence={dashboardData.confidence.days_tracked}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-display font-bold mb-4">30-Day Trends</h3>
              <TrendChart data={timelineData} />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Recent Changes</h3>
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                {dashboardData.recent_changes.length > 0 ? (
                  dashboardData.recent_changes.map((change, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-surface rounded-xl">
                      <div className={`w-2 h-2 rounded-full ${change.direction === 'improved' ? 'bg-secondary' : 'bg-warning'}`} />
                      <div>
                        <p className="text-sm font-medium">Your {change.metric.toLowerCase()} {change.direction} by {change.change_pct}% this week.</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-textSecondary text-sm">Not enough historical data to detect recent changes.</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
