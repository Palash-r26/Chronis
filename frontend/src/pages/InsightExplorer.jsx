import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import InsightCard from '../components/InsightCard';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminUserSelector from '../components/AdminUserSelector';

const InsightExplorer = () => {
  const { user, globalUserView } = useAuth();
  const selectedUser = globalUserView || user?.linked_user_id || 'U1';
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await api.get(`/api/insights/${selectedUser}`);
        setInsights(response.data.insights || []);
      } catch (error) {
        console.error("Failed to fetch insights", error);
        setError(error.response?.data?.detail || "Failed to load insights");
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [selectedUser]);

  const categories = ['All', ...new Set(insights.map(i => i.category))];
  const filteredInsights = filter === 'All' ? insights : insights.filter(i => i.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">AI Insights</h2>
          <p className="text-textSecondary mt-1">AI-generated correlations and actionable advice.</p>
        </div>
        <AdminUserSelector />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-105 border border-primary/50' 
                : 'glass-panel text-textSecondary hover:bg-white/10 hover:text-textPrimary border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12 text-primary">Loading insights...</div>
      ) : error ? (
        <div className="glass-panel p-8 rounded-2xl text-center text-warning">
          <p className="text-xl font-medium">{error}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightExplorer;
