import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TimelineRow from '../components/TimelineRow';
import AdminUserSelector from '../components/AdminUserSelector';

const Timeline = () => {
  const { user, globalUserView } = useAuth();
  const selectedUser = globalUserView || user?.linked_user_id || 'U1';
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await api.get(`/api/timeline/${selectedUser}`);
        setTimeline(response.data.reverse()); // Show newest first
      } catch (error) {
        console.error("Failed to fetch timeline", error);
        setError(error.response?.data?.detail || "Failed to load timeline data");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [selectedUser]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">Narrative Timeline</h2>
          <p className="text-textSecondary mt-1">Your daily behavior log, sorted by date.</p>
        </div>
        <AdminUserSelector />
      </div>

      <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col space-y-2">
        <div className="hidden md:flex items-center justify-between px-4 pb-2 text-sm font-medium text-textSecondary border-b border-white/5 mb-2">
          <div className="flex items-center space-x-6">
            <div className="w-24">Date</div>
            <div className="flex items-center space-x-4">
              <span>Behavioral Pattern:</span>
              <div className="flex items-center space-x-1.5 text-xs"><div className="w-3 h-3 rounded-full bg-primary opacity-80"></div><span>Steps</span></div>
              <div className="flex items-center space-x-1.5 text-xs"><div className="w-3 h-3 rounded-full bg-secondary opacity-80"></div><span>Sleep</span></div>
              <div className="flex items-center space-x-1.5 text-xs"><div className="w-3 h-3 rounded-full bg-warning opacity-80"></div><span>Screen</span></div>
              <div className="flex items-center space-x-1.5 text-xs"><div className="w-3 h-3 rounded-full bg-[#F2C94C] opacity-80"></div><span>Focus</span></div>
              <div className="flex items-center space-x-1.5 text-xs"><div className="w-3 h-3 rounded-full bg-[#FF9F43] opacity-80"></div><span>Exercise</span></div>
            </div>
          </div>
          <div>Day Score</div>
        </div>
        
        {loading ? (
          <div className="py-12 text-center text-primary">Loading timeline...</div>
        ) : error ? (
          <div className="py-12 text-center text-warning font-medium">{error}</div>
        ) : (
          timeline.map((day) => (
            <TimelineRow key={day.date} day={day} />
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;
