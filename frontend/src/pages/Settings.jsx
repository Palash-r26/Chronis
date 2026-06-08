import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Moon, Bell, Database, Ruler, Trash2 } from 'lucide-react';

const Settings = () => {
  const { user, setUser } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/api/settings/${user.id}`);
        setSettings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [user.id]);

  const updateSetting = async (key, value) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }));
      await api.put(`/api/settings/${user.id}`, { [key]: value });
      setMessage('Settings updated successfully');
      setTimeout(() => setMessage(''), 3000);
      
      // If default_data_user is updated, we also update the user context since linked_user_id changes
      if (key === 'default_data_user') {
        const userRes = await api.get('/api/users/me');
        setUser(userRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary' : 'bg-surface border border-white/20'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'transform translate-x-6' : ''}`} />
    </button>
  );

  if (loading) return <div className="flex justify-center p-12 text-primary">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-display font-bold">Account Settings</h2>

      {message && (
        <div className="bg-secondary/10 border border-secondary/20 text-secondary px-4 py-3 rounded-lg text-sm transition-all">
          {message}
        </div>
      )}

      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        
        {/* Appearance */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-surface rounded-xl text-primary"><Moon size={24} /></div>
            <div>
              <h3 className="text-lg font-bold font-display">Dark Mode</h3>
              <p className="text-textSecondary text-sm">Toggle dark mode appearance (currently locked to dark theme).</p>
            </div>
          </div>
          <Toggle enabled={settings?.dark_mode} onChange={(val) => updateSetting('dark_mode', val)} />
        </div>

        {/* Notifications */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-surface rounded-xl text-secondary"><Bell size={24} /></div>
            <div>
              <h3 className="text-lg font-bold font-display">Email Notifications</h3>
              <p className="text-textSecondary text-sm">Receive weekly insights summaries via email.</p>
            </div>
          </div>
          <Toggle enabled={settings?.notifications_enabled} onChange={(val) => updateSetting('notifications_enabled', val)} />
        </div>

        {/* Units */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-surface rounded-xl text-[#F2C94C]"><Ruler size={24} /></div>
            <div>
              <h3 className="text-lg font-bold font-display">Steps Format</h3>
              <p className="text-textSecondary text-sm">Display steps in thousands (e.g. 10.5K instead of 10,500).</p>
            </div>
          </div>
          <Toggle enabled={settings?.steps_in_k} onChange={(val) => updateSetting('steps_in_k', val)} />
        </div>

        {/* Data Source */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-surface rounded-xl text-[#FF9F43]"><Database size={24} /></div>
            <div>
              <h3 className="text-lg font-bold font-display">Default Data Profile</h3>
              <p className="text-textSecondary text-sm">Which user profile's data to display by default.</p>
            </div>
          </div>
          <select 
            value={settings?.default_data_user}
            onChange={(e) => updateSetting('default_data_user', e.target.value)}
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-textPrimary focus:outline-none focus:border-primary"
          >
            {['U1', 'U2', 'U3', 'U4', 'U5'].map(u => (
              <option key={u} value={u}>User Profile {u}</option>
            ))}
          </select>
        </div>

        {/* Danger Zone */}
        <div className="p-6 md:p-8">
          <h3 className="text-warning font-bold uppercase tracking-wider text-sm flex items-center mb-4">
            <Trash2 size={16} className="mr-2" /> Danger Zone
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center bg-warning/5 border border-warning/20 rounded-xl p-4 md:p-6">
            <div className="mb-4 md:mb-0">
              <h4 className="text-textPrimary font-bold">Delete Account</h4>
              <p className="text-textSecondary text-sm">Permanently delete your account and all associated data.</p>
            </div>
            <button className="bg-warning hover:bg-warning/90 text-white font-medium px-6 py-3 rounded-xl transition-colors w-full md:w-auto">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
