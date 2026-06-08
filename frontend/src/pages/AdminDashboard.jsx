import { useAuth } from '../context/AuthContext';
import { Users, Shield, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-display font-bold">Admin Portal</h2>
        <p className="text-textSecondary mt-1">Manage system configurations and monitor platform health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-primary/10 text-primary rounded-full"><Users size={32} /></div>
          <h3 className="text-xl font-bold font-display">User Management</h3>
          <p className="text-textSecondary text-sm text-center">Manage roles, suspend accounts, and view user metrics.</p>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-secondary/10 text-secondary rounded-full"><Activity size={32} /></div>
          <h3 className="text-xl font-bold font-display">System Health</h3>
          <p className="text-textSecondary text-sm text-center">Monitor API usage, database load, and server latency.</p>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-[#FF9F43]/10 text-[#FF9F43] rounded-full"><Shield size={32} /></div>
          <h3 className="text-xl font-bold font-display">Security Settings</h3>
          <p className="text-textSecondary text-sm text-center">Configure authentication rules and access policies.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
