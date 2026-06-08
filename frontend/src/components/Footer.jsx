import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-textSecondary text-sm">
        <p>&copy; {new Date().getFullYear()} Chronis. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <a href="https://github.com/chronis" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
