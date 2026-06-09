import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-display font-bold text-primary mb-4">About Chronis</h1>
          <p className="text-xl text-textSecondary">Your personal behavioral analytics dashboard.</p>
        </motion.div>
        
        <div className="glass-panel p-8 rounded-2xl shadow-xl space-y-6 text-left">
          <p className="text-textPrimary leading-relaxed">
            Chronis is built to help you track, analyze, and optimize your daily habits. 
            By monitoring steps, sleep, screen time, and deep work sessions, it empowers 
            you to make data-driven decisions about your lifestyle.
          </p>
          
          <div>
            <h3 className="text-lg font-bold font-display mb-2">Tech Stack</h3>
            <ul className="list-disc list-inside text-textSecondary space-y-1">
              <li>Frontend: React, Vite, Tailwind CSS, Framer Motion</li>
              <li>Backend: FastAPI, SQLAlchemy, SQLite</li>
              <li>Authentication: JWT with Role-Based Access</li>
            </ul>
          </div>
        </div>
        
        <a href="/" className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-xl transition-all hover:scale-105">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default About;
