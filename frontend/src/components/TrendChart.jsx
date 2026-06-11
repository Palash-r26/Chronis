import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-textSecondary mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-textPrimary">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart = ({ data }) => {
  const [activeMetrics, setActiveMetrics] = useState({
    steps: true,
    sleep: true,
    screen: true,
    deep: true,
    exercise: true
  });

  const metrics = [
    { key: 'steps', color: '#6C63FF', name: 'Steps' },
    { key: 'sleep', color: '#00D4AA', name: 'Sleep (hrs)' },
    { key: 'screen', color: '#FF6B6B', name: 'Screen Time (hrs)' },
    { key: 'deep', color: '#F2C94C', name: 'Deep Work (hrs)' },
    { key: 'exercise', color: '#FF9F43', name: 'Exercise (min)' }
  ];

  const toggleMetric = (key) => {
    setActiveMetrics(prev => ({ ...prev, [key]: !prev[key] }));
  };



  return (
    <div className="bg-card border border-white/5 p-6 rounded-2xl w-full h-[400px] flex flex-col">
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map(m => (
          <button
            key={m.key}
            onClick={() => toggleMetric(m.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
              activeMetrics[m.key] 
                ? 'bg-surface text-textPrimary border-white/10' 
                : 'bg-transparent text-textSecondary border-transparent hover:bg-white/5'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: m.color }} />
            {m.name}
          </button>
        ))}
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#8888AA" 
              tick={{ fill: '#8888AA', fontSize: 12 }} 
              tickMargin={10}
              tickFormatter={(val) => val.split('-').slice(1).join('/')}
            />
            <YAxis stroke="#8888AA" tick={{ fill: '#8888AA', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            
            {metrics.map(m => activeMetrics[m.key] && (
              <Line 
                key={m.key}
                type="monotone" 
                dataKey={m.key === 'steps' ? 'steps' : m.key === 'sleep' ? 'sleep_hours' : m.key === 'screen' ? 'screen_time_hours' : m.key === 'deep' ? 'deep_work_hours' : 'exercise_minutes'} 
                name={m.name} 
                stroke={m.color} 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: m.color, stroke: '#13131A', strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
