import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 glass-panel !border-l-0 !border-t-0 !border-r-0 !shadow-none flex justify-between items-center px-8 py-4">
        <div className="text-xl font-display font-bold tracking-tight text-primary">Chronis</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">About</Link>
          <Link to="/developer" className="text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">Developer</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-textPrimary focus:outline-none z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sidebar (Solid Background) */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-surface dark:bg-surface shadow-[0_0_40px_rgba(0,0,0,0.3)] z-50 transform transition-transform duration-300 ease-in-out border-l border-black/10 dark:border-white/10 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-black/5 dark:border-white/5">
          <div className="text-xl font-display font-bold text-primary">Menu</div>
          <button onClick={closeMenu} className="text-textSecondary hover:text-textPrimary focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-6 p-8">
          <Link to="/" onClick={closeMenu} className="text-lg font-medium text-textSecondary hover:text-textPrimary transition-colors">Home</Link>
          <Link to="/about" onClick={closeMenu} className="text-lg font-medium text-textSecondary hover:text-textPrimary transition-colors">About</Link>
          <Link to="/developer" onClick={closeMenu} className="text-lg font-medium text-textSecondary hover:text-textPrimary transition-colors">Developer</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
