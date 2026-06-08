import ConfidenceBadge from './ConfidenceBadge';

const MetricCard = ({ title, value, icon: Icon, unit, change, confidence }) => {
  return (
    <div className="bg-card border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-surface rounded-xl text-primary">
          <Icon size={24} />
        </div>
        {confidence && <ConfidenceBadge daysTracked={confidence} />}
      </div>
      
      <div>
        <h3 className="text-textSecondary text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-display font-bold text-textPrimary">{value}</span>
          {unit && <span className="text-textSecondary text-sm">{unit}</span>}
        </div>
        
        {change && (
          <div className={`mt-2 flex items-center text-sm ${change.direction === 'improved' ? 'text-secondary' : 'text-warning'}`}>
            <span className="font-medium">{change.pct}%</span>
            <span className="text-textSecondary ml-2">{change.direction === 'improved' ? 'increase' : 'decrease'} vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
