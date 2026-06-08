import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import InsightCard from '../components/InsightCard';
import UserSelector from '../components/UserSelector';

const InsightExplorer = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(user?.linked_user_id || 'U1');
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Sleep', 'Productivity', 'Activity', 'Screen'];

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/insights/${selectedUser}`);
        setInsights(response.data);
      } catch (error) {
        console.error("Failed to fetch insights", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [selectedUser]);

  const filteredInsights = filter === 'All' 
    ? insights 
    : insights.filter(i => i.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">What your data says</h2>
          <p className="text-textSecondary mt-1">Auto-generated behavioral correlations and patterns.</p>
        </div>
        <UserSelector selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat 
                ? 'bg-primary text-white' 
                : 'bg-surface text-textSecondary hover:bg-white/10 hover:text-textPrimary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12 text-primary">Loading insights...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map(insight => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightExplorer;
