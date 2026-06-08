const UserSelector = ({ selectedUser, onSelectUser }) => {
  const users = ['U1', 'U2', 'U3', 'U4', 'U5'];

  return (
    <div className="flex items-center space-x-2 bg-surface p-1 rounded-xl border border-white/5">
      {users.map(u => (
        <button
          key={u}
          onClick={() => onSelectUser(u)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedUser === u 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
          }`}
        >
          {u}
        </button>
      ))}
    </div>
  );
};

export default UserSelector;
