import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const TimelineRow = ({ day }) => {
  const [expanded, setExpanded] = useState(false);
  const dateStr = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={`border border-white/5 rounded-xl transition-all ${day.is_above_average ? 'bg-secondary/5 border-secondary/20' : 'bg-surface'}`}>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-6">
          <div className="w-24 font-medium text-textPrimary">{dateStr}</div>
          <div className="hidden md:flex space-x-2">
            <div className="w-8 h-2 rounded-full bg-primary" style={{ opacity: Math.max(0.2, day.steps / 15000) }} title="Steps" />
            <div className="w-8 h-2 rounded-full bg-secondary" style={{ opacity: Math.max(0.2, day.sleep_hours / 9) }} title="Sleep" />
            <div className="w-8 h-2 rounded-full bg-warning" style={{ opacity: Math.max(0.2, day.screen_time_hours / 12) }} title="Screen Time" />
            <div className="w-8 h-2 rounded-full bg-[#F2C94C]" style={{ opacity: Math.max(0.2, day.deep_work_hours / 8) }} title="Deep Work" />
            <div className="w-8 h-2 rounded-full bg-[#FF9F43]" style={{ opacity: Math.max(0.2, day.exercise_minutes / 60) }} title="Exercise" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < day.day_score ? (day.is_above_average ? 'bg-secondary' : 'bg-primary') : 'bg-white/10'}`} />
            ))}
          </div>
          {expanded ? <ChevronUp size={20} className="text-textSecondary" /> : <ChevronDown size={20} className="text-textSecondary" />}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-white/5 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Steps</p>
            <p className="text-lg font-bold text-primary">{day.steps.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Sleep</p>
            <p className="text-lg font-bold text-secondary">{day.sleep_hours} <span className="text-sm font-normal">hrs</span></p>
          </div>
          <div>
            <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Screen Time</p>
            <p className="text-lg font-bold text-warning">{day.screen_time_hours} <span className="text-sm font-normal">hrs</span></p>
          </div>
          <div>
            <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Deep Work</p>
            <p className="text-lg font-bold text-[#F2C94C]">{day.deep_work_hours} <span className="text-sm font-normal">hrs</span></p>
          </div>
          <div>
            <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Exercise</p>
            <p className="text-lg font-bold text-[#FF9F43]">{day.exercise_minutes} <span className="text-sm font-normal">min</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineRow;
