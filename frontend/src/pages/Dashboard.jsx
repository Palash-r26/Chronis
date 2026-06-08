import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import MetricCard from '../components/MetricCard';
import TrendChart from '../components/TrendChart';
import UserSelector from '../components/UserSelector';
import { Footprints, Moon, Smartphone, BrainCircuit } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(user?.linked_user_id || 'U1');
  const [dashboardData, setDashboardData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dashRes, timeRes] = await Promise.all([
          api.get(`/api/dashboard/${selectedUser}`),
          api.get(`/api/timeline/${selectedUser}`)
        ]);
        setDashboardData(dashRes.data);
        setTimelineData(timeRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedUser]);

  if (loading || !dashboardData) {
    return <div className="flex h-full items-center justify-center text-primary">Loading...</div>;
  }

  const { averages, recent_changes, confidence } = dashboardData;

  const getChangeFor = (metricName) => {
    return recent_changes.find(c => c.metric === metricName);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">Welcome back, {user?.name.split(' ')[0]}</h2>
          <p className="text-textSecondary mt-1">Here is the latest data for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
        </div>
        <UserSelector selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Avg Steps (7d)" 
          value={averages.steps.toLocaleString()} 
          icon={Footprints} 
          change={getChangeFor('Steps')}
          confidence={confidence.days_tracked}
        />
        <MetricCard 
          title="Avg Sleep" 
          value={averages.sleep} 
          unit="hrs"
          icon={Moon} 
          change={getChangeFor('Sleep')}
          confidence={confidence.days_tracked}
        />
        <MetricCard 
          title="Avg Screen Time" 
          value={averages.screen_time} 
          unit="hrs"
          icon={Smartphone} 
          change={getChangeFor('Screen')}
          confidence={confidence.days_tracked}
        />
        <MetricCard 
          title="Avg Deep Work" 
          value={averages.deep_work} 
          unit="hrs"
          icon={BrainCircuit} 
          change={getChangeFor('Deep Work')}
          confidence={confidence.days_tracked}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-display font-bold mb-4">30-Day Trends</h3>
          <TrendChart data={timelineData} />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold mb-4">Recent Changes</h3>
          <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-4">
            {recent_changes.length > 0 ? (
              recent_changes.map((change, idx) => (
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
    </div>
  );
};

export default Dashboard;
