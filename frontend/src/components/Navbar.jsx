import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-white/5">
      <h1 className="text-xl font-display font-bold text-primary">Chronis</h1>
      <button className="text-textSecondary hover:text-white">
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Navbar;
