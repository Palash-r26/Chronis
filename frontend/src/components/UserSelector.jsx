import { Users } from 'lucide-react';

const UserSelector = ({ selectedUser, onSelectUser }) => {
  return (
    <div className="flex items-center space-x-2 bg-surface border border-white/5 px-4 py-2 rounded-xl focus-within:border-primary/50 transition-colors">
      <Users size={16} className="text-textSecondary" />
      <select 
        value={selectedUser} 
        onChange={(e) => onSelectUser(e.target.value)}
        className="bg-transparent border-none text-sm font-medium text-textPrimary focus:outline-none cursor-pointer [&>option]:bg-background [&>option]:text-textPrimary"
      >
        <option value="U1">Subject U1 (Default)</option>
        <option value="U2">Subject U2</option>
        <option value="U3">Subject U3</option>
        <option value="U4">Subject U4</option>
        <option value="U5">Subject U5</option>
      </select>
    </div>
  );
};

export default UserSelector;
