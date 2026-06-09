import { useState, useEffect } from 'react';
import { Users, Shield, Activity, Search, Edit2, Trash2, BarChart2, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [statsUser, setStatsUser] = useState(null);
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async (userId) => {
    try {
      const response = await api.get(`/api/admin/users/${userId}/stats`);
      setStatsData(response.data);
    } catch (err) {
      toast.error('Failed to fetch user stats');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/users/${editingUser.id}`, {
        name: editingUser.name,
        role: editingUser.role
      });
      toast.success('User updated successfully');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/admin/users/${deletingUser.id}`);
      toast.success('User deleted successfully');
      setDeletingUser(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold">Admin Portal</h2>
          <p className="text-textSecondary mt-1">Manage system configurations, users, and monitor health.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 w-fit">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-textPrimary'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-textPrimary'}`}
          >
            <Users size={16} /> User Management
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div 
              onClick={() => setActiveTab('users')}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-primary/50 transition-colors group"
            >
              <div className="p-4 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform"><Users size={32} /></div>
              <h3 className="text-xl font-bold font-display">User Management</h3>
              <p className="text-textSecondary text-sm text-center">Manage roles, suspend accounts, and view user metrics.</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-secondary/10 text-secondary rounded-full"><Activity size={32} /></div>
              <h3 className="text-xl font-bold font-display">System Health</h3>
              <p className="text-textSecondary text-sm text-center">Monitor API usage, database load, and server latency.</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-[#FF9F43]/10 text-[#FF9F43] rounded-full"><Shield size={32} /></div>
              <h3 className="text-xl font-bold font-display">Security Settings</h3>
              <p className="text-textSecondary text-sm text-center">Configure authentication rules and access policies.</p>
            </div>
          </motion.div>
        )}


        {/* ─── USERS TAB ─── */}
        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel rounded-3xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-xl font-bold font-display">All Users Directory</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="bg-background border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 text-textPrimary w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-textSecondary text-xs uppercase tracking-wider bg-black/10">
                    <th className="p-4 pl-6 font-bold">ID</th>
                    <th className="p-4 font-bold">User</th>
                    <th className="p-4 font-bold">Role</th>
                    <th className="p-4 font-bold">Joined</th>
                    <th className="p-4 pr-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-textSecondary">Loading users...</td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-textSecondary">No users found.</td>
                    </tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-4 pl-6 text-sm font-mono text-textSecondary">#{u.id}</td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold">{u.name}</span>
                            <span className="text-xs text-textSecondary">{u.email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            u.role === 'admin' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-textSecondary">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 pr-6 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setStatsUser(u); fetchUserStats(u.id); }}
                            className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                            title="View Stats"
                          >
                            <BarChart2 size={16} />
                          </button>
                          <button 
                            onClick={() => setEditingUser(u)}
                            className="p-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => setDeletingUser(u)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODALS ─── */}

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button onClick={() => setEditingUser(null)} className="absolute right-4 top-4 text-textSecondary hover:text-textPrimary">
                <X size={20} />
              </button>
              <h3 className="text-xl font-display font-bold mb-6">Edit Profile: {editingUser.email}</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Role</label>
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-3 mt-4 transition-colors">
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-red-500/20 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Delete User?</h3>
              <p className="text-sm text-textSecondary mb-6">
                Are you sure you want to permanently delete <strong>{deletingUser.email}</strong>? This will cascade and destroy all their logged behavioral data and settings. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingUser(null)} className="flex-1 bg-background border border-white/10 hover:bg-white/5 rounded-xl py-3 text-sm font-bold transition-colors">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 text-sm font-bold transition-colors">
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Stats Modal */}
      <AnimatePresence>
        {statsUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button onClick={() => { setStatsUser(null); setStatsData(null); }} className="absolute right-4 top-4 text-textSecondary hover:text-textPrimary">
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {statsUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold leading-tight">{statsUser.name}'s Stats</h3>
                  <p className="text-sm text-textSecondary">{statsUser.email}</p>
                </div>
              </div>
              
              {!statsData ? (
                <div className="py-8 text-center text-textSecondary animate-pulse">Loading analytics...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-white/5 p-4 rounded-2xl text-center">
                    <div className="text-2xl font-black text-primary mb-1">{statsData.total_records}</div>
                    <div className="text-xs text-textSecondary font-bold uppercase tracking-wider">Days Logged</div>
                  </div>
                  <div className="bg-background border border-white/5 p-4 rounded-2xl text-center">
                    <div className="text-2xl font-black text-secondary mb-1">{statsData.avg_sleep}h</div>
                    <div className="text-xs text-textSecondary font-bold uppercase tracking-wider">Avg Sleep</div>
                  </div>
                  <div className="bg-background border border-white/5 p-4 rounded-2xl text-center">
                    <div className="text-2xl font-black text-[#FF9F43] mb-1">{statsData.avg_screen_time}h</div>
                    <div className="text-xs text-textSecondary font-bold uppercase tracking-wider">Avg Screen Time</div>
                  </div>
                  <div className="bg-background border border-white/5 p-4 rounded-2xl text-center">
                    <div className="text-2xl font-black text-emerald-500 mb-1">
                      {(statsData.total_steps / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-textSecondary font-bold uppercase tracking-wider">Total Steps</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
