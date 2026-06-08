import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TimelineRow from '../components/TimelineRow';
import UserSelector from '../components/UserSelector';

const Timeline = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(user?.linked_user_id || 'U1');
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/timeline/${selectedUser}`);
        setTimeline(response.data.reverse()); // Show newest first
      } catch (error) {
        console.error("Failed to fetch timeline", error);
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
        <UserSelector selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      </div>

      <div className="bg-card border border-white/5 p-4 md:p-6 rounded-2xl flex flex-col space-y-2">
        <div className="hidden md:flex items-center justify-between px-4 pb-2 text-sm font-medium text-textSecondary border-b border-white/5 mb-2">
          <div className="flex items-center space-x-6">
            <div className="w-24">Date</div>
            <div>Behavioral Pattern</div>
          </div>
          <div>Day Score</div>
        </div>
        
        {loading ? (
          <div className="py-12 text-center text-primary">Loading timeline...</div>
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
