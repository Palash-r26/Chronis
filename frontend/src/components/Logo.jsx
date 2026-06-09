const Logo = ({ className = "w-8 h-8", withText = true }) => (
  <div className={`flex items-center ${withText ? 'space-x-3' : ''}`}>
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="55" r="38" stroke="url(#silverGrad)" strokeWidth="8" fill="#050505" />
      <rect x="42" y="5" width="16" height="18" rx="6" stroke="url(#silverGrad)" strokeWidth="6" fill="none" />
      <circle cx="50" cy="5" r="3" fill="#050505" />
      <rect x="44" y="23" width="12" height="4" fill="#94A3B8" />
      <circle cx="50" cy="55" r="34" fill="url(#purpleGlow)" opacity="0.6" />
      <path d="M 22 55 A 28 28 0 0 1 78 55" stroke="url(#highlightGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <circle cx="50" cy="55" r="3" fill="#A78BFA" opacity="0.8" />
      
      <defs>
        <linearGradient id="silverGrad" x1="10" y1="10" x2="90" y2="90">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#94A3B8" />
          <stop offset="0.7" stopColor="#475569" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <radialGradient id="purpleGlow" cx="50" cy="55" r="34">
          <stop stopColor="#7C3AED" stopOpacity="0.8" />
          <stop offset="0.6" stopColor="#4C1D95" stopOpacity="0.3" />
          <stop offset="1" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="highlightGrad" x1="22" y1="55" x2="78" y2="55">
          <stop stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    {withText && <span className="font-display font-bold tracking-wider">CHRONIS</span>}
  </div>
);

export default Logo;
