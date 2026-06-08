import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <h1 className="text-9xl font-display font-bold text-primary opacity-20">404</h1>
      <h2 className="text-3xl font-display font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-textSecondary mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/dashboard"
        className="flex items-center space-x-2 bg-surface hover:bg-white/5 border border-white/10 px-6 py-3 rounded-xl transition-colors"
      >
        <Home size={20} />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
