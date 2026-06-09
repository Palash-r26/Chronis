import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, UserSquare2 } from 'lucide-react';
import api from '../api/axios';

const AdminUserSelector = () => {
  const { user, globalUserView, setGlobalUserView } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchUsers = async () => {
        try {
          const res = await api.get('/api/admin/users');
          setUsers(res.data);
          
          // Set initial global view if not set
          if (!globalUserView && res.data.length > 0) {
            setGlobalUserView(res.data[0].linked_user_id || 'U1');
          }
        } catch (error) {
          console.error("Failed to fetch users for admin dropdown", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== 'admin') return null;

  return (
    <div className="flex items-center gap-2 bg-surface border border-white/5 pl-3 pr-2 py-1.5 rounded-xl shadow-sm relative group">
      <UserSquare2 size={16} className="text-primary" />
      <span className="text-xs font-bold text-textSecondary hidden sm:block">Viewing:</span>
      <select 
        className="bg-transparent text-sm font-bold focus:outline-none appearance-none cursor-pointer text-textPrimary pl-1 pr-6"
        value={globalUserView || ''}
        onChange={(e) => setGlobalUserView(e.target.value)}
        disabled={loading}
      >
        {loading ? <option>Loading...</option> : (
          users.map(u => (
            <option key={u.id} value={u.linked_user_id || 'U1'} className="bg-surface text-textPrimary">
              {u.name} (ID: {u.linked_user_id || 'U1'})
            </option>
          ))
        )}
      </select>
      <ChevronDown size={14} className="absolute right-3 text-textSecondary pointer-events-none" />
    </div>
  );
};

export default AdminUserSelector;
