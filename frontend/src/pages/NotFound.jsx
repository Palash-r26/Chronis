import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden font-body">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="mb-8 relative">
          <h1 className="text-[12rem] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <Compass size={80} className="animate-[spin_10s_linear_infinite] opacity-50" />
          </div>
        </div>
        
        <h2 className="text-4xl font-display font-bold mb-4">Lost in time?</h2>
        <p className="text-textSecondary mb-10 max-w-md text-lg">
          The page you're looking for has slipped through the cracks of time or never existed at all.
        </p>
        
        <Link 
          to="/dashboard"
          className="group relative flex items-center space-x-2 bg-surface border border-white/10 px-8 py-4 rounded-full transition-all hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)]"
        >
          <Home size={20} className="text-primary group-hover:text-primary transition-colors" />
          <span className="font-medium text-white">Return to Dashboard</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
