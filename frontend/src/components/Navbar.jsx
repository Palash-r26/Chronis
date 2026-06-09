import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-panel !border-l-0 !border-t-0 !border-r-0 !shadow-none flex justify-between items-center px-8 py-4">
    <div className="text-xl font-display font-bold tracking-tight text-primary">Chronis</div>
    <div className="flex gap-8">
      <Link to="/" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">Home</Link>
      <Link to="/about" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">About</Link>
      <Link to="/developer" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">Developer</Link>
    </div>
  </nav>
);

export default Navbar;
