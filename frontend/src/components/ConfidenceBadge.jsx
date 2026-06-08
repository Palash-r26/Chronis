const ConfidenceBadge = ({ level, daysTracked }) => {
  const getColors = () => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'low':
        return 'bg-white/10 text-textSecondary border-white/20';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColors()}`}>
      {level || `${daysTracked} days data`}
    </div>
  );
};

export default ConfidenceBadge;
