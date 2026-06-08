import ConfidenceBadge from './ConfidenceBadge';
import { AlertTriangle, Lightbulb } from 'lucide-react';

const InsightCard = ({ insight }) => {
  return (
    <div className="bg-card border border-white/5 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Lightbulb size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            {insight.category}
          </span>
          <ConfidenceBadge level={insight.confidence} />
        </div>
        
        <h3 className="text-xl font-display font-bold mb-3">{insight.title}</h3>
        <p className="text-textSecondary text-sm mb-6">{insight.description}</p>
        
        {insight.missing_data && (
          <div className="flex items-center space-x-2 text-warning text-xs mt-4 bg-warning/10 p-2 rounded-lg inline-flex">
            <AlertTriangle size={14} />
            <span>Based on incomplete data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
