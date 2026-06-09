import ConfidenceBadge from './ConfidenceBadge';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const InsightCard = ({ insight, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden group cursor-default shadow-lg shadow-black/20 border border-white/5 hover:border-primary/30 transition-colors flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
        <Lightbulb size={160} />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full shadow-sm">
            {insight.category}
          </span>
          <ConfidenceBadge level={insight.confidence} />
        </div>
        
        <h3 className="text-xl font-display font-bold mb-3 text-textPrimary leading-tight group-hover:text-primary transition-colors">
          {insight.title}
        </h3>
        
        <p className="text-textSecondary text-sm mb-6 leading-relaxed flex-grow">
          {insight.description}
        </p>
        
        {insight.missing_data && (
          <div className="flex items-center space-x-2 text-warning/90 text-xs mt-auto bg-warning/10 border border-warning/20 px-3 py-2 rounded-lg inline-flex shadow-inner">
            <AlertTriangle size={14} />
            <span className="font-medium tracking-wide">Based on incomplete data</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InsightCard;
